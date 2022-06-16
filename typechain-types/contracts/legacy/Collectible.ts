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

export interface CollectibleInterface extends utils.Interface {
  functions: {
    "balanceOf(address,uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "maxIndex(uint256)": FunctionFragment;
    "uri(uint256)": FunctionFragment;
    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "create(uint256,string,bool,address[])": FunctionFragment;
    "mintFungibles(uint256,address[],uint256[])": FunctionFragment;
    "balanceOfBatch(address[],uint256[])": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "setURI(string,uint256)": FunctionFragment;
    "setBaseMetadataURI(string)": FunctionFragment;
    "owner()": FunctionFragment;
    "nfOwners(uint256)": FunctionFragment;
    "proofs(uint256)": FunctionFragment;
    "mint(uint256,uint256,string,address[])": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "nonce()": FunctionFragment;
    "creators(uint256)": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "safeTransferFrom(address,address,uint256,uint256,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "balanceOf"
      | "supportsInterface"
      | "maxIndex"
      | "uri"
      | "safeBatchTransferFrom"
      | "create"
      | "mintFungibles"
      | "balanceOfBatch"
      | "ownerOf"
      | "setURI"
      | "setBaseMetadataURI"
      | "owner"
      | "nfOwners"
      | "proofs"
      | "mint"
      | "setApprovalForAll"
      | "nonce"
      | "creators"
      | "isApprovedForAll"
      | "safeTransferFrom"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "maxIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "uri", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "safeBatchTransferFrom",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [BigNumberish, string, boolean, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "mintFungibles",
    values: [BigNumberish, string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfBatch",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setURI",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setBaseMetadataURI",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nfOwners",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "proofs",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [BigNumberish, BigNumberish, string, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "creators",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "maxIndex", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "safeBatchTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintFungibles",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setBaseMetadataURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nfOwners", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proofs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "creators", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;

  events: {
    "NewCollectible(address,uint256,uint256)": EventFragment;
    "Generation(uint256,uint256,uint256,string)": EventFragment;
    "TransferSingle(address,address,address,uint256,uint256)": EventFragment;
    "TransferBatch(address,address,address,uint256[],uint256[])": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "URI(string,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewCollectible"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Generation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferSingle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferBatch"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "URI"): EventFragment;
}

export interface NewCollectibleEventObject {
  _creator: string;
  _type: BigNumber;
  _proofCount: BigNumber;
}
export type NewCollectibleEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  NewCollectibleEventObject
>;

export type NewCollectibleEventFilter = TypedEventFilter<NewCollectibleEvent>;

export interface GenerationEventObject {
  _type: BigNumber;
  _maxSubType: BigNumber;
  _generation: BigNumber;
  _uriId: string;
}
export type GenerationEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, string],
  GenerationEventObject
>;

export type GenerationEventFilter = TypedEventFilter<GenerationEvent>;

export interface TransferSingleEventObject {
  _operator: string;
  _from: string;
  _to: string;
  _id: BigNumber;
  _value: BigNumber;
}
export type TransferSingleEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  TransferSingleEventObject
>;

export type TransferSingleEventFilter = TypedEventFilter<TransferSingleEvent>;

export interface TransferBatchEventObject {
  _operator: string;
  _from: string;
  _to: string;
  _ids: BigNumber[];
  _values: BigNumber[];
}
export type TransferBatchEvent = TypedEvent<
  [string, string, string, BigNumber[], BigNumber[]],
  TransferBatchEventObject
>;

export type TransferBatchEventFilter = TypedEventFilter<TransferBatchEvent>;

export interface ApprovalForAllEventObject {
  _owner: string;
  _operator: string;
  _approved: boolean;
}
export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  ApprovalForAllEventObject
>;

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

export interface URIEventObject {
  _value: string;
  _id: BigNumber;
}
export type URIEvent = TypedEvent<[string, BigNumber], URIEventObject>;

export type URIEventFilter = TypedEventFilter<URIEvent>;

export interface Collectible extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CollectibleInterface;

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
    balanceOf(
      _owner: string,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    supportsInterface(
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    maxIndex(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    uri(_id: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    safeBatchTransferFrom(
      _from: string,
      _to: string,
      _ids: BigNumberish[],
      _values: BigNumberish[],
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    create(
      _artistProofs: BigNumberish,
      _uri: string,
      _isNF: boolean,
      _to: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintFungibles(
      _id: BigNumberish,
      _to: string[],
      _quantities: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOfBatch(
      _owners: string[],
      _ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    ownerOf(_id: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    setURI(
      _uriId: string,
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBaseMetadataURI(
      _newBaseMetadataURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    nfOwners(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    proofs(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    mint(
      _type: BigNumberish,
      _editions: BigNumberish,
      _uriId: string,
      _to: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    creators(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    safeTransferFrom(
      _from: string,
      _to: string,
      _id: BigNumberish,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  balanceOf(
    _owner: string,
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  supportsInterface(
    _interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  maxIndex(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  uri(_id: BigNumberish, overrides?: CallOverrides): Promise<string>;

  safeBatchTransferFrom(
    _from: string,
    _to: string,
    _ids: BigNumberish[],
    _values: BigNumberish[],
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  create(
    _artistProofs: BigNumberish,
    _uri: string,
    _isNF: boolean,
    _to: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintFungibles(
    _id: BigNumberish,
    _to: string[],
    _quantities: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOfBatch(
    _owners: string[],
    _ids: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  ownerOf(_id: BigNumberish, overrides?: CallOverrides): Promise<string>;

  setURI(
    _uriId: string,
    _id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBaseMetadataURI(
    _newBaseMetadataURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  nfOwners(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  proofs(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  mint(
    _type: BigNumberish,
    _editions: BigNumberish,
    _uriId: string,
    _to: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    _operator: string,
    _approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nonce(overrides?: CallOverrides): Promise<BigNumber>;

  creators(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  isApprovedForAll(
    _owner: string,
    _operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  safeTransferFrom(
    _from: string,
    _to: string,
    _id: BigNumberish,
    _value: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    balanceOf(
      _owner: string,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    maxIndex(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    uri(_id: BigNumberish, overrides?: CallOverrides): Promise<string>;

    safeBatchTransferFrom(
      _from: string,
      _to: string,
      _ids: BigNumberish[],
      _values: BigNumberish[],
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    create(
      _artistProofs: BigNumberish,
      _uri: string,
      _isNF: boolean,
      _to: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mintFungibles(
      _id: BigNumberish,
      _to: string[],
      _quantities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOfBatch(
      _owners: string[],
      _ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    ownerOf(_id: BigNumberish, overrides?: CallOverrides): Promise<string>;

    setURI(
      _uriId: string,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setBaseMetadataURI(
      _newBaseMetadataURI: string,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    nfOwners(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    proofs(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      _type: BigNumberish,
      _editions: BigNumberish,
      _uriId: string,
      _to: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    creators(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    safeTransferFrom(
      _from: string,
      _to: string,
      _id: BigNumberish,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "NewCollectible(address,uint256,uint256)"(
      _creator?: string | null,
      _type?: BigNumberish | null,
      _proofCount?: null
    ): NewCollectibleEventFilter;
    NewCollectible(
      _creator?: string | null,
      _type?: BigNumberish | null,
      _proofCount?: null
    ): NewCollectibleEventFilter;

    "Generation(uint256,uint256,uint256,string)"(
      _type?: null,
      _maxSubType?: null,
      _generation?: null,
      _uriId?: null
    ): GenerationEventFilter;
    Generation(
      _type?: null,
      _maxSubType?: null,
      _generation?: null,
      _uriId?: null
    ): GenerationEventFilter;

    "TransferSingle(address,address,address,uint256,uint256)"(
      _operator?: string | null,
      _from?: string | null,
      _to?: string | null,
      _id?: null,
      _value?: null
    ): TransferSingleEventFilter;
    TransferSingle(
      _operator?: string | null,
      _from?: string | null,
      _to?: string | null,
      _id?: null,
      _value?: null
    ): TransferSingleEventFilter;

    "TransferBatch(address,address,address,uint256[],uint256[])"(
      _operator?: string | null,
      _from?: string | null,
      _to?: string | null,
      _ids?: null,
      _values?: null
    ): TransferBatchEventFilter;
    TransferBatch(
      _operator?: string | null,
      _from?: string | null,
      _to?: string | null,
      _ids?: null,
      _values?: null
    ): TransferBatchEventFilter;

    "ApprovalForAll(address,address,bool)"(
      _owner?: string | null,
      _operator?: string | null,
      _approved?: null
    ): ApprovalForAllEventFilter;
    ApprovalForAll(
      _owner?: string | null,
      _operator?: string | null,
      _approved?: null
    ): ApprovalForAllEventFilter;

    "URI(string,uint256)"(
      _value?: null,
      _id?: BigNumberish | null
    ): URIEventFilter;
    URI(_value?: null, _id?: BigNumberish | null): URIEventFilter;
  };

  estimateGas: {
    balanceOf(
      _owner: string,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxIndex(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    uri(_id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    safeBatchTransferFrom(
      _from: string,
      _to: string,
      _ids: BigNumberish[],
      _values: BigNumberish[],
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    create(
      _artistProofs: BigNumberish,
      _uri: string,
      _isNF: boolean,
      _to: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintFungibles(
      _id: BigNumberish,
      _to: string[],
      _quantities: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOfBatch(
      _owners: string[],
      _ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ownerOf(_id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    setURI(
      _uriId: string,
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBaseMetadataURI(
      _newBaseMetadataURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    nfOwners(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    proofs(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      _type: BigNumberish,
      _editions: BigNumberish,
      _uriId: string,
      _to: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    creators(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeTransferFrom(
      _from: string,
      _to: string,
      _id: BigNumberish,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(
      _owner: string,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxIndex(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    uri(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeBatchTransferFrom(
      _from: string,
      _to: string,
      _ids: BigNumberish[],
      _values: BigNumberish[],
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    create(
      _artistProofs: BigNumberish,
      _uri: string,
      _isNF: boolean,
      _to: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintFungibles(
      _id: BigNumberish,
      _to: string[],
      _quantities: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOfBatch(
      _owners: string[],
      _ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ownerOf(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setURI(
      _uriId: string,
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBaseMetadataURI(
      _newBaseMetadataURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nfOwners(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proofs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mint(
      _type: BigNumberish,
      _editions: BigNumberish,
      _uriId: string,
      _to: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    creators(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeTransferFrom(
      _from: string,
      _to: string,
      _id: BigNumberish,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
