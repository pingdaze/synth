/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SignatureValidator,
  SignatureValidatorInterface,
} from "../../../contracts/validators/SignatureValidator";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "contract IFabricator",
        name: "_core",
        type: "address",
      },
      {
        internalType: "contract Authority",
        name: "authority",
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
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract Authority",
        name: "newAuthority",
        type: "address",
      },
    ],
    name: "AuthorityUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newSigner",
        type: "address",
      },
    ],
    name: "SignerSet",
    type: "event",
  },
  {
    inputs: [],
    name: "authority",
    outputs: [
      {
        internalType: "contract Authority",
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
        components: [
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "wallet",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct SignatureValidator.Target",
        name: "recipient",
        type: "tuple",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "contract Authority",
        name: "newAuthority",
        type: "address",
      },
    ],
    name: "setAuthority",
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
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    name: "setSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "validationSigner",
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
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b5060405162001e9938038062001e9983398181016040528101906200003791906200043b565b3381816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7660405160405180910390a38073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa3396fd7f6e0a21b50e5089d2da70d5ac0a3bbbd1f617a93f134b7638998019860405160405180910390a3505082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620002b260405180608001604052806040518060400160405280600f81526020017f53594e54482056616c696461746f72000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f3100000000000000000000000000000000000000000000000000000000000000815250815260200162000287620002c260201b60201c565b81526020013073ffffffffffffffffffffffffffffffffffffffff16815250620002cf60201b60201c565b608081815250505050506200053b565b6000804690508091505090565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f826000015180519060200120836020015180519060200120846040015185606001516040516020016200032a959493929190620004de565b604051602081830303815290604052805190602001209050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000379826200034c565b9050919050565b6200038b816200036c565b81146200039757600080fd5b50565b600081519050620003ab8162000380565b92915050565b6000620003be826200036c565b9050919050565b620003d081620003b1565b8114620003dc57600080fd5b50565b600081519050620003f081620003c5565b92915050565b600062000403826200036c565b9050919050565b6200041581620003f6565b81146200042157600080fd5b50565b60008151905062000435816200040a565b92915050565b60008060006060848603121562000457576200045662000347565b5b600062000467868287016200039a565b93505060206200047a86828701620003df565b92505060406200048d8682870162000424565b9150509250925092565b6000819050919050565b620004ac8162000497565b82525050565b6000819050919050565b620004c781620004b2565b82525050565b620004d8816200036c565b82525050565b600060a082019050620004f56000830188620004a1565b620005046020830187620004a1565b620005136040830186620004a1565b620005226060830185620004bc565b620005316080830184620004cd565b9695505050505050565b6080516119426200055760003960006109a201526119426000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b146100ff578063bf7e214f1461011d578063e1fc86911461013b578063f2f4eb261461015757610088565b8063111428f31461008d57806313af4035146100ab5780636c19e783146100c75780637a9e5e4b146100e3575b600080fd5b610095610175565b6040516100a29190610dbb565b60405180910390f35b6100c560048036038101906100c09190610e11565b61019b565b005b6100e160048036038101906100dc9190610e11565b6102a5565b005b6100fd60048036038101906100f89190610e7c565b61038d565b005b61010761054e565b6040516101149190610dbb565b60405180910390f35b610125610572565b6040516101329190610f08565b60405180910390f35b61015560048036038101906101509190610fb6565b610598565b005b61015f61083a565b60405161016c919061103e565b60405180910390f35b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6101c9336000357fffffffff0000000000000000000000000000000000000000000000000000000016610860565b610208576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ff906110b6565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7660405160405180910390a350565b6102d3336000357fffffffff0000000000000000000000000000000000000000000000000000000016610860565b610312576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610309906110b6565b60405180910390fd5b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f9eaa897564d022fb8c5efaf0acdb5d9d27b440b2aad44400b6e1c702e65b9ed3816040516103829190610dbb565b60405180910390a150565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806104a75750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166040518463ffffffff1660e01b815260040161046593929190611111565b602060405180830381865afa158015610482573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a69190611180565b5b6104b057600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa3396fd7f6e0a21b50e5089d2da70d5ac0a3bbbd1f617a93f134b7638998019860405160405180910390a350565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006105c98484846105b9898036038101906105b491906112ec565b61099e565b6109f8909392919063ffffffff16565b9050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461065b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065290611365565b60405180910390fd5b610663610a23565b8560000135146106a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069f906113d1565b60405180910390fd5b6000600167ffffffffffffffff8111156106c5576106c46111c3565b5b6040519080825280602002602001820160405280156106f35781602001602082028036833780820191505090505b5090506000600167ffffffffffffffff811115610713576107126111c3565b5b6040519080825280602002602001820160405280156107415781602001602082028036833780820191505090505b50905086602001358260008151811061075d5761075c6113f1565b5b602002602001018181525050866060013581600081518110610782576107816113f1565b5b602002602001018181525050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663934eddf88860400160208101906107df9190610e11565b84846040518463ffffffff1660e01b81526004016107ff93929190611515565b600060405180830381600087803b15801561081957600080fd5b505af115801561082d573d6000803e3d6000fd5b5050505050505050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415801561093f57508073ffffffffffffffffffffffffffffffffffffffff1663b70096138530866040518463ffffffff1660e01b81526004016108fd93929190611111565b602060405180830381865afa15801561091a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093e9190611180565b5b80610995575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b60007f00000000000000000000000000000000000000000000000000000000000000006109ca83610a30565b6040516020016109db9291906115e5565b604051602081830303815290604052805190602001209050919050565b6000806000610a0987878787610a98565b91509150610a1681610ba5565b8192505050949350505050565b6000804690508091505090565b60007f184611e0d69ea59207eba302f2540a135f7d4c2520ae8d7a73b113dc315208b18260000151836020015184604001518560600151604051602001610a7b95949392919061163a565b604051602081830303815290604052805190602001209050919050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c1115610ad3576000600391509150610b9c565b601b8560ff1614158015610aeb5750601c8560ff1614155b15610afd576000600491509150610b9c565b600060018787878760405160008152602001604052604051610b22949392919061169c565b6020604051602081039080840390855afa158015610b44573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610b9357600060019250925050610b9c565b80600092509250505b94509492505050565b60006004811115610bb957610bb86116e1565b5b816004811115610bcc57610bcb6116e1565b5b1415610bd757610d77565b60016004811115610beb57610bea6116e1565b5b816004811115610bfe57610bfd6116e1565b5b1415610c3f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c369061175c565b60405180910390fd5b60026004811115610c5357610c526116e1565b5b816004811115610c6657610c656116e1565b5b1415610ca7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c9e906117c8565b60405180910390fd5b60036004811115610cbb57610cba6116e1565b5b816004811115610cce57610ccd6116e1565b5b1415610d0f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d069061185a565b60405180910390fd5b600480811115610d2257610d216116e1565b5b816004811115610d3557610d346116e1565b5b1415610d76576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d6d906118ec565b60405180910390fd5b5b50565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610da582610d7a565b9050919050565b610db581610d9a565b82525050565b6000602082019050610dd06000830184610dac565b92915050565b6000604051905090565b600080fd5b610dee81610d9a565b8114610df957600080fd5b50565b600081359050610e0b81610de5565b92915050565b600060208284031215610e2757610e26610de0565b5b6000610e3584828501610dfc565b91505092915050565b6000610e4982610d9a565b9050919050565b610e5981610e3e565b8114610e6457600080fd5b50565b600081359050610e7681610e50565b92915050565b600060208284031215610e9257610e91610de0565b5b6000610ea084828501610e67565b91505092915050565b6000819050919050565b6000610ece610ec9610ec484610d7a565b610ea9565b610d7a565b9050919050565b6000610ee082610eb3565b9050919050565b6000610ef282610ed5565b9050919050565b610f0281610ee7565b82525050565b6000602082019050610f1d6000830184610ef9565b92915050565b600080fd5b600060808284031215610f3e57610f3d610f23565b5b81905092915050565b600060ff82169050919050565b610f5d81610f47565b8114610f6857600080fd5b50565b600081359050610f7a81610f54565b92915050565b6000819050919050565b610f9381610f80565b8114610f9e57600080fd5b50565b600081359050610fb081610f8a565b92915050565b60008060008060e08587031215610fd057610fcf610de0565b5b6000610fde87828801610f28565b9450506080610fef87828801610f6b565b93505060a061100087828801610fa1565b92505060c061101187828801610fa1565b91505092959194509250565b600061102882610ed5565b9050919050565b6110388161101d565b82525050565b6000602082019050611053600083018461102f565b92915050565b600082825260208201905092915050565b7f554e415554484f52495a45440000000000000000000000000000000000000000600082015250565b60006110a0600c83611059565b91506110ab8261106a565b602082019050919050565b600060208201905081810360008301526110cf81611093565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61110b816110d6565b82525050565b60006060820190506111266000830186610dac565b6111336020830185610dac565b6111406040830184611102565b949350505050565b60008115159050919050565b61115d81611148565b811461116857600080fd5b50565b60008151905061117a81611154565b92915050565b60006020828403121561119657611195610de0565b5b60006111a48482850161116b565b91505092915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6111fb826111b2565b810181811067ffffffffffffffff8211171561121a576112196111c3565b5b80604052505050565b600061122d610dd6565b905061123982826111f2565b919050565b6000819050919050565b6112518161123e565b811461125c57600080fd5b50565b60008135905061126e81611248565b92915050565b60006080828403121561128a576112896111ad565b5b6112946080611223565b905060006112a48482850161125f565b60008301525060206112b88482850161125f565b60208301525060406112cc84828501610dfc565b60408301525060606112e08482850161125f565b60608301525092915050565b60006080828403121561130257611301610de0565b5b600061131084828501611274565b91505092915050565b7f496e76616c6964205369676e6174757265000000000000000000000000000000600082015250565b600061134f601183611059565b915061135a82611319565b602082019050919050565b6000602082019050818103600083015261137e81611342565b9050919050565b7f496e76616c696420636861696e49640000000000000000000000000000000000600082015250565b60006113bb600f83611059565b91506113c682611385565b602082019050919050565b600060208201905081810360008301526113ea816113ae565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6114558161123e565b82525050565b6000611467838361144c565b60208301905092915050565b6000602082019050919050565b600061148b82611420565b611495818561142b565b93506114a08361143c565b8060005b838110156114d15781516114b8888261145b565b97506114c383611473565b9250506001810190506114a4565b5085935050505092915050565b600082825260208201905092915050565b50565b60006114ff6000836114de565b915061150a826114ef565b600082019050919050565b600060808201905061152a6000830186610dac565b818103602083015261153c8185611480565b905081810360408301526115508184611480565b90508181036060830152611563816114f2565b9050949350505050565b600081905092915050565b7f1901000000000000000000000000000000000000000000000000000000000000600082015250565b60006115ae60028361156d565b91506115b982611578565b600282019050919050565b6000819050919050565b6115df6115da82610f80565b6115c4565b82525050565b60006115f0826115a1565b91506115fc82856115ce565b60208201915061160c82846115ce565b6020820191508190509392505050565b61162581610f80565b82525050565b6116348161123e565b82525050565b600060a08201905061164f600083018861161c565b61165c602083018761162b565b611669604083018661162b565b6116766060830185610dac565b611683608083018461162b565b9695505050505050565b61169681610f47565b82525050565b60006080820190506116b1600083018761161c565b6116be602083018661168d565b6116cb604083018561161c565b6116d8606083018461161c565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f45434453413a20696e76616c6964207369676e61747572650000000000000000600082015250565b6000611746601883611059565b915061175182611710565b602082019050919050565b6000602082019050818103600083015261177581611739565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265206c656e67746800600082015250565b60006117b2601f83611059565b91506117bd8261177c565b602082019050919050565b600060208201905081810360008301526117e1816117a5565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b6000611844602283611059565b915061184f826117e8565b604082019050919050565b6000602082019050818103600083015261187381611837565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202776272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b60006118d6602283611059565b91506118e18261187a565b604082019050919050565b60006020820190508181036000830152611905816118c9565b905091905056fea2646970667358221220d3597da4d41d4d2f0402093d87ae108cab696c9bdaa7058288ab047e5d19981f64736f6c634300080a0033";

type SignatureValidatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SignatureValidatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SignatureValidator__factory extends ContractFactory {
  constructor(...args: SignatureValidatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    signer: string,
    _core: string,
    authority: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SignatureValidator> {
    return super.deploy(
      signer,
      _core,
      authority,
      overrides || {}
    ) as Promise<SignatureValidator>;
  }
  override getDeployTransaction(
    signer: string,
    _core: string,
    authority: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      signer,
      _core,
      authority,
      overrides || {}
    );
  }
  override attach(address: string): SignatureValidator {
    return super.attach(address) as SignatureValidator;
  }
  override connect(signer: Signer): SignatureValidator__factory {
    return super.connect(signer) as SignatureValidator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SignatureValidatorInterface {
    return new utils.Interface(_abi) as SignatureValidatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SignatureValidator {
    return new Contract(address, _abi, signerOrProvider) as SignatureValidator;
  }
}
