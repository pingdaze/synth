import { network, ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
import {CharacterValidator, WearablesValidator, SelectableOptions, Core1155, Core721, AugmentsValidator, Characters} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"

const BigZero = ethers.BigNumber.from("0");

async function main() {

  let core721 : Core721;
  let core1155 : Core1155;
  let legacy : Core1155;
  let characterValidator: CharacterValidator;
  let wearablesValidator: WearablesValidator;
  let augmentsValidator: AugmentsValidator;
  let character: Characters;
  let receipt, owner;
  let options: SelectableOptions;
  owner = (await ethers.getSigners())[0].address;
  const mockShadowPaktPill = ethers.BigNumber.from(
    "0xD00000000000000940000000000000001"
  );
  const mockKirbonitePill = ethers.BigNumber.from(
    "0xC00000000000000650000000000000001"
  );
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  core721 = await ethers.getContractAt('Core721', charDeploymant.ArbRinkeby.Core721) as Core721;
  core1155 = await ethers.getContractAt('Core1155', charDeploymant.ArbRinkeby.Core1155) as Core1155;
  characterValidator = await ethers.getContractAt('CharacterValidator', charDeploymant.ArbRinkeby.CharacterValidator) as CharacterValidator;
  wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.ArbRinkeby.WearablesValidator) as WearablesValidator;
  augmentsValidator = await ethers.getContractAt('AugmentsValidator', charDeploymant.ArbRinkeby.AugmentsValidator) as AugmentsValidator;
  character = await ethers.getContractAt('Characters', charDeploymant.ArbRinkeby.Characters) as Characters;
  legacy = await ethers.getContractAt("Core1155", charDeploymant.ArbRinkeby.Pills1155) as Core1155;

  options = await ethers.getContractAt('SelectableOptions', charDeploymant.ArbRinkeby.SelectableOptions) as SelectableOptions;
  if(network.name === "arbrinkeby" ) {   
    if(await legacy.isApprovedForAll(owner, character.address) == false) {
      console.log("Approving legacy contract for owner");
      await legacy.setApprovalForAll(character.address, true);
      console.log("Approved legacy contract for owner");

    }
    let legacyPills: BigNumber[] = [
      BigNumber.from("0x8000000000000000000000000000000b00000000000000110000000000000001"),
      BigZero,
      BigZero,
      BigZero,
      BigZero,
    ]
    let collabPills: BigNumber[] = [
      BigZero,
      BigZero,
      BigZero,
      BigZero,
      BigZero,
    ]
    let traitsplus = [
      "Pepel",
      "Durn",
      "Algorist",
      "Simptongued",
      "None",
      "bafybeibuasbtuzltmwi56z2t5ndyniwfh37atvdjv2ftf6xyisahcxqori",
      "bafybeicr5vd3mqpyqhfe55x3t23ngwy477jnqqg3ydwpbmq3missdfnvyy",
      "pale",
      "bafybeigroraemt2yujiqgztpaya5q6lzp3tswy7sgkaicq5phdswbkptqi"
    ]

    const mintArray = legacyPills.concat(collabPills).filter(x => x.gt(BigZero));
    const quantityArray = new Array(mintArray.length).fill(1);
    await legacy.mintBatch(owner, mintArray, quantityArray, ethers.constants.HashZero);
    console.log("Minted legacy pills");
    await legacy.setApprovalForAll(characterValidator.address, true);
    console.log("Approved legacy pills for character validator");
    console.log(mintArray, quantityArray);
    console.log(legacyPills, collabPills);
    receipt = await characterValidator.createCharacter(
      legacyPills,
      collabPills,
      traitsplus,
      {gasPrice: 10000000000}
    );
    console.log("Character minted: ", receipt.hash);
  }
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});