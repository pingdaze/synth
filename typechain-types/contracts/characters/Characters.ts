/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export type CharacterStruct = {
  characterId: BigNumberish;
  player: string;
  faction: BigNumberish;
  class: BigNumberish;
  pillboosts: string[];
  attributes: BigNumberish[];
  traitsPlus: string[];
};

export type CharacterStructOutput = [
  BigNumber,
  string,
  BigNumber,
  BigNumber,
  string[],
  BigNumber[],
  string[]
] & {
  characterId: BigNumber;
  player: string;
  faction: BigNumber;
  class: BigNumber;
  pillboosts: string[];
  attributes: BigNumber[];
  traitsPlus: string[];
};

export type OutfitStruct = {
  head: BigNumberish;
  torso: BigNumberish;
  lArm: BigNumberish;
  rArm: BigNumberish;
  rLeg: BigNumberish;
  lLeg: BigNumberish;
  floating: BigNumberish;
};

export type OutfitStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  head: BigNumber;
  torso: BigNumber;
  lArm: BigNumber;
  rArm: BigNumber;
  rLeg: BigNumber;
  lLeg: BigNumber;
  floating: BigNumber;
};

export type SkeletonStruct = {
  head: BigNumberish;
  mouth: BigNumberish;
  eyes: BigNumberish;
  torso: BigNumberish;
  lArm: BigNumberish;
  rArm: BigNumberish;
  rLeg: BigNumberish;
  lLeg: BigNumberish;
  color: BigNumberish;
  marking: BigNumberish;
  mask: BigNumberish;
};

export type SkeletonStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  head: BigNumber;
  mouth: BigNumber;
  eyes: BigNumber;
  torso: BigNumber;
  lArm: BigNumber;
  rArm: BigNumber;
  rLeg: BigNumber;
  lLeg: BigNumber;
  color: BigNumber;
  marking: BigNumber;
  mask: BigNumber;
};

