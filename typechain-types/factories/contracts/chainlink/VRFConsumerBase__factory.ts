/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  VRFConsumerBase,
  VRFConsumerBaseInterface,
} from "../../../contracts/chainlink/VRFConsumerBase";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "randomness",
        type: "uint256",
      },
    ],
    name: "rawFulfillRandomness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class VRFConsumerBase__factory {
  static readonly abi = _abi;
  static createInterface(): VRFConsumerBaseInterface {
    return new utils.Interface(_abi) as VRFConsumerBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VRFConsumerBase {
    return new Contract(address, _abi, signerOrProvider) as VRFConsumerBase;
  }
}
