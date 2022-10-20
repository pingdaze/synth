import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
import {CharacterValidator, WearablesValidator, SelectableOptions, Core1155, Core721, AugmentsValidator, Characters} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"
import testMintData from "../data/test-mints.json";

const mockShadowPaktPill = ethers.BigNumber.from(
  "0xD00000000000000940000000000000001"
);
const mockKirbonitePill = ethers.BigNumber.from(
  "0xC00000000000000650000000000000001"
);
const BigZero = ethers.BigNumber.from("0");

async function main() {

  let core721 : Core721;
  let core1155 : Core1155;
  let characterValidator: CharacterValidator;
  let wearablesValidator: WearablesValidator;
  let augmentsValidator: AugmentsValidator;
  let character: Characters;
  let receipt, owner;
  let options: SelectableOptions;
  owner = (await ethers.getSigners())[0].address;

  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  core721 = await ethers.getContractAt('Core721', charDeploymant.ArbGorliV2.Core721) as Core721;
  core1155 = await ethers.getContractAt('Core1155', charDeploymant.ArbGorliV2.Core1155) as Core1155;
  characterValidator = await ethers.getContractAt('CharacterValidator', charDeploymant.ArbGorliV2.CharacterValidatorV2) as CharacterValidator;
  wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.ArbGorliV2.WearablesValidator) as WearablesValidator;
  augmentsValidator = await ethers.getContractAt('AugmentsValidator', charDeploymant.ArbGorliV2.AugmentsValidator) as AugmentsValidator;
  character = await ethers.getContractAt('Characters', charDeploymant.ArbGorliV2.CharactersV2) as Characters;

  options = await ethers.getContractAt('SelectableOptions', charDeploymant.ArbGorliV2.SelectableOptionsV2) as SelectableOptions;
  if(network.name === "arbgorli" ) {   
    for(let i = 0; i < testMintData.length; i++) {
      let legacyPills: BigNumber[] = testMintData[i].legacyPills.map(x => ethers.BigNumber.from(x));
      let collabPills: BigNumber[] = testMintData[i].collabPills.map(x => ethers.BigNumber.from(x));
      let traitsplus = testMintData[i].traitsplus;
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus,
        {gasPrice: 10000000000}
      );
      console.log("Character minted: ", receipt.hash);
      await receipt.wait();
    }
  }
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});