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

export interface SequenceValidatorInterface extends utils.Interface {
  functions: {
    "core()": FunctionFragment;
    "createDrop(uint256,uint16,uint64,uint64,uint16)": FunctionFragment;
    "drops(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "validate(address,uint256,uint256[],string,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "core"
      | "createDrop"
      | "drops"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
      | "validate"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "core", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "createDrop",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(functionFragment: "drops", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "validate",
    values: [string, BigNumberish, BigNumberish[], string, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "core", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "createDrop", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "drops", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "validate", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface SequenceValidator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SequenceValidatorInterface;

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
    core(overrides?: CallOverrides): Promise<[string]>;

    createDrop(
      _collectibleId: BigNumberish,
      _quantityAvailable: BigNumberish,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      _endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    drops(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        collectibleId: BigNumber;
        quantityAvailable: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
        endBlock: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    validate(
      _recipient: string,
      _dropID: BigNumberish,
      quantity: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  core(overrides?: CallOverrides): Promise<string>;

  createDrop(
    _collectibleId: BigNumberish,
    _quantityAvailable: BigNumberish,
    _startTime: BigNumberish,
    _endTime: BigNumberish,
    _endBlock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  drops(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      collectibleId: BigNumber;
      quantityAvailable: BigNumber;
      startTime: BigNumber;
      endTime: BigNumber;
      endBlock: BigNumber;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  validate(
    _recipient: string,
    _dropID: BigNumberish,
    quantity: BigNumberish[],
    arg3: string,
    arg4: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    core(overrides?: CallOverrides): Promise<string>;

    createDrop(
      _collectibleId: BigNumberish,
      _quantityAvailable: BigNumberish,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      _endBlock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    drops(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        collectibleId: BigNumber;
        quantityAvailable: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
        endBlock: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    validate(
      _recipient: string,
      _dropID: BigNumberish,
      quantity: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    core(overrides?: CallOverrides): Promise<BigNumber>;

    createDrop(
      _collectibleId: BigNumberish,
      _quantityAvailable: BigNumberish,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      _endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    drops(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    validate(
      _recipient: string,
      _dropID: BigNumberish,
      quantity: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    core(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createDrop(
      _collectibleId: BigNumberish,
      _quantityAvailable: BigNumberish,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      _endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    drops(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    validate(
      _recipient: string,
      _dropID: BigNumberish,
      quantity: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