export interface CharactersInterface extends utils.Interface {
  functions: {
    "addPlayer(uint256,address,address[],string[])": FunctionFragment;
    "authority()": FunctionFragment;
    "characters(uint256)": FunctionFragment;
    "core()": FunctionFragment;
    "equipOutfit(uint256,uint32,address)": FunctionFragment;
    "equipSkeleton(uint256,uint32,address)": FunctionFragment;
    "exp()": FunctionFragment;
    "getCharacter(uint256)": FunctionFragment;
    "getIdFromAddress(address)": FunctionFragment;
    "getOutfit(uint256)": FunctionFragment;
    "getSkeleton(uint256)": FunctionFragment;
    "outfits(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "playerAddr2Id(address)": FunctionFragment;
    "removePlayer(uint256,address)": FunctionFragment;
    "rep()": FunctionFragment;
    "selectableOptions()": FunctionFragment;
    "setAuthority(address)": FunctionFragment;
    "setOutfit(uint256,(uint256,uint256,uint256,uint256,uint256,uint256,uint256))": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "setPlayer(uint256,address)": FunctionFragment;
    "setREP(address)": FunctionFragment;
    "setSkeleton(uint256,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))": FunctionFragment;
    "setValidator(address)": FunctionFragment;
    "setXP(address)": FunctionFragment;
    "skeletons(uint256)": FunctionFragment;
    "unequipOutfit(uint256,address)": FunctionFragment;
    "unequipSkeleton(uint256,address)": FunctionFragment;
    "wearables()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addPlayer"
      | "authority"
      | "characters"
      | "core"
      | "equipOutfit"
      | "equipSkeleton"
      | "exp"
      | "getCharacter"
      | "getIdFromAddress"
      | "getOutfit"
      | "getSkeleton"
      | "outfits"
      | "owner"
      | "playerAddr2Id"
      | "removePlayer"
      | "rep"
      | "selectableOptions"
      | "setAuthority"
      | "setOutfit"
      | "setOwner"
      | "setPlayer"
      | "setREP"
      | "setSkeleton"
      | "setValidator"
      | "setXP"
      | "skeletons"
      | "unequipOutfit"
      | "unequipSkeleton"
      | "wearables"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addPlayer",
    values: [BigNumberish, string, string[], string[]]
  ): string;
  encodeFunctionData(functionFragment: "authority", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "characters",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "core", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "equipOutfit",
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "equipSkeleton",
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "exp", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCharacter",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getIdFromAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getOutfit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSkeleton",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "outfits",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "playerAddr2Id",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removePlayer",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "rep", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "selectableOptions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAuthority",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setOutfit",
    values: [BigNumberish, OutfitStruct]
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setPlayer",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "setREP", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setSkeleton",
    values: [BigNumberish, SkeletonStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "setValidator",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setXP", values: [string]): string;
  encodeFunctionData(
    functionFragment: "skeletons",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unequipOutfit",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "unequipSkeleton",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "wearables", values?: undefined): string;

  decodeFunctionResult(functionFragment: "addPlayer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authority", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "characters", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "core", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "equipOutfit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "equipSkeleton",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCharacter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIdFromAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOutfit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSkeleton",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "outfits", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "playerAddr2Id",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removePlayer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rep", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "selectableOptions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAuthority",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setOutfit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setPlayer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setREP", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setSkeleton",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setValidator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setXP", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "skeletons", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unequipOutfit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unequipSkeleton",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wearables", data: BytesLike): Result;

  events: {
    "AuthorityUpdated(address,address)": EventFragment;
    "OwnerUpdated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuthorityUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerUpdated"): EventFragment;
}

export interface AuthorityUpdatedEventObject {
  user: string;
  newAuthority: string;
}
export type AuthorityUpdatedEvent = TypedEvent<
  [string, string],
  AuthorityUpdatedEventObject
>;

export type AuthorityUpdatedEventFilter =
  TypedEventFilter<AuthorityUpdatedEvent>;

export interface OwnerUpdatedEventObject {
  user: string;
  newOwner: string;
}
export type OwnerUpdatedEvent = TypedEvent<
  [string, string],
  OwnerUpdatedEventObject
>;

export type OwnerUpdatedEventFilter = TypedEventFilter<OwnerUpdatedEvent>;

export interface Characters extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CharactersInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addPlayer(
      _id: BigNumberish,
      _player: string,
      pillboosts: string[],
      traitsPlus: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    authority(overrides?: CallOverrides): Promise<[string]>;

    characters(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber] & {
        characterId: BigNumber;
        player: string;
        faction: BigNumber;
        class: BigNumber;
      }
    >;

    core(overrides?: CallOverrides): Promise<[string]>;

    equipOutfit(
      slotID: BigNumberish,
      id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    equipSkeleton(
      slotID: BigNumberish,
      id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exp(overrides?: CallOverrides): Promise<[string]>;

    getCharacter(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[CharacterStructOutput]>;

    getIdFromAddress(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getOutfit(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[OutfitStructOutput]>;

    getSkeleton(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[SkeletonStructOutput]>;

    outfits(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        head: BigNumber;
        torso: BigNumber;
        lArm: BigNumber;
        rArm: BigNumber;
        rLeg: BigNumber;
        lLeg: BigNumber;
        floating: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    playerAddr2Id(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    removePlayer(
      _id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rep(overrides?: CallOverrides): Promise<[string]>;

    selectableOptions(overrides?: CallOverrides): Promise<[string]>;

    setAuthority(
      newAuthority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOutfit(
      _characterID: BigNumberish,
      outfit: OutfitStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPlayer(
      _id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setREP(
      _rep: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSkeleton(
      _characterID: BigNumberish,
      skeleton: SkeletonStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setValidator(
      validator_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setXP(
      _exp: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    skeletons(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        head: BigNumber;
        mouth: BigNumber;
        eyes: BigNumber;
        torso: BigNumber;
        lArm: BigNumber;
        rArm: BigNumber;
        rLeg: BigNumber;
        lLeg: BigNumber;
        color: BigNumber;
        marking: BigNumber;
        mask: BigNumber;
      }
    >;

    unequipOutfit(
      slotID: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unequipSkeleton(
      slotID: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    wearables(overrides?: CallOverrides): Promise<[string]>;
  };

  addPlayer(
    _id: BigNumberish,
    _player: string,
    pillboosts: string[],
    traitsPlus: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  authority(overrides?: CallOverrides): Promise<string>;

  characters(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber, BigNumber] & {
      characterId: BigNumber;
      player: string;
      faction: BigNumber;
      class: BigNumber;
    }
  >;

  core(overrides?: CallOverrides): Promise<string>;

  equipOutfit(
    slotID: BigNumberish,
    id: BigNumberish,
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  equipSkeleton(
    slotID: BigNumberish,
    id: BigNumberish,
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exp(overrides?: CallOverrides): Promise<string>;

  getCharacter(
    tokenID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<CharacterStructOutput>;

  getIdFromAddress(
    _addr: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getOutfit(
    tokenID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<OutfitStructOutput>;

  getSkeleton(
    tokenID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<SkeletonStructOutput>;

  outfits(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      head: BigNumber;
      torso: BigNumber;
      lArm: BigNumber;
      rArm: BigNumber;
      rLeg: BigNumber;
      lLeg: BigNumber;
      floating: BigNumber;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  playerAddr2Id(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  removePlayer(
    _id: BigNumberish,
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rep(overrides?: CallOverrides): Promise<string>;

  selectableOptions(overrides?: CallOverrides): Promise<string>;

  setAuthority(
    newAuthority: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOutfit(
    _characterID: BigNumberish,
    outfit: OutfitStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOwner(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPlayer(
    _id: BigNumberish,
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setREP(
    _rep: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSkeleton(
    _characterID: BigNumberish,
    skeleton: SkeletonStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setValidator(
    validator_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setXP(
    _exp: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  skeletons(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      head: BigNumber;
      mouth: BigNumber;
      eyes: BigNumber;
      torso: BigNumber;
      lArm: BigNumber;
      rArm: BigNumber;
      rLeg: BigNumber;
      lLeg: BigNumber;
      color: BigNumber;
      marking: BigNumber;
      mask: BigNumber;
    }
  >;

  unequipOutfit(
    slotID: BigNumberish,
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unequipSkeleton(
    slotID: BigNumberish,
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  wearables(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    addPlayer(
      _id: BigNumberish,
      _player: string,
      pillboosts: string[],
      traitsPlus: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    authority(overrides?: CallOverrides): Promise<string>;

    characters(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber] & {
        characterId: BigNumber;
        player: string;
        faction: BigNumber;
        class: BigNumber;
      }
    >;

    core(overrides?: CallOverrides): Promise<string>;

    equipOutfit(
      slotID: BigNumberish,
      id: BigNumberish,
      _player: string,
      overrides?: CallOverrides
    ): Promise<void>;

    equipSkeleton(
      slotID: BigNumberish,
      id: BigNumberish,
      _player: string,
      overrides?: CallOverrides
    ): Promise<void>;

    exp(overrides?: CallOverrides): Promise<string>;

    getCharacter(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<CharacterStructOutput>;

    getIdFromAddress(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOutfit(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<OutfitStructOutput>;

    getSkeleton(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<SkeletonStructOutput>;

    outfits(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        head: BigNumber;
        torso: BigNumber;
        lArm: BigNumber;
        rArm: BigNumber;
        rLeg: BigNumber;
        lLeg: BigNumber;
        floating: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    playerAddr2Id(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    removePlayer(
      _id: BigNumberish,
      _player: string,
      overrides?: CallOverrides
    ): Promise<void>;

    rep(overrides?: CallOverrides): Promise<string>;

    selectableOptions(overrides?: CallOverrides): Promise<string>;

    setAuthority(
      newAuthority: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setOutfit(
      _characterID: BigNumberish,
      outfit: OutfitStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    setOwner(newOwner: string, overrides?: CallOverrides): Promise<void>;

    setPlayer(
      _id: BigNumberish,
      _player: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setREP(_rep: string, overrides?: CallOverrides): Promise<void>;

    setSkeleton(
      _characterID: BigNumberish,
      skeleton: SkeletonStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    setValidator(validator_: string, overrides?: CallOverrides): Promise<void>;

    setXP(_exp: string, overrides?: CallOverrides): Promise<void>;

    skeletons(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        head: BigNumber;
        mouth: BigNumber;
        eyes: BigNumber;
        torso: BigNumber;
        lArm: BigNumber;
        rArm: BigNumber;
        rLeg: BigNumber;
        lLeg: BigNumber;
        color: BigNumber;
        marking: BigNumber;
        mask: BigNumber;
      }
    >;

    unequipOutfit(
      slotID: BigNumberish,
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    unequipSkeleton(
      slotID: BigNumberish,
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    wearables(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "AuthorityUpdated(address,address)"(
      user?: string | null,
      newAuthority?: string | null
    ): AuthorityUpdatedEventFilter;
    AuthorityUpdated(
      user?: string | null,
      newAuthority?: string | null
    ): AuthorityUpdatedEventFilter;

    "OwnerUpdated(address,address)"(
      user?: string | null,
      newOwner?: string | null
    ): OwnerUpdatedEventFilter;
    OwnerUpdated(
      user?: string | null,
      newOwner?: string | null
    ): OwnerUpdatedEventFilter;
  };

  estimateGas: {
    addPlayer(
      _id: BigNumberish,
      _player: string,
      pillboosts: string[],
      traitsPlus: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    authority(overrides?: CallOverrides): Promise<BigNumber>;

    characters(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    core(overrides?: CallOverrides): Promise<BigNumber>;

    equipOutfit(
      slotID: BigNumberish,
      id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    equipSkeleton(
      slotID: BigNumberish,
      id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exp(overrides?: CallOverrides): Promise<BigNumber>;

    getCharacter(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIdFromAddress(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOutfit(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSkeleton(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    outfits(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    playerAddr2Id(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    removePlayer(
      _id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rep(overrides?: CallOverrides): Promise<BigNumber>;

    selectableOptions(overrides?: CallOverrides): Promise<BigNumber>;

    setAuthority(
      newAuthority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOutfit(
      _characterID: BigNumberish,
      outfit: OutfitStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPlayer(
      _id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setREP(
      _rep: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSkeleton(
      _characterID: BigNumberish,
      skeleton: SkeletonStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setValidator(
      validator_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setXP(
      _exp: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    skeletons(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    unequipOutfit(
      slotID: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unequipSkeleton(
      slotID: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    wearables(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addPlayer(
      _id: BigNumberish,
      _player: string,
      pillboosts: string[],
      traitsPlus: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    authority(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    characters(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    core(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    equipOutfit(
      slotID: BigNumberish,
      id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    equipSkeleton(
      slotID: BigNumberish,
      id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCharacter(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getIdFromAddress(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOutfit(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSkeleton(
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    outfits(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    playerAddr2Id(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removePlayer(
      _id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rep(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    selectableOptions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setAuthority(
      newAuthority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOutfit(
      _characterID: BigNumberish,
      outfit: OutfitStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPlayer(
      _id: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setREP(
      _rep: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSkeleton(
      _characterID: BigNumberish,
      skeleton: SkeletonStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setValidator(
      validator_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setXP(
      _exp: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    skeletons(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    unequipOutfit(
      slotID: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unequipSkeleton(
      slotID: BigNumberish,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    wearables(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}