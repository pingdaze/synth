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
  RolesAuthority,
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
  zeroAddress,
} from "../test/shared/deploys";
import { ContractTransaction } from "ethers";
import { pushOptions } from "../utils/add-options";

const coreIds = Array.from(Array(800).keys());
const mockCollabId = 1;


const amount = 1;
const legacyPillsAddr = "0x33a4cfc925ad40e5bb2b9b2462d7a1a5a5da4476";

// Replace magic numbers

async function main() {
  // Doing dumb shit on mainnet
  /*if(network.name === "mainnet" || network.name === "arbmainnet") {
    return;
  }*/
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
  let auth: RolesAuthority;
  // TODO: Turn this into a cute lil' reusable function
  console.log("Network: " + network.name);
  const accounts = await ethers.getSigners();
  owner = (await ethers.getSigners())[3].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  let portalPillAddr = "0xa16891897378a82e9f0ad44a705b292c9753538c";
  let portalPill = await ethers.getContractAt('Core1155', portalPillAddr) as Core1155;
  const RolesAuthority = await ethers.getContractFactory("RolesAuthority");
  auth = (await RolesAuthority.connect(accounts[3]).deploy(
    owner,
    zeroAddress
  )) as RolesAuthority;
  let Factory = await ethers.getContractFactory("Core721");
  core721 =  await Factory.connect(accounts[3]).deploy("", zeroAddress, auth.address) as Core721;
  await core721.deployed();
  console.log("core721 deployed to:", core721.address);

  Factory = await ethers.getContractFactory("Core1155");
  core1155 =  await Factory.connect(accounts[3]).deploy("", zeroAddress, zeroAddress) as Core1155;
  await core1155.deployed();
  console.log("core1155 deployed to:", core1155.address);

  Factory = await ethers.getContractFactory("SelectableOptionsV2");
  options  = await Factory.connect(accounts[3]).deploy() as SelectableOptionsV2;
  await options.deployed();

  console.log("SelectableOptions address: ", options.address);
  // In production instances the IDs must line up correctly
  Factory = await ethers.getContractFactory("CharactersV2", {
  });
  character = await Factory.connect(accounts[3]).deploy(core721.address, options.address, auth.address) as CharactersV2;
  await character.deployed();


  
  const library = await (
    await ethers.getContractFactory("LegacyPills")
  ).connect(accounts[3]).deploy();

  Factory = await ethers.getContractFactory(
    "WearablesValidator",{
    libraries: {
      LegacyPills: library.address,
    }
  });
  wearablesValidator = await Factory.connect(accounts[3]).deploy(character.address, core721.address, auth.address) as WearablesValidator;


  await wearablesValidator.deployed();
  receipt = await character.connect(accounts[3]).setWearables(wearablesValidator.address);
  await receipt.wait();
  console.log("WearablesValidator address: ", wearablesValidator.address);

  Factory = await ethers.getContractFactory(
    "AugmentsValidator"
  );
  augmentsValidator =  await Factory.connect(accounts[3]).deploy(character.address, core721.address, auth.address) as AugmentsValidator;
  await augmentsValidator.deployed();
  Factory = await ethers.getContractFactory(
    "CharacterValidatorV2"
  );
  characterValidator = await Factory.connect(accounts[3]).deploy(
    core721.address,
    options.address,
    wearablesValidator.address,
    character.address,
    10,
    portalPill.address
  ) as CharacterValidatorV2;
  await characterValidator.deployed();
  console.log("CharacterValidator address: ", characterValidator.address);
  receipt = await character.connect(accounts[3]).setValidator(characterValidator.address);
  await receipt.wait();
  console.log("CharacterValidator set");
  receipt = await core721.connect(accounts[3]).addValidator(characterValidator.address, coreIds);
  await receipt.wait();
  console.log("WearablesValidator set");
  receipt = await core1155.connect(accounts[3]).addValidator(wearablesValidator.address, coreIds);
  await receipt.wait();
  console.log("Character Validator Installed");
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