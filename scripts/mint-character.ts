import { network, ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
import {CharacterValidatorV2, WearablesValidator, SelectableOptionsV2, Core1155, Core721, AugmentsValidator, CharactersV2} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"

const BigZero = ethers.BigNumber.from("0");

async function main() {

  let core721 : Core721;
  let core1155 : Core1155;
  let legacy : Core1155;
  let characterValidator: CharacterValidatorV2;
  let wearablesValidator: WearablesValidator;
  let augmentsValidator: AugmentsValidator;
  let character: CharactersV2;
  let receipt, owner;
  let options: SelectableOptionsV2;
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
  core721 = await ethers.getContractAt('Core721', charDeploymant.ArbGorliV2.Core721) as Core721;
  core1155 = await ethers.getContractAt('Core1155', charDeploymant.ArbGorliV2.Core1155) as Core1155;
  characterValidator = await ethers.getContractAt('CharacterValidatorV2', charDeploymant.ArbGorliV2.CharacterValidatorV2) as CharacterValidatorV2;
  wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.ArbGorliV2.WearablesValidator) as WearablesValidator;
  augmentsValidator = await ethers.getContractAt('AugmentsValidator', charDeploymant.ArbGorliV2.AugmentsValidator) as AugmentsValidator;
  character = await ethers.getContractAt('CharactersV2', charDeploymant.ArbGorliV2.CharactersV2) as CharactersV2;
  legacy = await ethers.getContractAt("Core1155", charDeploymant.ArbGorli.Pills1155) as Core1155;

  options = await ethers.getContractAt('SelectableOptionsV2', charDeploymant.ArbGorliV2.SelectableOptionsV2) as SelectableOptionsV2;
  if(network.name === "arbgorli" ) {   

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


    receipt = await characterValidator.createCharacter(
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