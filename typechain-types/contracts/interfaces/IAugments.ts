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

export interface IAugmentsInterface extends utils.Interface {
  functions: {
    "formToSlotCount(uint8)": FunctionFragment;
    "getAugmentIDByOption(string,uint8,uint8,uint8)": FunctionFragment;
    "getAugmentIDBySeries(uint32,uint8,uint8,uint8)": FunctionFragment;
    "optionStringToSeries(string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "formToSlotCount"
      | "getAugmentIDByOption"
      | "getAugmentIDBySeries"
      | "optionStringToSeries"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "formToSlotCount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAugmentIDByOption",
    values: [string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAugmentIDBySeries",
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
    functionFragment: "getAugmentIDByOption",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAugmentIDBySeries",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "optionStringToSeries",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IAugments extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAugmentsInterface;

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

    getAugmentIDByOption(
      option: string,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAugmentIDBySeries(
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

  getAugmentIDByOption(
    option: string,
    form: BigNumberish,
    rarity: BigNumberish,
    slot: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAugmentIDBySeries(
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

    getAugmentIDByOption(
      option: string,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAugmentIDBySeries(
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

    getAugmentIDByOption(
      option: string,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAugmentIDBySeries(
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

    getAugmentIDByOption(
      option: string,
      form: BigNumberish,
      rarity: BigNumberish,
      slot: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAugmentIDBySeries(
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
