/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SequenceValidator,
  SequenceValidatorInterface,
} from "../../../contracts/validators/SequenceValidator";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IFabricator",
        name: "_core",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_collectibleId",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "_quantityAvailable",
        type: "uint16",
      },
      {
        internalType: "uint64",
        name: "_startTime",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "_endTime",
        type: "uint64",
      },
      {
        internalType: "uint16",
        name: "_endBlock",
        type: "uint16",
      },
    ],
    name: "createDrop",
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
    name: "drops",
    outputs: [
      {
        internalType: "uint256",
        name: "collectibleId",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "quantityAvailable",
        type: "uint128",
      },
      {
        internalType: "uint64",
        name: "startTime",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "endTime",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "endBlock",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "_dropID",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "quantity",
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
  "0x60806040523480156200001157600080fd5b50604051620019fb380380620019fb8339818101604052810190620000379190620001e9565b620000576200004b6200009f60201b60201c565b620000a760201b60201c565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200021b565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200019d8262000170565b9050919050565b6000620001b18262000190565b9050919050565b620001c381620001a4565b8114620001cf57600080fd5b50565b600081519050620001e381620001b8565b92915050565b6000602082840312156200020257620002016200016b565b5b60006200021284828501620001d2565b91505092915050565b6117d0806200022b6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100dc578063cc794848146100fa578063f2f4eb2614610116578063f2fde38b146101345761007d565b80635eb399681461008257806362749f05146100b6578063715018a6146100d2575b600080fd5b61009c60048036038101906100979190610be4565b610150565b6040516100ad959493929190610c6e565b60405180910390f35b6100d060048036038101906100cb9190610f1b565b6101de565b005b6100da6106d8565b005b6100e4610760565b6040516100f19190611002565b60405180910390f35b610114600480360381019061010f9190611083565b610789565b005b61011e6109b0565b60405161012b919061115d565b60405180910390f35b61014e60048036038101906101499190611178565b6109d6565b005b60016020528060005260406000206000915090508060000154908060010160009054906101000a90046fffffffffffffffffffffffffffffffff16908060010160109054906101000a900467ffffffffffffffff16908060010160189054906101000a900467ffffffffffffffff16908060020160009054906101000a900467ffffffffffffffff16905085565b6000600160008881526020019081526020016000206040518060a0016040529081600082015481526020016001820160009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff1681526020016001820160109054906101000a900467ffffffffffffffff1667ffffffffffffffff1667ffffffffffffffff1681526020016001820160189054906101000a900467ffffffffffffffff1667ffffffffffffffff1667ffffffffffffffff1681526020016002820160009054906101000a900467ffffffffffffffff1667ffffffffffffffff1667ffffffffffffffff168152505090506000600167ffffffffffffffff81111561030757610306610df0565b5b6040519080825280602002602001820160405280156103355781602001602082028036833780820191505090505b5090506000600167ffffffffffffffff81111561035557610354610df0565b5b6040519080825280602002602001820160405280156103835781602001602082028036833780820191505090505b509050826040015167ffffffffffffffff1642116103d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103cd90611202565b60405180910390fd5b826060015167ffffffffffffffff16421115610427576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041e9061126e565b60405180910390fd5b826080015167ffffffffffffffff16431115610478576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046f906112da565b60405180910390fd5b82602001516fffffffffffffffffffffffffffffffff16888860008181106104a3576104a26112fa565b5b90506020020135600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fee7835c86600001516040518263ffffffff1660e01b81526004016105099190611329565b6020604051808303816000875af1158015610528573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054c9190611359565b61055691906113b5565b1115610597576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058e90611457565b60405180910390fd5b6001888860008181106105ad576105ac6112fa565b5b90506020020135146105f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105eb906114c3565b60405180910390fd5b82600001518260008151811061060d5761060c6112fa565b5b60200260200101818152505060018160008151811061062f5761062e6112fa565b5b602002602001018181525050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663934eddf88b84846040518463ffffffff1660e01b815260040161069a939291906115d8565b600060405180830381600087803b1580156106b457600080fd5b505af11580156106c8573d6000803e3d6000fd5b5050505050505050505050505050565b6106e0610ace565b73ffffffffffffffffffffffffffffffffffffffff166106fe610760565b73ffffffffffffffffffffffffffffffffffffffff1614610754576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074b9061167c565b60405180910390fd5b61075e6000610ad6565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610791610ace565b73ffffffffffffffffffffffffffffffffffffffff166107af610760565b73ffffffffffffffffffffffffffffffffffffffff1614610805576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107fc9061167c565b60405180910390fd5b600060016000878152602001908152602001600020600001541461085e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610855906116e8565b60405180910390fd5b6040518060a001604052808681526020018561ffff166fffffffffffffffffffffffffffffffff1681526020018467ffffffffffffffff1681526020018367ffffffffffffffff1681526020018261ffff1667ffffffffffffffff16815250600160008781526020019081526020016000206000820151816000015560208201518160010160006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff16021790555060408201518160010160106101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555060608201518160010160186101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555060808201518160020160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055509050505050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6109de610ace565b73ffffffffffffffffffffffffffffffffffffffff166109fc610760565b73ffffffffffffffffffffffffffffffffffffffff1614610a52576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a499061167c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610ac2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ab99061177a565b60405180910390fd5b610acb81610ad6565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610bc181610bae565b8114610bcc57600080fd5b50565b600081359050610bde81610bb8565b92915050565b600060208284031215610bfa57610bf9610ba4565b5b6000610c0884828501610bcf565b91505092915050565b610c1a81610bae565b82525050565b60006fffffffffffffffffffffffffffffffff82169050919050565b610c4581610c20565b82525050565b600067ffffffffffffffff82169050919050565b610c6881610c4b565b82525050565b600060a082019050610c836000830188610c11565b610c906020830187610c3c565b610c9d6040830186610c5f565b610caa6060830185610c5f565b610cb76080830184610c5f565b9695505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610cec82610cc1565b9050919050565b610cfc81610ce1565b8114610d0757600080fd5b50565b600081359050610d1981610cf3565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112610d4457610d43610d1f565b5b8235905067ffffffffffffffff811115610d6157610d60610d24565b5b602083019150836020820283011115610d7d57610d7c610d29565b5b9250929050565b60008083601f840112610d9a57610d99610d1f565b5b8235905067ffffffffffffffff811115610db757610db6610d24565b5b602083019150836001820283011115610dd357610dd2610d29565b5b9250929050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610e2882610ddf565b810181811067ffffffffffffffff82111715610e4757610e46610df0565b5b80604052505050565b6000610e5a610b9a565b9050610e668282610e1f565b919050565b600067ffffffffffffffff821115610e8657610e85610df0565b5b610e8f82610ddf565b9050602081019050919050565b82818337600083830152505050565b6000610ebe610eb984610e6b565b610e50565b905082815260208101848484011115610eda57610ed9610dda565b5b610ee5848285610e9c565b509392505050565b600082601f830112610f0257610f01610d1f565b5b8135610f12848260208601610eab565b91505092915050565b600080600080600080600060a0888a031215610f3a57610f39610ba4565b5b6000610f488a828b01610d0a565b9750506020610f598a828b01610bcf565b965050604088013567ffffffffffffffff811115610f7a57610f79610ba9565b5b610f868a828b01610d2e565b9550955050606088013567ffffffffffffffff811115610fa957610fa8610ba9565b5b610fb58a828b01610d84565b9350935050608088013567ffffffffffffffff811115610fd857610fd7610ba9565b5b610fe48a828b01610eed565b91505092959891949750929550565b610ffc81610ce1565b82525050565b60006020820190506110176000830184610ff3565b92915050565b600061ffff82169050919050565b6110348161101d565b811461103f57600080fd5b50565b6000813590506110518161102b565b92915050565b61106081610c4b565b811461106b57600080fd5b50565b60008135905061107d81611057565b92915050565b600080600080600060a0868803121561109f5761109e610ba4565b5b60006110ad88828901610bcf565b95505060206110be88828901611042565b94505060406110cf8882890161106e565b93505060606110e08882890161106e565b92505060806110f188828901611042565b9150509295509295909350565b6000819050919050565b600061112361111e61111984610cc1565b6110fe565b610cc1565b9050919050565b600061113582611108565b9050919050565b60006111478261112a565b9050919050565b6111578161113c565b82525050565b6000602082019050611172600083018461114e565b92915050565b60006020828403121561118e5761118d610ba4565b5b600061119c84828501610d0a565b91505092915050565b600082825260208201905092915050565b7f5345515f44524f505f54494d455f4541524c5900000000000000000000000000600082015250565b60006111ec6013836111a5565b91506111f7826111b6565b602082019050919050565b6000602082019050818103600083015261121b816111df565b9050919050565b7f5345515f44524f505f54494d455f455850495245440000000000000000000000600082015250565b60006112586015836111a5565b915061126382611222565b602082019050919050565b600060208201905081810360008301526112878161124b565b9050919050565b7f5345515f44524f505f424c4f434b5f5041535345440000000000000000000000600082015250565b60006112c46015836111a5565b91506112cf8261128e565b602082019050919050565b600060208201905081810360008301526112f3816112b7565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208201905061133e6000830184610c11565b92915050565b60008151905061135381610bb8565b92915050565b60006020828403121561136f5761136e610ba4565b5b600061137d84828501611344565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006113c082610bae565b91506113cb83610bae565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611400576113ff611386565b5b828201905092915050565b7f5345515f44524f505f4d41585f5155414e544954590000000000000000000000600082015250565b60006114416015836111a5565b915061144c8261140b565b602082019050919050565b6000602082019050818103600083015261147081611434565b9050919050565b7f5345515f44524f505f4c494d49545f4f4e450000000000000000000000000000600082015250565b60006114ad6012836111a5565b91506114b882611477565b602082019050919050565b600060208201905081810360008301526114dc816114a0565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61151881610bae565b82525050565b600061152a838361150f565b60208301905092915050565b6000602082019050919050565b600061154e826114e3565b61155881856114ee565b9350611563836114ff565b8060005b8381101561159457815161157b888261151e565b975061158683611536565b925050600181019050611567565b5085935050505092915050565b600082825260208201905092915050565b50565b60006115c26000836115a1565b91506115cd826115b2565b600082019050919050565b60006080820190506115ed6000830186610ff3565b81810360208301526115ff8185611543565b905081810360408301526116138184611543565b90508181036060830152611626816115b5565b9050949350505050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006116666020836111a5565b915061167182611630565b602082019050919050565b6000602082019050818103600083015261169581611659565b9050919050565b7f5345515f44524f505f4455504c49434154455f44524f50000000000000000000600082015250565b60006116d26017836111a5565b91506116dd8261169c565b602082019050919050565b60006020820190508181036000830152611701816116c5565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006117646026836111a5565b915061176f82611708565b604082019050919050565b6000602082019050818103600083015261179381611757565b905091905056fea2646970667358221220e5d27be1f01bbd3d727834b5489ac04c30f7dad4f0c3e26404a17e32f165e8c764736f6c634300080a0033";

type SequenceValidatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SequenceValidatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SequenceValidator__factory extends ContractFactory {
  constructor(...args: SequenceValidatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _core: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SequenceValidator> {
    return super.deploy(_core, overrides || {}) as Promise<SequenceValidator>;
  }
  override getDeployTransaction(
    _core: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_core, overrides || {});
  }
  override attach(address: string): SequenceValidator {
    return super.attach(address) as SequenceValidator;
  }
  override connect(signer: Signer): SequenceValidator__factory {
    return super.connect(signer) as SequenceValidator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SequenceValidatorInterface {
    return new utils.Interface(_abi) as SequenceValidatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SequenceValidator {
    return new Contract(address, _abi, signerOrProvider) as SequenceValidator;
  }
}
