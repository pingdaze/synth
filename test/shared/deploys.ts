import { ethers } from "hardhat";
import {
  Core1155,
  IMintPipe,
  LinkMock,
  VRFCoordinatorMock,
  Characters,
  CharactersV2,
  SelectableOptions,
  SelectableOptionsV2,
  WearablesValidator,
  AugmentsValidator,
  Core721,
  Basic1155,
  RolesAuthority,
  Authority,
  RandomnessRelayL2,
} from "../../typechain-types/";

export const zeroAddress = ethers.constants.AddressZero;
const linkName = "test";
const linkSymbol = "TST";

export const deployMock1155 = async () => {
  const Basic1155 = await ethers.getContractFactory("Basic1155");
  return Basic1155.deploy();
};

export const deployCore1155 = async (
  baseUri = "",
  registry = zeroAddress,
  authority = zeroAddress
) => {
  let [owner] = await ethers.getSigners();
  let auth: RolesAuthority;
  if (authority != zeroAddress) {
    auth = (await ethers.getContractAt(
      "RolesAuthority",
      authority
    )) as RolesAuthority;
  } else {
    const RolesAuthority = await ethers.getContractFactory("RolesAuthority");
    auth = (await RolesAuthority.deploy(
      owner.address,
      zeroAddress
    )) as RolesAuthority;
  }
  const Collectible = await ethers.getContractFactory("Core1155");
  return Collectible.deploy(baseUri, registry, auth.address);
};

export const deployCore721 = async (
  baseUri = "",
  registry = zeroAddress,
  authority = zeroAddress
) => {
  let [owner] = await ethers.getSigners();
  let auth: RolesAuthority;
  if (authority != zeroAddress) {
    auth = (await ethers.getContractAt(
      "RolesAuthority",
      authority
    )) as RolesAuthority;
  } else {
    const RolesAuthority = await ethers.getContractFactory("RolesAuthority");
    auth = (await RolesAuthority.deploy(
      owner.address,
      zeroAddress
    )) as RolesAuthority;
  }
  const Collectible = await ethers.getContractFactory("Core721");
  return Collectible.deploy(baseUri, registry, auth.address);
};
export const deployAuctionValidator = async (core: Core1155) => {
  const AuctionValidator = await ethers.getContractFactory("AuctionValidator");

  return AuctionValidator.deploy(core.address);
};

export const deployLink = async (name = linkName, symbol = linkSymbol) => {
  const LinkMock = await ethers.getContractFactory("LinkMock");
  return LinkMock.deploy(name, symbol);
};
export const deployCoordinator = async (link: LinkMock) => {
  const VRFCoordinatorMock = await ethers.getContractFactory(
    "VRFCoordinatorMock"
  );
  return VRFCoordinatorMock.deploy(link.address);
};

export const deployBoosterValidator = async (
  core: Core1155,
  coordinator: VRFCoordinatorMock,
  link: LinkMock
) => {
  const BoosterValidator = await ethers.getContractFactory("BoosterValidator");

  return BoosterValidator.deploy(
    core.address,
    coordinator.address,
    link.address
  );
};

export const deployCharacterValidator = async (
  core: Core721,
  options: SelectableOptions,
  wearablesValidator: WearablesValidator,
  augmentsValidator: AugmentsValidator,

  character: Characters,
  collab: Core1155,
  legacy: Core1155,
  booster: Core1155,
  charCount = 10
) => {

  const CharacterValidator = await ethers.getContractFactory(
    "CharacterValidator"
  );
  return CharacterValidator.deploy(
    core.address,
    options.address,
    wearablesValidator.address,
    augmentsValidator.address,

    character.address,
    charCount,
    collab.address,
    legacy.address,
    booster.address
  );
};
export const deployCharacterValidatorV2 = async (
  core: Core721,
  options: SelectableOptionsV2,
  wearablesValidator: WearablesValidator,
  character: CharactersV2,
  charCount = 10
) => {

  const CharacterValidator = await ethers.getContractFactory(
    "CharacterValidatorV2"
  );
  return CharacterValidator.deploy(
    core.address,
    options.address,
    wearablesValidator.address,
    character.address,
    charCount,
  );
};

export const deployWearablesValidator = async (
  core: Core1155,
  character: Characters | CharactersV2,
  authority: Authority | string = zeroAddress
) => {

  const library = await (
    await ethers.getContractFactory("LegacyPills")
  ).deploy();

  const WearablesValidator = await ethers.getContractFactory(
    "WearablesValidator",{
    libraries: {
      LegacyPills: library.address,
    }
  });
  return WearablesValidator.deploy(character.address, core.address, authority);


};
export const deployAggregateValidator = async (
  core: Core1155,
  id: number,
  supply: number,
  authority: Authority | string = zeroAddress
) => {
  const AggregateValidator = await ethers.getContractFactory(
    "AggregateValidator"
  );
  return AggregateValidator.deploy(
    core.address,
    id,
    supply,
    getAuthAddr(authority)
  );
};

export const deployAugmentsValidator = async (
  core: Core1155,
  character: Characters | CharactersV2,
  authority: Authority | string = zeroAddress
) => {
  const AugmentsValidator = await ethers.getContractFactory(
    "AugmentsValidator"
  );
  return AugmentsValidator.deploy(character.address, core.address, authority);
};

