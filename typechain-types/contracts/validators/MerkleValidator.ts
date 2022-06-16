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

export interface MerkleValidatorInterface extends utils.Interface {
  functions: {
    "claimed(uint256)": FunctionFragment;
    "drops(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "seedAllocations(uint256,bytes32,uint16,uint64)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "validate(address,uint256,uint256[],string,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "claimed"
      | "drops"
      | "owner"
      | "renounceOwnership"
      | "seedAllocations"
      | "transferOwnership"
      | "validate"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "claimed",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "drops", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "seedAllocations",
    values: [BigNumberish, BytesLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "validate",
    values: [string, BigNumberish, BigNumberish[], string, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "claimed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "drops", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "seedAllocations",
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

export interface MerkleValidator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MerkleValidatorInterface;

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
    claimed(arg0: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    drops(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, number, BigNumber] & {
        _merkleRoot: string;
        _blocks: number;
        _endTime: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    seedAllocations(
      _dropKey: BigNumberish,
      _merkleRoot: BytesLike,
      _blocks: BigNumberish,
      _endTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    validate(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[void]>;
  };

  claimed(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  drops(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, number, BigNumber] & {
      _merkleRoot: string;
      _blocks: number;
      _endTime: BigNumber;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  seedAllocations(
    _dropKey: BigNumberish,
    _merkleRoot: BytesLike,
    _blocks: BigNumberish,
    _endTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  validate(
    arg0: string,
    arg1: BigNumberish,
    arg2: BigNumberish[],
    arg3: string,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  callStatic: {
    claimed(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    drops(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, number, BigNumber] & {
        _merkleRoot: string;
        _blocks: number;
        _endTime: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    seedAllocations(
      _dropKey: BigNumberish,
      _merkleRoot: BytesLike,
      _blocks: BigNumberish,
      _endTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    validate(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish[],
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
    claimed(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    drops(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    seedAllocations(
      _dropKey: BigNumberish,
      _merkleRoot: BytesLike,
      _blocks: BigNumberish,
      _endTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    validate(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimed(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    drops(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    seedAllocations(
      _dropKey: BigNumberish,
      _merkleRoot: BytesLike,
      _blocks: BigNumberish,
      _endTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    validate(
      arg0: string,
      arg1: BigNumberish,
      arg2: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}