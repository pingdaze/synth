import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {  artifacts, web3, network, ethers } from "hardhat";
import {MetadataRegistry, CharacterValidator, RandomnessRelayL2, WearablesValidator, Characters, SelectableOptions, Core1155, Core721, Basic1155, AugmentsValidator, CharacterGenMock} from "../typechain-types";
import {deployRegistry, deployCore721, deployCore1155, deploySelectableOptions, deployWearablesValidator, deployAugmentsValidator, deployCharacterMock, deployCharacterValidator, deployMock1155, deployRequester} from "../test/shared/deploys"
const zeroAddress = "0x0000000000000000000000000000000000000000";
const coreId = 1;

const id1 = 1;
const id2 = 2;
const id3 = 3;
const id4 = 4;
const amount = 1;
const cost = ethers.utils.parseEther("1");
const wearablesCIDs = [
  "bafybeihuul5fzv7kyv64sbwf3qim4bem5ppibctmghwitndmfty76ahfv4", // head
  "bafybeihjngzer4te6hgtdm2i3kvksq3as3zty3qmgbz446dkuzbgdhvfcy", // torso
  "bafybeihxfawjedjbxcjbshc6qpldpcn3wti3jjndajskaerwhyuwalikpi", // lArm
  "bafybeifineuengjnsnxudmuuy62zt2nrf54icg5shfaoeidizizfvz6c7a", // rArm
  "bafybeih2f6gnog23obn4zwqwoqp6b7f3wn44gn2njloatpmy7als7gmp4y", // rleg
  "bafybeidgly5dodid7ifwyi36nsk66mgqrwvphdex5w3nmkmqilx7wiswvy", // lleg
  "bafybeibjg43m3qsouu5gyabgjvitktchho7nj4jrmfexwtqbdxyhacbmpq" // floating
];
const augmentsCIDS = [
  "bafybeihsaouxzrawwghyxily4q3q6ncnrr5zqmfax4a43acrgrpunz7yda", // head
  "bafybeihyfsrugiutnmradxzvoyl4qmq2u2bzn4owmzijvyxrt64s5omkrq", // mouth
  "bafybeih4wb7xscxxober65kwgdabtibpmcnsbfbosnx6rfu5kgz4mehxf4", // eyes
  "bafybeihjvbla55sgg5powjd64mfq76vtqeig7sx4n663zhji73lo7yhzna", // torso
  "bafybeihqaaowoheogsy5qze346rv6xlqz4qap3yu6wetzd2f2gaevwbczm", // larm
  "bafybeigzmedasrb3pkn7zctjgnz5mmx5zhcmsenoydjhlotj3dmcbbzl6e", // rarm
  "bafybeif3smc6fllv55yfspkwhdfch3q75mxeau6awr3tqqrrgzvzdqgcve", // rleg
  "bafybeigzwyjc3mghq5mp32bizgyyowhi5jabdoed2je43pigkpgokuikre", // lleg
  "", // color
  "bafybeihxuhvxcaz2lcqudxhdegqfjkdklhaq6xeavml6kbkrstlitwbkmu", // markings
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
    const registry = await deployRegistry() as MetadataRegistry;
    await registry.deployed();
    console.log("Registry deployed to " + registry.address);
    core721 = await deployCore721("pills.game", registry.address) as Core721;
    await core721.deployed();
    console.log("Core721 deployed to " + core721.address);
    core1155 = await deployCore1155("pills.game", registry.address) as Core1155;
    await core1155.deployed();
    console.log("Core1155 deployed to " + core1155.address);
    options = await deploySelectableOptions() as SelectableOptions;
    await options.deployed();
    console.log("SelectableOptions deployed to " + options.address);

    // In production instances the IDs must line up correctly
    character = await deployCharacterMock(core721, options) as CharacterGenMock;
    await character.deployed();
    console.log("Characters deployed to " + character.address);
    wearablesValidator = await deployWearablesValidator(core1155, character) as WearablesValidator;
    await wearablesValidator.deployed();
    console.log("WearablesValidator deployed to " + wearablesValidator.address);
    augmentsValidator = await deployAugmentsValidator(core1155, character) as AugmentsValidator;
    await augmentsValidator.deployed();
    console.log("AugmentsValidator deployed to " + augmentsValidator.address);
    requester = await deployRequester() as RandomnessRelayL2;
    await requester.deployed();
    console.log("Requester deployed to " + requester.address);
    characterValidator = await deployCharacterValidator(core721, options, wearablesValidator, augmentsValidator, character, requester) as CharacterValidator;
    await characterValidator.deployed();
    console.log("CharacterValidator deployed to " + characterValidator.address);
    receipt = await character.setValidator(characterValidator.address);
    await receipt.wait();
    receipt = await core721.addValidator(characterValidator.address, [coreId]);
    await receipt.wait();
    console.log("Added CharacterValidator to Core721");
    const pillboosts : string[] = [];
    const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
    receipt = await options.addOption("Purple", "Mouth", 1, 1);
    await receipt.wait();
    receipt = await options.addOption("Orange", "Eyes", 2, 1);
    await receipt.wait();
    receipt = await options.addOption("Green", "Type", 3, 1);
    await receipt.wait();
    receipt = await options.addOption("Blue", "Markings", 4, 1);
    await receipt.wait();
    console.log("Added options to SelectableOptions");
    receipt = await characterValidator.createCharacter(pillboosts, traitsplus, {gasLimit: 1000000});
    await receipt.wait();
    console.log("Created character");
    const characterID = await character.playerAddr2Id(owner.address);
    console.log("Character ID: " + characterID);
    await character.equipSkeletonAdmin(0, 1, owner.address);
    receipt = await augmentsValidator.setCID(1, augmentsCIDS[0]);
    await receipt.wait();
    console.log("Set CID for augment " + 0);
    for(let i = 3; i < 8; i++) {
      receipt = await character.equipSkeletonAdmin(i, i+1, owner.address);
      await receipt.wait();
      receipt = await augmentsValidator.setCID(i+1, augmentsCIDS[i]);
      await receipt.wait();
      console.log("Set CID for augment " + i);
    }
    for(let i = 0; i < 7; i++) {
      receipt = await character.equipOutfitAdmin(i, i+1, owner.address);
      await receipt.wait();
      receipt = await wearablesValidator.setCID(i+1, wearablesCIDs[i]);
      await receipt.wait();
      console.log("Set CID for augment " + i);
    }
    console.log("Deployments:",
      "core721:", core721.address,
      "core1155:", core1155.address,
      "options:", options.address,
      "character:", character.address,
      "wearablesValidator:", wearablesValidator.address,
      "augmentsValidator:", augmentsValidator.address,
      "requester:", requester.address,
      "characterValidator:", characterValidator.address
    )
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