export const deployCharacter = async (
  core: Core721,
  options: SelectableOptions,
  authority: Authority | string = zeroAddress
) => {
  const library = await (
    await ethers.getContractFactory("CharacterLibrary")
  ).deploy();
  const characters = await ethers.getContractFactory("Characters", {
    libraries: {
      CharacterLibrary: library.address,
    },
  });
  return characters.deploy(core.address, options.address, authority);
};

export const deployCharacterV2 = async (
  core: Core721,
  options: SelectableOptionsV2,
  authority: Authority | string = zeroAddress
) => {

  const characters = await ethers.getContractFactory("CharactersV2", {
  });
  return characters.deploy(core.address, options.address, authority);
};
export const deployCharacterMock = async (
  core: Core721,
  options: SelectableOptions,
  authority: Authority | string = zeroAddress
) => {
  const library = await (
    await ethers.getContractFactory("CharacterLibrary")
  ).deploy();
  const characters = await ethers.getContractFactory("CharacterGenMock", {
    libraries: {
      CharacterLibrary: library.address,
    },
  });
  return characters.deploy(core.address, options.address, authority);
};

export const deploySelectableOptions = async (
  legacyAddr: string = "0x33a4cfc925ad40e5bb2b9b2462d7a1a5a5da4476",
  collabAddr: string = zeroAddress
) => {
  const library = await (
    await ethers.getContractFactory("LegacyPills")
  ).deploy();
  const Options = await ethers.getContractFactory("SelectableOptions", {
    libraries: {
      LegacyPills: library.address,
    },
  });
  return Options.deploy(legacyAddr, collabAddr);
};
export const deploySelectableOptionsV2 = async (
) => {
  const Options = await ethers.getContractFactory("SelectableOptionsV2");
  return Options.deploy();
};

export const deployCheckerValidator = async (
  core: Core1155,
  nift: Basic1155,
  _id = 1
) => {
  const CheckerValidator = await ethers.getContractFactory("CheckerValidator");
  return CheckerValidator.deploy(core.address, nift.address, _id);
};
export const deployAirdropValidator = async (
  core: Core1155,
  authority: Authority | string = zeroAddress
) => {
  const AirdropValidator = await ethers.getContractFactory("AirdropValidator");
  return AirdropValidator.deploy(core.address, getAuthAddr(authority));
};
export const deployCheckerValidatorV2 = async (
  core: IMintPipe,
  nift: Basic1155,
  _id = 1,
  authority: Authority | string = zeroAddress
) => {
  const CheckerValidator = await ethers.getContractFactory(
    "CheckerValidatorV2"
  );
  return CheckerValidator.deploy(
    core.address,
    nift.address,
    _id,
    getAuthAddr(authority)
  );
};

export const deployPaymentValidator = async (
  core: Core1155,
  _id = 1,
  _cost = ethers.utils.parseEther("1"),
  _supply = 10000
) => {
  const accounts = await ethers.getSigners();
  const PaymentValidator = await ethers.getContractFactory("PaymentValidator");
  return PaymentValidator.connect(accounts[3]).deploy(
    core.address,
    _id,
    _cost,
    _supply
  );
};
export const deployPaymentValidatorV2 = async (
  core: IMintPipe,
  _id = 1,
  _cost = ethers.utils.parseEther("1"),
  _supply = 10000,
  authority: Authority | string = zeroAddress
) => {
  const accounts = await ethers.getSigners();
  const PaymentValidator = await ethers.getContractFactory(
    "PaymentValidatorV2"
  );
  return PaymentValidator.connect(accounts[3]).deploy(
    core.address,
    _id,
    _cost,
    _supply,
    getAuthAddr(authority)
  );
};

export const deployBasicValidator = async (id: number, core: Core1155) => {
  const Validator = await ethers.getContractFactory("BasicValidator");
  return Validator.deploy(id, core.address);
};

export const deployHolder = async () => {
  const Holder = await ethers.getContractFactory("CollectibleHolder");
  return Holder.deploy();
};

export const deployRegistry = async (
  authority: Authority | string = zeroAddress
) => {
  const Registry = await ethers.getContractFactory("MetadataRegistry");
  return Registry.deploy(getAuthAddr(authority));
};

export const deploySequenceValidator = async (core: Core1155) => {
  const Validator = await ethers.getContractFactory("SequenceValidator");
  return Validator.deploy(core.address);
};

export const deployMultiAuth = async (
  owner: string,
  authority: Authority | string = zeroAddress
) => {
  const MultiRolesAuthority = await ethers.getContractFactory(
    "MultiRolesAuthority"
  );
  return MultiRolesAuthority.deploy(owner, getAuthAddr(authority));
};

export const deployRequester = async (
  target: string = zeroAddress,
  index: string = zeroAddress,
  authority: Authority | string = zeroAddress
) => {
  const Requester = await ethers.getContractFactory("RandomnessRelayL2");
  return Requester.deploy(target, index, getAuthAddr(authority));
};

function isAuthority(authority: Authority | string): authority is Authority {
  return (authority as Authority).address !== undefined;
}

function getAuthAddr(authority: Authority | string) {
  return isAuthority(authority) ? authority.address : authority;
}
