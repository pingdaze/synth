import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {  artifacts, web3, network, ethers } from "hardhat";
import {MetadataRegistry, CharacterValidator, RandomnessRelayL2, WearablesValidator, Characters, SelectableOptions, Core1155, Core721, Basic1155, AugmentsValidator, CharacterGenMock} from "../typechain-types";
import {deployRegistry, deployCore721, deployCore1155, deploySelectableOptions, deployWearablesValidator, deployAugmentsValidator, deployCharacterMock, deployCharacterValidator, deployMock1155, deployRequester} from "../test/shared/deploys"
import charDeploymant from "./deploy-args/char-mock-deployment.json"

const zeroAddress = "0x0000000000000000000000000000000000000000";
const coreId = 1;

const id1 = 1;
const id2 = 2;
const id3 = 3;
const id4 = 4;
const amount = 1;
const cost = ethers.utils.parseEther("1");
const wearablesCIDs = [
  "bafybeifnnuumhdldv4tirlnpo5vfrrbam4bwgvmu7lg7s2shmmtw5xom6i", // head
  "bafybeidmsf6xtldljztlocfzxnx747gws5lte6nvwvuycvq3vw3vtfjxfu", // torso
  "bafybeieb45ngfae5bn57tkop7l2mgkvfaui2267a6xo5qa5drm5m3oi4aa", // lArm
  "bafybeidemd4ccpr4ccv4rouyo4tyjk5gftzgxoj4zkda2irgxor5wda2pe", // rArm
  "bafybeib327pud5vondqotlottzbuqz4ljxdyxmk7nghwnpt64tr7nzoeuu", // rleg
  "bafybeia2vtsgzor2ihq4uqt6rd6dk7rxvr5cmaevznxjagrif2inazbzee", // lleg
  "bafybeib27ucdzwmab6fj6njgua35tw6jjzfmmgcm3he6pyirai4xja65h4" // floating
];
const augmentsCIDS = [
  "bafybeicbgb3muvpuegispolgkqcw5zimrlaonot4ofulr47suwjs4fbbu4", // head
  "bafybeihq3bnjymoiqefvag7octkwqpsk5ulztplgeq7ukvy6paqdwym52a", // mouth
  "bafybeihoor6ocfomgkp5ubcfdu7kxrutcgq5f7s4sx37524svswivpi4dy", // eyes
  "bafybeid4m4ii5qrb6yratt56nvyt2gfdy2wut3fv4do3565kha3gv44qui", // torso
  "bafybeia2d52w5vaz5jpwvghmlct5k74ixx3tarxdihrqh7ochgzj5upa4q", // larm
  "bafybeidqijtuhsjc55a4y3recjgqmnyivzckgzq6kjuwsionhbd33xzm6m", // rarm
  "bafybeifnvnmvufmy6swi7g42ujxs65ytarqhdecjvajuoirhrt3clrighq", // rleg
  "bafybeid4m4ii5qrb6yratt56nvyt2gfdy2wut3fv4do3565kha3gv44qui", // lleg
  "", // color
  "bafybeieuluct3hb2vson76aia5n6wv6engzkosjysojg7lm5b7tkbnozge", // markings
  ""  // mask
];


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