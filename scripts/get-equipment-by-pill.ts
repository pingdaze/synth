import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import {CharacterValidator, RandomnessRelayL2, WearablesValidator, SelectableOptions, Core1155, Core721, AugmentsValidator, CharacterGenMock} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"
import { BigNumber } from "ethers";


const pillIDs =  Array.from({length: 14}, (v, k) => k);

// Replace magic numbers
async function main() {
  let owner: SignerWithAddress, user1: SignerWithAddress;
  [owner, user1] = await ethers.getSigners();

  let wearablesValidator: WearablesValidator;
  console.log("Current Network: " + network.name);

  console.log("Testing deploy to " + network.name);
  //await deployToTestnet();
  [owner, user1] = await ethers.getSigners();
  console.log("Signing as " + owner.address);
  wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.ArbRinkeby.WearablesValidator) as WearablesValidator;
  for(let i = 0; i < pillIDs.length; i++) {
    console.log(await wearablesValidator.getEquipmentFromPill(BigNumber.from(pillIDs[i]), 1));
  }
    
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});