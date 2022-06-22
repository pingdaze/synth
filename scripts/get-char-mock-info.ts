import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import {CharacterValidator, RandomnessRelayL2, WearablesValidator, SelectableOptions, Core1155, Core721, AugmentsValidator, CharacterGenMock} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"


const id1 = 1;


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
  let options: SelectableOptions;
  // This is horribly inneficient, probably don't redeploy these each time?
  // We get the contract to deploy

  // Grab the signers so we can drop them test tokens
  console.log("Current Network: " + network.name);

  if(network.name === "ropsten" || network.name === "rinkeby" ) {
    console.log("Testing deploy to " + network.name);
    //await deployToTestnet();
    [owner, user1] = await ethers.getSigners();
    console.log("Signing as " + owner.address);
    core721 = await ethers.getContractAt('Core721', charDeploymant.Core721) as Core721;
    core1155 = await ethers.getContractAt('Core1155', charDeploymant.Core1155) as Core1155;
    characterValidator = await ethers.getContractAt('CharacterValidator', charDeploymant.CharacterValidator) as CharacterValidator;
    wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.WearablesValidator) as WearablesValidator;
    augmentsValidator = await ethers.getContractAt('AugmentsValidator', charDeploymant.AugmentsValidator) as AugmentsValidator;
    character = await ethers.getContractAt('Characters', charDeploymant.Characters) as CharacterGenMock;
    let skeleton = await character.getSkeleton(id1);
    console.log("Skeleton: " + JSON.stringify(skeleton));
    let outfit = await character.getOutfit(id1);
    console.log("Outfit: " + JSON.stringify(outfit));
    let description = await character.getDescription(id1);
    console.log("Description: " + description);
    let name = await character.getName(id1);
    console.log("Name: " + name);
    let options = await character.getOptions(id1);
    console.log("Options: " + JSON.stringify(options));
    let head = await wearablesValidator.cid(outfit.head);
    console.log("Head: " + head);
    let torso = await wearablesValidator.cid(outfit.torso);
    console.log("Torso: " + torso);
    let lArm = await wearablesValidator.cid(outfit.lArm);
    console.log("LArm: " + lArm);
    let rArm = await wearablesValidator.cid(outfit.rArm);
    console.log("RArm: " + rArm);
    let lLeg = await wearablesValidator.cid(outfit.lLeg);
    console.log("LLeg: " + lLeg);
    let rLeg = await wearablesValidator.cid(outfit.rLeg);
    console.log("RLeg: " + rLeg);
    let headAug = await augmentsValidator.cid(skeleton.head);
    console.log("HeadAug: " + headAug);
    let mouthAug = await augmentsValidator.cid(skeleton.mouth);
    console.log("MouthAug: " + mouthAug);
    let eyesAug = await augmentsValidator.cid(skeleton.eyes);
    console.log("EyesAug: " + eyesAug);
    let torsoAug = await augmentsValidator.cid(skeleton.torso);
    console.log("TorsoAug: " + torsoAug);
    let lArmAug = await augmentsValidator.cid(skeleton.lArm);
    console.log("LArmAug: " + lArmAug);
    let rArmAug = await augmentsValidator.cid(skeleton.rArm);
    console.log("RArmAug: " + rArmAug);
    
  }

  
  if(network.name === "mainnet") {

  }
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});