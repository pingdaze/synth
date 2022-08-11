import { network, ethers } from "hardhat";
import {
  CharacterValidator,
  RandomnessRelayL2,
  WearablesValidator,
  Characters,
  SelectableOptions,
  Core1155,
  Core721,
  AugmentsValidator,
  Basic1155,
} from "../typechain-types";
import {
  deployCore721,
  deployCore1155,
  deploySelectableOptions,
  deployWearablesValidator,
  deployAugmentsValidator,
  deployCharacter,
  deployCharacterValidator,
  deployRequester,
  deployMock1155,
} from "../test/shared/deploys";
import { ContractTransaction } from "ethers";
import { pushOptions } from "../utils/add-options";
import charDeploymant from "./deploy-args/char-mock-deployment.json"

const coreIds = Array.from(Array(200).keys());
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
  let characterValidator: CharacterValidator;
  let wearablesValidator: WearablesValidator;
  let augmentsValidator: AugmentsValidator;
  let requester: RandomnessRelayL2;
  let character: Characters;
  let receipt: ContractTransaction;
  let options: SelectableOptions;
  let owner: string;
  // TODO: Turn this into a cute lil' reusable function
  console.log("Network: " + network.name);
  owner = (await ethers.getSigners())[0].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  if(network.name === "arbrinkeby") {
    core721 = (await deployCore721()) as Core721;
    await core721.deployed();
    console.log("Core721 address: ", core721.address);
    core1155 = (await deployCore1155()) as Core1155;
    await core1155.deployed();
    console.log("Core1155 address: ", core1155.address);
    const pills1155 = await ethers.getContractAt("Core1155", charDeploymant.ArbRinkeby.Pills1155) as Core1155;

    options = (await deploySelectableOptions(
      pills1155.address,
      pills1155.address
    )) as SelectableOptions;
    await options.deployed();
    console.log("SelectableOptions address: ", options.address);
    // In production instances the IDs must line up correctly
    character = (await deployCharacter(core721, options)) as Characters;
    await character.deployed();
    console.log("Characters address: ", character.address);
    wearablesValidator = (await deployWearablesValidator(
      core1155,
      character
    )) as WearablesValidator;
    await wearablesValidator.deployed();
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

    characterValidator = (await deployCharacterValidator(
      core721,
      options,
      wearablesValidator,
      augmentsValidator,
      character,
      requester,
      pills1155,
      pills1155
    )) as CharacterValidator;
    await characterValidator.deployed();
    console.log("CharacterValidator address: ", characterValidator.address);
    receipt = await character.setValidator(characterValidator.address);
    await receipt.wait();
    console.log("CharacterValidator set");
    receipt = await core721.addValidator(characterValidator.address, coreIds);
    await receipt.wait();
    console.log("Character Validator Installed");
    await pushOptions(
      options.address,
      wearablesValidator.address,
      augmentsValidator.address
    );
  }
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });