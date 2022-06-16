/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
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

export interface IWearablesInterface extends utils.Interface {
  functions: {
    "formToSlotCount(uint8)": FunctionFragment;
    "getWearableIDByOption(string,uint8,uint8,uint8)": FunctionFragment;
    "getWearableIDBySeries(uint32,uint8,uint8,uint8)": FunctionFragment;
    "optionStringToSeries(string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "formToSlotCount"
      | "getWearableIDByOption"
      | "getWearableIDBySeries"
      | "optionStringToSeries"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "formToSlotCount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getWearableIDByOption",
    values: [string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getWearableIDBySeries",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "optionStringToSeries",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "formToSlotCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWearableIDByOption",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWearableIDBySeries",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "optionStringToSeries",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IWearables extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IWearablesInterface;

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
    formToSlotCount(
      form: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    getWearableIDByOption(
      option: string,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getWearableIDBySeries(
      series: BigNumberish,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    optionStringToSeries(
      option: string,
      overrides?: CallOverrides
    ): Promise<[number]>;
  };

  formToSlotCount(
    form: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  getWearableIDByOption(
    option: string,
    form: BigNumberish,
    rarity: BigNumberish,
    slot: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getWearableIDBySeries(
    series: BigNumberish,
    form: BigNumberish,
    rarity: BigNumberish,
    slot: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  optionStringToSeries(
    option: string,
    overrides?: CallOverrides
  ): Promise<number>;

  callStatic: {
    formToSlotCount(
      form: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    getWearableIDByOption(
      option: string,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWearableIDBySeries(
      series: BigNumberish,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    optionStringToSeries(
      option: string,
      overrides?: CallOverrides
    ): Promise<number>;
  };

  filters: {};

  estimateGas: {
    formToSlotCount(
      form: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWearableIDByOption(
      option: string,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWearableIDBySeries(
      series: BigNumberish,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    optionStringToSeries(
      option: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    formToSlotCount(
      form: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWearableIDByOption(
      option: string,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWearableIDBySeries(
      series: BigNumberish,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    optionStringToSeries(
      option: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}