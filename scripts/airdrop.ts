import { network, ethers } from "hardhat";
import { expect } from "chai";

import { Basic1155, Core1155, AirdropValidator, MetadataRegistry } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  deployAirdropValidator,
  deployCore1155,
  deployRegistry,
  zeroAddress,
} from "../test/shared/deploys";


import data from "../data/airdrop.json"
const ids = [1,2,3,4,5,6];

const projectToId: { [key:string]: number} = {
  "chainrunners": 0x1,
  "0xmons": 0x2,
  "cryptoadz": 0x3,
  "blitmap": 0x4,
  "blitnauts": 0x4,
  "wassies": 0x5,
  "tubbycats": 0x6,
}

type dropInfo = {
  address: string,
  amount: number
}
async function main() {

  let core: Core1155, nift: Basic1155, validator: AirdropValidator, receipt;
  const owner = (await ethers.getSigners())[0].address;
  const accounts = await ethers.getSigners();
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
// This is horribly inneficient, probably don't redeploy these each time?
  // We get the contract to deploy
  const Registry = await ethers.getContractFactory("MetadataRegistry");
  const registry =  await Registry.connect(accounts[3]).deploy(zeroAddress) as MetadataRegistry;
  await registry.deployed();
  console.log("Registry deployed to " + registry.address);
  const Collectible = await ethers.getContractFactory("Core1155");
  core = await Collectible.connect(accounts[3]).deploy("https://ipfs.pills.host/", registry.address, zeroAddress) as Core1155;
  // In production instances the IDs must line up correctly
  const AirdropValidator = await ethers.getContractFactory("AirdropValidator");
  validator = await  AirdropValidator.connect(accounts[3]).deploy(core.address, ethers.constants.AddressZero) as AirdropValidator;
  const tx = await core.connect(accounts[3]).addValidator(validator.address, ids);
  console.log("Validator deployed to " + validator.address);
  let runnersDrop: dropInfo[] = [];
  let oxDrop: dropInfo[] = [];
  let toadzDrop: dropInfo[] = [];
  let blitDrop: dropInfo[] = [];
  let wassieDrop: dropInfo[] = [];
  let tubbyDrop: dropInfo[] = [];
  const metadata = ["QmaM3P9vYiXQX1rNFFJ2fat17q86SCQR8ixFTbWQaWoX1r","QmQtgUMAqjAD2JrN1VEMoUKv4wYAgcs4h1yFFwXLrNVMVP","QmYbThwj2rWwZ2GgGm9Wg27BE23e495azXZrDSj9X9Mctd","Qmee3nukSthSn6ehckxVwG6XXiCQGZNfNtAxHLkFMajbm7","QmX1HMcGCGjeWKrCEdkLzwbiRNwTBYjKAMXSWVDCza1ZD3", "QmSa5d5rJmPfnVXpUFoMa9MVt8PKDSeCxjsEdFmiff1cq2" ];


  data.forEach(element => {
    if (element.project === "chainrunners") {
      runnersDrop.push({address: element.address, amount: element["eligible tokens"]})
    } else if (element.project === "0xmons") {
      oxDrop.push({address: element.address, amount: element["eligible tokens"]})
    }  else if (element.project === "cryptoadz") {
      toadzDrop.push({address: element.address, amount: element["eligible tokens"]})
    }  else if (element.project === "blitmap") {
      blitDrop.push({address: element.address, amount: element["eligible tokens"]})
    }  else if (element.project === "wassies") {
      wassieDrop.push({address: element.address, amount: element["eligible tokens"]})
    }  else if (element.project === "tubbycats") {
      tubbyDrop.push({address: element.address, amount: element["eligible tokens"]})
    }
  });
  
  receipt = await validator.drop(runnersDrop.map((element) => element.address), runnersDrop.map(element => element.amount), 0x1);
  receipt = await receipt.wait();
  receipt = await registry.set(1, metadata[0]);
  receipt = await receipt.wait();
  console.log(`Dropped ${runnersDrop.length} runners`);
  console.log(oxDrop.length);

  receipt = await validator.drop(oxDrop.map((element) => element.address), oxDrop.map(element => element.amount), 0x2);
  receipt = await receipt.wait();
  receipt = await registry.set(2, metadata[1]);
  receipt = await receipt.wait();
  console.log(`Dropped ${oxDrop.length} ox`);

  receipt = await validator.drop(toadzDrop.map((element) => element.address), toadzDrop.map(element => element.amount), 0x3);
  receipt = await receipt.wait();
  receipt = await registry.set(3, metadata[2]);
  receipt = await receipt.wait();
  console.log(`Dropped ${toadzDrop.length} toadz`);

  receipt = await validator.drop(blitDrop.map((element) => element.address), blitDrop.map(element => element.amount), 0x4);
  receipt = await receipt.wait();
  receipt = await registry.set(4, metadata[3]);
  receipt = await receipt.wait();
  console.log(`Dropped ${blitDrop.length} blit`);

  receipt = await validator.drop(wassieDrop.map((element) => element.address), wassieDrop.map(element => element.amount), 0x5);
  receipt = await receipt.wait();
  receipt = await registry.set(5, metadata[4]);
  receipt = await receipt.wait();
  console.log(`Dropped ${wassieDrop.length} wassie`);

  receipt = await validator.connect(accounts[3]).drop(tubbyDrop.map((element) => element.address), tubbyDrop.map(element => element.amount), 0x6);
  receipt = await receipt.wait();
  receipt = await registry.connect(accounts[3]).set(6, metadata[5]);
  receipt = await receipt.wait();
  console.log(`Dropped ${tubbyDrop.length} tubby`);

}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});