import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import {CharacterValidator, RandomnessRelayL2, WearablesValidator, SelectableOptions, Core1155, Core721, AugmentsValidator, CharacterGenMock} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"
import { BigNumber } from "ethers";


const id1 = 16;
const pillIDs =  Array.from({length: 14}, (v, k) => k);

// Replace magic numbers
async function main() {
  let owner: SignerWithAddress, user1: SignerWithAddress;
  [owner, user1] = await ethers.getSigners();

  let core721 : Core721;
  let core1155 : Core1155;
  let characterValidator: CharacterValidator;
  let wearablesValidator: WearablesValidator;
  let augmentsValidator: AugmentsValidator;
  let requester: RandomnessRelayL2;
  let character: CharacterGenMock;
  let receipt;
  // This is horribly inneficient, probably don't redeploy these each time?
  // We get the contract to deploy

  // Grab the signers so we can drop them test tokens
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