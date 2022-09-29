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
    for(let i = 0; i < testMintData.length; i++) {
      let legacyPills: BigNumber[] = testMintData[i].legacyPills.map(x => ethers.BigNumber.from(x));
      let collabPills: BigNumber[] = testMintData[i].collabPills.map(x => ethers.BigNumber.from(x));

      let traitsplus = testMintData[i].traitsplus;

      const mintArray = legacyPills.concat(collabPills).filter(x => x.gt(BigZero));
      const quantityArray = new Array(mintArray.length).fill(1);
      await legacy.mintBatch(owner, mintArray, quantityArray, ethers.constants.HashZero);
      await legacy.setApprovalForAll(characterValidator.address, true);
      console.log(mintArray, quantityArray);
      console.log(legacyPills, collabPills);
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