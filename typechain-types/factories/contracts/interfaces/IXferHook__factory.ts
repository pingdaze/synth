/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IXferHook,
  IXferHookInterface,
} from "../../../contracts/interfaces/IXferHook";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "xferHook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IXferHook__factory {
  static readonly abi = _abi;
  static createInterface(): IXferHookInterface {
    return new utils.Interface(_abi) as IXferHookInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IXferHook {
    return new Contract(address, _abi, signerOrProvider) as IXferHook;
  }
}
