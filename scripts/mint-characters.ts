import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
import {CharacterValidatorV2, WearablesValidator, SelectableOptionsV2, Core1155, Core721, AugmentsValidator, CharactersV2} from "../typechain-types";
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
  let characterValidator: CharacterValidatorV2;
  let wearablesValidator: WearablesValidator;
  let augmentsValidator: AugmentsValidator;
  let character: CharactersV2;
  let receipt, owner;
  let options: SelectableOptionsV2;
  owner = (await ethers.getSigners())[0].address;

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

  options = await ethers.getContractAt('SelectableOptionsV2', charDeploymant.ArbGorliV2.SelectableOptionsV2) as SelectableOptionsV2;
  if(network.name === "arbgorli" ) {   
    for(let i = 0; i < testMintData.length; i++) {
      let traitsplus = testMintData[i];
      try {
        receipt = await characterValidator.createCharacter(
          traitsplus,
          {gasPrice: 10000000000}
        );
        await receipt.wait();
      } catch (e){
        console.log(`Error creating character ${i}: ${e}`);
        console.log(traitsplus);
      }
    }
  }
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});