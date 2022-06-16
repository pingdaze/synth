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

export interface ICoreInterface extends utils.Interface {
  functions: {
    "modularMintCallback(address,uint256,bytes)": FunctionFragment;
    "modularMintInit(uint256,address,bytes,address,string)": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "modularMintCallback"
      | "modularMintInit"
      | "ownerOf"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "modularMintCallback",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "modularMintInit",
    values: [BigNumberish, string, BytesLike, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "modularMintCallback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "modularMintInit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;

  events: {};
}

export interface ICore extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ICoreInterface;

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
    modularMintCallback(
      recipient: string,
      _id: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    modularMintInit(
      _dropId: BigNumberish,
      _to: string,
      _data: BytesLike,
      _validator: string,
      _metadata: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ownerOf(id: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
  };

  modularMintCallback(
    recipient: string,
    _id: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  modularMintInit(
    _dropId: BigNumberish,
    _to: string,
    _data: BytesLike,
    _validator: string,
    _metadata: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ownerOf(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    modularMintCallback(
      recipient: string,
      _id: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    modularMintInit(
      _dropId: BigNumberish,
      _to: string,
      _data: BytesLike,
      _validator: string,
      _metadata: string,
      overrides?: CallOverrides
    ): Promise<void>;

    ownerOf(id: BigNumberish, overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    modularMintCallback(
      recipient: string,
      _id: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    modularMintInit(
      _dropId: BigNumberish,
      _to: string,
      _data: BytesLike,
      _validator: string,
      _metadata: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ownerOf(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    modularMintCallback(
      recipient: string,
      _id: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    modularMintInit(
      _dropId: BigNumberish,
      _to: string,
      _data: BytesLike,
      _validator: string,
      _metadata: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ownerOf(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
