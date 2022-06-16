/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CheckerValidator,
  CheckerValidatorInterface,
} from "../../../contracts/legacy/CheckerValidator";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IFabricator",
        name: "_core",
        type: "address",
      },
      {
        internalType: "contract IERC1155",
        name: "_original",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newId_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "checkAllRedemption",
    outputs: [
      {
        internalType: "bool[]",
        name: "",
        type: "bool[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "core",
    outputs: [
      {
        internalType: "contract IFabricator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "originalToken",
    outputs: [
      {
        internalType: "contract IERC1155",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "redeemAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "redeemed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "remaining",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "validate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b50604051620013b2380380620013b28339818101604052810190620000379190620001c7565b806080818152505082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505062000223565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620000fb82620000ce565b9050919050565b60006200010f82620000ee565b9050919050565b620001218162000102565b81146200012d57600080fd5b50565b600081519050620001418162000116565b92915050565b60006200015482620000ee565b9050919050565b620001668162000147565b81146200017257600080fd5b50565b60008151905062000186816200015b565b92915050565b6000819050919050565b620001a1816200018c565b8114620001ad57600080fd5b50565b600081519050620001c18162000196565b92915050565b600080600060608486031215620001e357620001e2620000c9565b5b6000620001f38682870162000130565b9350506020620002068682870162000175565b92505060406200021986828701620001b0565b9150509250925092565b6080516111736200023f60003960006105ad01526111736000f3fe608060405234801561001057600080fd5b506004361061007c5760003560e01c806362749f051161005b57806362749f05146100eb5780637ed0f1c114610107578063b399b0bc14610137578063f2f4eb26146101675761007c565b806216bf81146100815780630e7c1cb51461009d5780635053b1bf146100bb575b600080fd5b61009b600480360381019061009691906107ca565b610185565b005b6100a56101e5565b6040516100b29190610896565b60405180910390f35b6100d560048036038101906100d091906107ca565b610209565b6040516100e2919061097b565b60405180910390f35b61010560048036038101906101009190610ba8565b6102cc565b005b610121600480360381019061011c9190610c80565b6102de565b60405161012e9190610cbc565b60405180910390f35b610151600480360381019061014c9190610cd7565b6102fe565b60405161015e9190610d13565b60405180910390f35b61016f610316565b60405161017c9190610d4f565b60405180910390f35b60005b828290508110156101d0576101bd8383838181106101a9576101a8610d6a565b5b905060200201356101b861033c565b610344565b80806101c890610dc8565b915050610188565b506101e16101dc61033c565b61050f565b5050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606060008383905067ffffffffffffffff81111561022a57610229610a7d565b5b6040519080825280602002602001820160405280156102585781602001602082028036833780820191505090505b50905060005b81518110156102c15761028985858381811061027d5761027c610d6a565b5b90506020020135610727565b82828151811061029c5761029b610d6a565b5b60200260200101901515908115158152505080806102b990610dc8565b91505061025e565b508091505092915050565b6102d58761050f565b50505050505050565b60016020528060005260406000206000915054906101000a900460ff1681565b60026020528060005260406000206000915090505481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1662fdd58e83856040518363ffffffff1660e01b81526004016103a1929190610e20565b602060405180830381865afa1580156103be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103e29190610e5e565b11610422576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041990610f0e565b60405180910390fd5b600015156001600084815260200190815260200160002060009054906101000a900460ff16151514610489576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161048090610f7a565b60405180910390fd5b600180600084815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105049190610f9a565b925050819055505050565b6000600167ffffffffffffffff81111561052c5761052b610a7d565b5b60405190808252806020026020018201604052801561055a5781602001602082028036833780820191505090505b5090506000600167ffffffffffffffff81111561057a57610579610a7d565b5b6040519080825280602002602001820160405280156105a85781602001602082028036833780820191505090505b5090507f0000000000000000000000000000000000000000000000000000000000000000826000815181106105e0576105df610d6a565b5b602002602001018181525050600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054816000815181106106405761063f610d6a565b5b6020026020010181815250506000600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663934eddf88484846040518463ffffffff1660e01b81526004016106f0939291906110e5565b600060405180830381600087803b15801561070a57600080fd5b505af115801561071e573d6000803e3d6000fd5b50505050505050565b60006001600083815260200190815260200160002060009054906101000a900460ff169050919050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f84011261078a57610789610765565b5b8235905067ffffffffffffffff8111156107a7576107a661076a565b5b6020830191508360208202830111156107c3576107c261076f565b5b9250929050565b600080602083850312156107e1576107e061075b565b5b600083013567ffffffffffffffff8111156107ff576107fe610760565b5b61080b85828601610774565b92509250509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061085c61085761085284610817565b610837565b610817565b9050919050565b600061086e82610841565b9050919050565b600061088082610863565b9050919050565b61089081610875565b82525050565b60006020820190506108ab6000830184610887565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b6108f2816108dd565b82525050565b600061090483836108e9565b60208301905092915050565b6000602082019050919050565b6000610928826108b1565b61093281856108bc565b935061093d836108cd565b8060005b8381101561096e57815161095588826108f8565b975061096083610910565b925050600181019050610941565b5085935050505092915050565b60006020820190508181036000830152610995818461091d565b905092915050565b60006109a882610817565b9050919050565b6109b88161099d565b81146109c357600080fd5b50565b6000813590506109d5816109af565b92915050565b6000819050919050565b6109ee816109db565b81146109f957600080fd5b50565b600081359050610a0b816109e5565b92915050565b60008083601f840112610a2757610a26610765565b5b8235905067ffffffffffffffff811115610a4457610a4361076a565b5b602083019150836001820283011115610a6057610a5f61076f565b5b9250929050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610ab582610a6c565b810181811067ffffffffffffffff82111715610ad457610ad3610a7d565b5b80604052505050565b6000610ae7610751565b9050610af38282610aac565b919050565b600067ffffffffffffffff821115610b1357610b12610a7d565b5b610b1c82610a6c565b9050602081019050919050565b82818337600083830152505050565b6000610b4b610b4684610af8565b610add565b905082815260208101848484011115610b6757610b66610a67565b5b610b72848285610b29565b509392505050565b600082601f830112610b8f57610b8e610765565b5b8135610b9f848260208601610b38565b91505092915050565b600080600080600080600060a0888a031215610bc757610bc661075b565b5b6000610bd58a828b016109c6565b9750506020610be68a828b016109fc565b965050604088013567ffffffffffffffff811115610c0757610c06610760565b5b610c138a828b01610774565b9550955050606088013567ffffffffffffffff811115610c3657610c35610760565b5b610c428a828b01610a11565b9350935050608088013567ffffffffffffffff811115610c6557610c64610760565b5b610c718a828b01610b7a565b91505092959891949750929550565b600060208284031215610c9657610c9561075b565b5b6000610ca4848285016109fc565b91505092915050565b610cb6816108dd565b82525050565b6000602082019050610cd16000830184610cad565b92915050565b600060208284031215610ced57610cec61075b565b5b6000610cfb848285016109c6565b91505092915050565b610d0d816109db565b82525050565b6000602082019050610d286000830184610d04565b92915050565b6000610d3982610863565b9050919050565b610d4981610d2e565b82525050565b6000602082019050610d646000830184610d40565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610dd3826109db565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610e0657610e05610d99565b5b600182019050919050565b610e1a8161099d565b82525050565b6000604082019050610e356000830185610e11565b610e426020830184610d04565b9392505050565b600081519050610e58816109e5565b92915050565b600060208284031215610e7457610e7361075b565b5b6000610e8284828501610e49565b91505092915050565b600082825260208201905092915050565b7f53656e646572206d75737420686f6c6420616c6c20746f6b656e7320666f722060008201527f6d6967726174696f6e0000000000000000000000000000000000000000000000602082015250565b6000610ef8602983610e8b565b9150610f0382610e9c565b604082019050919050565b60006020820190508181036000830152610f2781610eeb565b9050919050565b7f546f6b656e2068617320616c7265616479206265656e2072656465656d656400600082015250565b6000610f64601f83610e8b565b9150610f6f82610f2e565b602082019050919050565b60006020820190508181036000830152610f9381610f57565b9050919050565b6000610fa5826109db565b9150610fb0836109db565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610fe557610fe4610d99565b5b828201905092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611025816109db565b82525050565b6000611037838361101c565b60208301905092915050565b6000602082019050919050565b600061105b82610ff0565b6110658185610ffb565b93506110708361100c565b8060005b838110156110a1578151611088888261102b565b975061109383611043565b925050600181019050611074565b5085935050505092915050565b600082825260208201905092915050565b50565b60006110cf6000836110ae565b91506110da826110bf565b600082019050919050565b60006080820190506110fa6000830186610e11565b818103602083015261110c8185611050565b905081810360408301526111208184611050565b90508181036060830152611133816110c2565b905094935050505056fea26469706673582212207897557fac36d51b2f366598aa0e12f888258a306d83f8adde2fb9dd363ada6164736f6c634300080a0033";

type CheckerValidatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CheckerValidatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CheckerValidator__factory extends ContractFactory {
  constructor(...args: CheckerValidatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _core: string,
    _original: string,
    newId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CheckerValidator> {
    return super.deploy(
      _core,
      _original,
      newId_,
      overrides || {}
    ) as Promise<CheckerValidator>;
  }
  override getDeployTransaction(
    _core: string,
    _original: string,
    newId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _core,
      _original,
      newId_,
      overrides || {}
    );
  }
  override attach(address: string): CheckerValidator {
    return super.attach(address) as CheckerValidator;
  }
  override connect(signer: Signer): CheckerValidator__factory {
    return super.connect(signer) as CheckerValidator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CheckerValidatorInterface {
    return new utils.Interface(_abi) as CheckerValidatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CheckerValidator {
    return new Contract(address, _abi, signerOrProvider) as CheckerValidator;
  }
}