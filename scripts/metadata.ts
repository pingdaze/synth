import { Contract } from "ethers";
const fs = require("fs");
const { artifacts, web3, network, ethers } = require("hardhat");
import CharacterABI from "../artifacts/contracts/characters/Characters.sol/Characters.json"
import {Characters} from "../typechain-types/contracts/characters/Characters.sol/Characters"
import wearablesABI from "../artifacts/contracts/Core1155.sol/Core1155.json"
import {Core1155} from "../typechain-types/contracts/Core1155"


import mergeImages from 'merge-images';


import { Buckets, GetOrCreateOptions } from '@textile/hub'

type SkeletonType = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];
type OutfitType = [number, number, number, number, number, number, number];
const charactersAddress = "";
const tokenId = 0;
async function main() {


    // Create Wearables Contract instance
    const characterContract = await ethers.getContractAtFromArtifact(CharacterABI, process.env.CHARACTERS_ADDRESS) as Characters;



    // Create Characters contract instance
    const wearablesContract  = await ethers.getContractAtFromArtifact(wearablesABI, process.env.WEARABLES_ADDRES) as Core1155;

    //Get the main skeleton and wearables from the characters contract
    const skeleton = await characterContract.skeletons(
        tokenId
    );

    const outfit = await characterContract.outfits(
        tokenId
    );


    const name = "Radmius Vandergart";
    // This needs to be reset as the flattened image from the wearables
    const image = await generateImageFromWearables(skeleton, outfit, wearablesContract);
    

    // Add each skeleton item as a metadata attribute

    let returnString = setupInitialString(image, name);
      console.log(returnString);
}


const setupInitialString:((image:string, name:string)=> string) = (image, name) => {
  return '{"description": "pills character.","image": '+image+',"name": '+name;
}


const generateImageFromWearables:((skeleton: SkeletonType, outfit: OutfitType, contract: Core1155) => Promise<string>) = async (skeleton, outfit, contract)=> {
  
  console.log("logging in to the hub to post some filez");

  // Need to set the auth correctly
  const buckets = await Buckets.withKeyInfo( {
    key: process.env.HUB_API_KEY || "",
    secret: process.env.HUB_API_SECRET,
  })

  const isEncrypted = true;
  const options = {threadName: "buckets", encrypted: isEncrypted} as GetOrCreateOptions;
  const result = await buckets.getOrCreate(
    "test.bucket.encrypted",
    options
  );

  // image upload
  const fileBuff = fs.readFileSync("./peace.png");
  const path1 = "test-file-png";
  if(result && result.root) {
    await buckets.pushPath(result.root.key, path1, fileBuff);
    const links = await buckets.links(result.root.key);
    const [bucketUrl, tokenQParam] = links.url.split("?token=");
    const nftImageLink = `${bucketUrl}/${path1}?token=${tokenQParam}`;
  
    // metadata upload
    const metadataJSON = {
      name: "test-nft",
      image: nftImageLink,
      description: "test description",
      attributes: [{ strength: 3, aggression: 10000000, size: "tiny-smoll" }],
    };
    const metadataBuff = Buffer.from(JSON.stringify(metadataJSON, null, 2));
    const path2 = "test-nft-metadata";
    await buckets.pushPath(result.root.key, path2, metadataBuff);
  
    console.log(await buckets.links(result.root.key));
  
  } else  {
    throw new Error("Failed to open bucket");
  }
  // Needs to be brought into the metadata server flow better
  // Get the name and image for each wearable
  const skeletonData = skeleton.map((element) =>  {
    contract.uri(element);
    // Get the wearables data from IPNS
    const itemName = "Test Item Name";
    const itemImage = "https://flyclipart.com/thumb2/png-with-transparency-not-showing-499119.png";
    return {name: itemName, image: itemImage};
  })

  // Flatten the image data
  // TODO: Add proper typing in mergeimages.d.ts for function call
  const flattened = mergeImages(skeletonData.map((element) => {return element.image}));
  contract.uri(skeleton)
  return flattened;
}



