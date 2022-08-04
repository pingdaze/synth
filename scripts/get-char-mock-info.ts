import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import {CharacterValidator, RandomnessRelayL2, WearablesValidator, SelectableOptions, Core1155, Core721, AugmentsValidator, CharacterGenMock} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"


const id1 = 38;


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
  augmentsValidator = await ethers.getContractAt('AugmentsValidator', charDeploymant.ArbRinkeby.AugmentsValidator) as AugmentsValidator;
  character = await ethers.getContractAt('Characters', charDeploymant.ArbRinkeby.Characters) as CharacterGenMock;
  characterValidator = await ethers.getContractAt('CharacterValidator', charDeploymant.ArbRinkeby.CharacterValidator) as CharacterValidator;
  let skeleton = await character.getSkeleton(id1);
  console.log("Skeleton: " + JSON.stringify(skeleton));
  let outfit = await character.getOutfit(id1);
  console.log("Outfit: " + JSON.stringify(outfit));
  let description = await character.getDescription(id1);
  console.log("Description: " + description);
  let name = await character.getName(id1);
  console.log(`Name: ${name} CID: ${id1}`);
  let options = await character.getOptions(id1);
  console.log("Options: " + JSON.stringify(options));
  let head = await wearablesValidator.cid(outfit.head);
  console.log(`Head: ${head} ID: ${outfit.head}`);
  let torso = await wearablesValidator.cid(outfit.torso);
  console.log(`Torso: ${torso} ID: ${outfit.torso}`);
  let lArm = await wearablesValidator.cid(outfit.lArm);
  console.log(`LArm: ${lArm} ID: ${outfit.lArm}`);
  let rArm = await wearablesValidator.cid(outfit.rArm);
  console.log(`RArm: ${rArm} ID: ${outfit.rArm}`);
  let lLeg = await wearablesValidator.cid(outfit.lLeg);
  console.log(`LLeg: ${lLeg} ID: ${outfit.lLeg}`);
  let rLeg = await wearablesValidator.cid(outfit.rLeg);
  console.log(`RLeg: ${rLeg} ID: ${outfit.rLeg}`);
  let headAug = await augmentsValidator.cid(skeleton.head);
  console.log(`HeadAug: ${headAug} ID: ${skeleton.head}`);
  let mouthAug = await augmentsValidator.cid(skeleton.mouth);
  console.log(`MouthAug: ${mouthAug} ID: ${skeleton.mouth}`);
  let eyesAug = await augmentsValidator.cid(skeleton.eyes);
  console.log(`EyesAug: ${eyesAug} ID: ${skeleton.eyes}`);
  let torsoAug = await augmentsValidator.cid(skeleton.torso);
  console.log(`TorsoAug: ${torsoAug} ID: ${skeleton.torso}`);
  let lArmAug = await augmentsValidator.cid(skeleton.lArm);
  console.log(`LArmAug: ${lArmAug} ID: ${skeleton.lArm}`);
  let rArmAug = await augmentsValidator.cid(skeleton.rArm);
  console.log(`RArmAug: ${rArmAug} ID: ${skeleton.rArm}`);
  let lLegAug = await augmentsValidator.cid(skeleton.lLeg);
  console.log(`LLegAug: ${lLegAug} ID: ${skeleton.lLeg}`);
  let rLegAug = await augmentsValidator.cid(skeleton.rLeg);
  console.log(`RLegAug: ${rLegAug} ID: ${skeleton.rLeg}`);
  let mouth = await augmentsValidator.cid(skeleton.mouth);
  console.log(`Mouth: ${mouth} ID: ${skeleton.mouth}`);
  let eyes = await augmentsValidator.cid(skeleton.eyes);
  console.log(`Eyes: ${eyes} ID: ${skeleton.eyes}`);
  let color = await augmentsValidator.cid(skeleton.color);
  console.log(`Color: ${color} ID: ${skeleton.color}`);
  let crown = await augmentsValidator.cid(skeleton.crown);
  console.log(`Crown: ${crown} ID: ${skeleton.crown}`);
  let marking = await augmentsValidator.cid(skeleton.marking);
  console.log(`Marking: ${marking} ID: ${skeleton.marking}`);
  console.log(await character.characters(id1));
  console.log(await characterValidator.getEquipment(id1));
    

  
  if(network.name === "mainnet") {

  }
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});