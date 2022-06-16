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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface CheckerValidatorInterface extends utils.Interface {
  functions: {
    "checkAllRedemption(uint256[])": FunctionFragment;
    "core()": FunctionFragment;
    "originalToken()": FunctionFragment;
    "redeemAll(uint256[])": FunctionFragment;
    "redeemed(uint256)": FunctionFragment;
    "remaining(address)": FunctionFragment;
    "validate(address,uint256,uint256[],string,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "checkAllRedemption"
      | "core"
      | "originalToken"
      | "redeemAll"
      | "redeemed"
      | "remaining"
      | "validate"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkAllRedemption",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "core", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "originalToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "redeemAll",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "redeemed",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "remaining", values: [string]): string;
  encodeFunctionData(
    functionFragment: "validate",
    values: [string, BigNumberish, BigNumberish[], string, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkAllRedemption",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "core", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "originalToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "redeemAll", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeemed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "remaining", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "validate", data: BytesLike): Result;

  events: {};
}

export interface CheckerValidator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CheckerValidatorInterface;

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
    checkAllRedemption(
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[boolean[]]>;

    core(overrides?: CallOverrides): Promise<[string]>;

    originalToken(overrides?: CallOverrides): Promise<[string]>;

    redeemAll(
      ids: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    redeemed(arg0: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    remaining(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    validate(
      _recipient: string,
      arg1: BigNumberish,
      arg2: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  checkAllRedemption(
    ids: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<boolean[]>;

  core(overrides?: CallOverrides): Promise<string>;

  originalToken(overrides?: CallOverrides): Promise<string>;

  redeemAll(
    ids: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  redeemed(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  remaining(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  validate(
    _recipient: string,
    arg1: BigNumberish,
    arg2: BigNumberish[],
    arg3: string,
    arg4: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    checkAllRedemption(
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<boolean[]>;

    core(overrides?: CallOverrides): Promise<string>;

    originalToken(overrides?: CallOverrides): Promise<string>;

    redeemAll(ids: BigNumberish[], overrides?: CallOverrides): Promise<void>;

    redeemed(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    remaining(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    validate(
      _recipient: string,
      arg1: BigNumberish,
      arg2: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    checkAllRedemption(
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    core(overrides?: CallOverrides): Promise<BigNumber>;

    originalToken(overrides?: CallOverrides): Promise<BigNumber>;

    redeemAll(
      ids: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    redeemed(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    remaining(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    validate(
      _recipient: string,
      arg1: BigNumberish,
      arg2: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    checkAllRedemption(
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    core(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    originalToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemAll(
      ids: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    redeemed(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    remaining(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    validate(
      _recipient: string,
      arg1: BigNumberish,
      arg2: BigNumberish[],
      arg3: string,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
