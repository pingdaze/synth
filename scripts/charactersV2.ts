import { network, ethers } from "hardhat";
import {
  CharacterValidatorV2,
  RandomnessRelayL2,
  WearablesValidator,
  CharactersV2,
  SelectableOptionsV2,
  Core1155,
  Core721,
  AugmentsValidator,
  Basic1155,
} from "../typechain-types";
import {
  deployCore721,
  deployCore1155,
  deploySelectableOptionsV2,
  deployWearablesValidator,
  deployAugmentsValidator,
  deployCharacterV2,
  deployCharacterValidatorV2,
  deployRequester,
  deployMock1155,
} from "../test/shared/deploys";
import { ContractTransaction } from "ethers";
import { pushOptions } from "../utils/add-options";
import charDeploymant from "./deploy-args/char-mock-deployment.json"

const coreIds = Array.from(Array(800).keys());
const mockCollabId = 1;


const amount = 1;
const legacyPillsAddr = "0x33a4cfc925ad40e5bb2b9b2462d7a1a5a5da4476";

// Replace magic numbers

async function main() {
  // Protect from doing some dumb shit on mainnet
  if(network.name === "mainnet" || network.name === "arbmainnet") {
    return;
  }
  let core721: Core721;
  let core1155: Core1155;
  let booster1155: Core1155;
  let characterValidator: CharacterValidatorV2;
  let wearablesValidator: WearablesValidator;
  let augmentsValidator: AugmentsValidator;
  let requester: RandomnessRelayL2;
  let character: CharactersV2;
  let receipt: ContractTransaction;
  let options: SelectableOptionsV2;
  let owner: string;
  // TODO: Turn this into a cute lil' reusable function
  console.log("Network: " + network.name);
  owner = (await ethers.getSigners())[0].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  let portalPillAddr = "0xa16891897378a82e9f0ad44a705b292c9753538c";
  let portalPill = await ethers.getContractAt('Core1155', portalPillAddr) as Core1155;

  core721 = (await deployCore721()) as Core721;
  await core721.deployed();
  console.log("Core721 address: ", core721.address);
  core1155 = (await deployCore1155()) as Core1155;
  await core1155.deployed();
  console.log("Core1155 address: ", core1155.address);
  booster1155 = (await deployCore1155()) as Core1155;
  await booster1155.deployed();
  console.log("Booster 1155 address: ", core1155.address);
  options = (await deploySelectableOptionsV2(
  )) as SelectableOptionsV2;
  await options.deployed();
  console.log("SelectableOptions address: ", options.address);
  // In production instances the IDs must line up correctly
  character = (await deployCharacterV2(core721, options)) as CharactersV2;
  await character.deployed();
  console.log("Characters address: ", character.address);
  wearablesValidator = (await deployWearablesValidator(
    core1155,
    character
  )) as WearablesValidator;
  await wearablesValidator.deployed();
  receipt = await character.setWearables(wearablesValidator.address);
  await receipt.wait();
  console.log("WearablesValidator address: ", wearablesValidator.address);
  augmentsValidator = (await deployAugmentsValidator(
    core1155,
    character
  )) as AugmentsValidator;
  await augmentsValidator.deployed();
  console.log("AugmentsValidator address: ", augmentsValidator.address);
  requester = (await deployRequester()) as RandomnessRelayL2;
  await requester.deployed();
  console.log("Requester address: ", requester.address);

  characterValidator = (await deployCharacterValidatorV2(
    core721,
    options,
    wearablesValidator,
    character,
    portalPill
  )) as CharacterValidatorV2;
  await characterValidator.deployed();
  console.log("CharacterValidator address: ", characterValidator.address);
  receipt = await character.setValidator(characterValidator.address);
  await receipt.wait();
  console.log("CharacterValidator set");
  receipt = await core721.addValidator(characterValidator.address, coreIds);
  await receipt.wait();
  console.log("WearablesValidator set");
  receipt = await core1155.addValidator(wearablesValidator.address, coreIds);
  await receipt.wait();
  console.log("Character Validator Installed");
  receipt = await booster1155.addValidator(characterValidator.address, coreIds);
  await receipt.wait();
  console.log("Booster Validator Installed");
  await pushOptions(
    options.address,
    wearablesValidator.address,
    augmentsValidator.address
  );
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });