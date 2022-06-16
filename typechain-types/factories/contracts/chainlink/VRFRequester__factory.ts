/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  VRFRequester,
  VRFRequesterInterface,
} from "../../../contracts/chainlink/VRFRequester";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "wordCount",
        type: "uint32",
      },
    ],
    name: "requestRandomness",
    outputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class VRFRequester__factory {
  static readonly abi = _abi;
  static createInterface(): VRFRequesterInterface {
    return new utils.Interface(_abi) as VRFRequesterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VRFRequester {
    return new Contract(address, _abi, signerOrProvider) as VRFRequester;
  }
}