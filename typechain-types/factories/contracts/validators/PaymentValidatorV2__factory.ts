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
  PaymentValidatorV2,
  PaymentValidatorV2Interface,
} from "../../../contracts/validators/PaymentValidatorV2";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IMintPipe",
        name: "_core",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cost_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_supply",
        type: "uint256",
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
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "collectAllEth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "collectEth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "core",
    outputs: [
      {
        internalType: "contract IMintPipe",
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
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_qty",
        type: "uint256",
      },
    ],
    name: "directSale",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "newLimit",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "perTxLimit",
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
        internalType: "contract IMintPipe",
        name: "_core",
        type: "address",
      },
    ],
    name: "setCore",
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
    inputs: [],
    name: "totalMinted",
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
    inputs: [],
    name: "totalSupply",
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
        name: "",
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
  "0x60a06040523480156200001157600080fd5b5060405162001cbd38038062001cbd8339818101604052810190620000379190620002d9565b3381816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7660405160405180910390a38073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa3396fd7f6e0a21b50e5089d2da70d5ac0a3bbbd1f617a93f134b7638998019860405160405180910390a35050836080818152505084600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260038190555081600481905550600454600681905550505050505062000361565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200020d82620001e0565b9050919050565b6000620002218262000200565b9050919050565b620002338162000214565b81146200023f57600080fd5b50565b600081519050620002538162000228565b92915050565b6000819050919050565b6200026e8162000259565b81146200027a57600080fd5b50565b6000815190506200028e8162000263565b92915050565b6000620002a18262000200565b9050919050565b620002b38162000294565b8114620002bf57600080fd5b50565b600081519050620002d381620002a8565b92915050565b600080600080600060a08688031215620002f857620002f7620001db565b5b6000620003088882890162000242565b95505060206200031b888289016200027d565b94505060406200032e888289016200027d565b935050606062000341888289016200027d565b92505060806200035488828901620002c2565b9150509295509295909350565b6080516119406200037d6000396000610bdd01526119406000f3fe6080604052600436106100dd5760003560e01c8063a2309ff81161007f578063ce190d5711610059578063ce190d5714610277578063df772941146102a0578063f2f4eb26146102cb578063ff03ad56146102f6576100dd565b8063a2309ff8146101f8578063a97c36eb14610223578063bf7e214f1461024c576100dd565b806362749f05116100bb57806362749f05146101525780637a9e5e4b1461017b57806380009630146101a45780638da5cb5b146101cd576100dd565b806313af4035146100e257806318160ddd1461010b5780631ad3f07714610136575b600080fd5b3480156100ee57600080fd5b5061010960048036038101906101049190610df7565b61031f565b005b34801561011757600080fd5b50610120610429565b60405161012d9190610e3d565b60405180910390f35b610150600480360381019061014b9190610e84565b61042f565b005b34801561015e57600080fd5b50610179600480360381019061017491906110c0565b610528565b005b34801561018757600080fd5b506101a2600480360381019061019d91906111d6565b610563565b005b3480156101b057600080fd5b506101cb60048036038101906101c69190611241565b610724565b005b3480156101d957600080fd5b506101e26107d5565b6040516101ef919061127d565b60405180910390f35b34801561020457600080fd5b5061020d6107f9565b60405161021a9190610e3d565b60405180910390f35b34801561022f57600080fd5b5061024a60048036038101906102459190610df7565b6107ff565b005b34801561025857600080fd5b50610261610879565b60405161026e91906112f7565b60405180910390f35b34801561028357600080fd5b5061029e60048036038101906102999190611312565b61089f565b005b3480156102ac57600080fd5b506102b561095a565b6040516102c29190610e3d565b60405180910390f35b3480156102d757600080fd5b506102e0610960565b6040516102ed9190611360565b60405180910390f35b34801561030257600080fd5b5061031d60048036038101906103189190610e84565b610986565b005b61034d336000357fffffffff0000000000000000000000000000000000000000000000000000000016610a01565b61038c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610383906113d8565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7660405160405180910390a350565b60045481565b6000600654821115610476576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046d90611444565b60405180910390fd5b600554820190506004548111156104c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b990611444565b60405180910390fd5b81600354346104d19190611493565b1015610512576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050990611510565b60405180910390fd5b61051c8383610b3f565b80600581905550505050565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055a9061157c565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061067d5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166040518463ffffffff1660e01b815260040161063b939291906115d7565b602060405180830381865afa158015610658573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067c9190611646565b5b61068657600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa3396fd7f6e0a21b50e5089d2da70d5ac0a3bbbd1f617a93f134b7638998019860405160405180910390a350565b610752336000357fffffffff0000000000000000000000000000000000000000000000000000000016610a01565b610791576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610788906113d8565b60405180910390fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b61082d336000357fffffffff0000000000000000000000000000000000000000000000000000000016610a01565b61086c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610863906113d8565b60405180910390fd5b6108768147610cd4565b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6108cd336000357fffffffff0000000000000000000000000000000000000000000000000000000016610a01565b61090c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610903906113d8565b60405180910390fd5b6004548110610950576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610947906116bf565b60405180910390fd5b8060068190555050565b60065481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6109b4336000357fffffffff0000000000000000000000000000000000000000000000000000000016610a01565b6109f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109ea906113d8565b60405180910390fd5b6109fd8282610cd4565b5050565b600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614158015610ae057508073ffffffffffffffffffffffffffffffffffffffff1663b70096138530866040518463ffffffff1660e01b8152600401610a9e939291906115d7565b602060405180830381865afa158015610abb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610adf9190611646565b5b80610b36575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b6000600167ffffffffffffffff811115610b5c57610b5b610f95565b5b604051908082528060200260200182016040528015610b8a5781602001602082028036833780820191505090505b5090506000600167ffffffffffffffff811115610baa57610ba9610f95565b5b604051908082528060200260200182016040528015610bd85781602001602082028036833780820191505090505b5090507f000000000000000000000000000000000000000000000000000000000000000082600081518110610c1057610c0f6116df565b5b6020026020010181815250508281600081518110610c3157610c306116df565b5b602002602001018181525050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663934eddf88584846040518463ffffffff1660e01b8152600401610c9c93929190611803565b600060405180830381600087803b158015610cb657600080fd5b505af1158015610cca573d6000803e3d6000fd5b5050505050505050565b60008273ffffffffffffffffffffffffffffffffffffffff1682604051610cfa90611889565b60006040518083038185875af1925050503d8060008114610d37576040519150601f19603f3d011682016040523d82523d6000602084013e610d3c565b606091505b5050905080610d80576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d77906118ea565b60405180910390fd5b505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610dc482610d99565b9050919050565b610dd481610db9565b8114610ddf57600080fd5b50565b600081359050610df181610dcb565b92915050565b600060208284031215610e0d57610e0c610d8f565b5b6000610e1b84828501610de2565b91505092915050565b6000819050919050565b610e3781610e24565b82525050565b6000602082019050610e526000830184610e2e565b92915050565b610e6181610e24565b8114610e6c57600080fd5b50565b600081359050610e7e81610e58565b92915050565b60008060408385031215610e9b57610e9a610d8f565b5b6000610ea985828601610de2565b9250506020610eba85828601610e6f565b9150509250929050565b600080fd5b600080fd5b600080fd5b60008083601f840112610ee957610ee8610ec4565b5b8235905067ffffffffffffffff811115610f0657610f05610ec9565b5b602083019150836020820283011115610f2257610f21610ece565b5b9250929050565b60008083601f840112610f3f57610f3e610ec4565b5b8235905067ffffffffffffffff811115610f5c57610f5b610ec9565b5b602083019150836001820283011115610f7857610f77610ece565b5b9250929050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610fcd82610f84565b810181811067ffffffffffffffff82111715610fec57610feb610f95565b5b80604052505050565b6000610fff610d85565b905061100b8282610fc4565b919050565b600067ffffffffffffffff82111561102b5761102a610f95565b5b61103482610f84565b9050602081019050919050565b82818337600083830152505050565b600061106361105e84611010565b610ff5565b90508281526020810184848401111561107f5761107e610f7f565b5b61108a848285611041565b509392505050565b600082601f8301126110a7576110a6610ec4565b5b81356110b7848260208601611050565b91505092915050565b600080600080600080600060a0888a0312156110df576110de610d8f565b5b60006110ed8a828b01610de2565b97505060206110fe8a828b01610e6f565b965050604088013567ffffffffffffffff81111561111f5761111e610d94565b5b61112b8a828b01610ed3565b9550955050606088013567ffffffffffffffff81111561114e5761114d610d94565b5b61115a8a828b01610f29565b9350935050608088013567ffffffffffffffff81111561117d5761117c610d94565b5b6111898a828b01611092565b91505092959891949750929550565b60006111a382610db9565b9050919050565b6111b381611198565b81146111be57600080fd5b50565b6000813590506111d0816111aa565b92915050565b6000602082840312156111ec576111eb610d8f565b5b60006111fa848285016111c1565b91505092915050565b600061120e82610db9565b9050919050565b61121e81611203565b811461122957600080fd5b50565b60008135905061123b81611215565b92915050565b60006020828403121561125757611256610d8f565b5b60006112658482850161122c565b91505092915050565b61127781610db9565b82525050565b6000602082019050611292600083018461126e565b92915050565b6000819050919050565b60006112bd6112b86112b384610d99565b611298565b610d99565b9050919050565b60006112cf826112a2565b9050919050565b60006112e1826112c4565b9050919050565b6112f1816112d6565b82525050565b600060208201905061130c60008301846112e8565b92915050565b60006020828403121561132857611327610d8f565b5b600061133684828501610e6f565b91505092915050565b600061134a826112c4565b9050919050565b61135a8161133f565b82525050565b60006020820190506113756000830184611351565b92915050565b600082825260208201905092915050565b7f554e415554484f52495a45440000000000000000000000000000000000000000600082015250565b60006113c2600c8361137b565b91506113cd8261138c565b602082019050919050565b600060208201905081810360008301526113f1816113b5565b9050919050565b7f4e6f7420656e6f75676820737570706c79000000000000000000000000000000600082015250565b600061142e60118361137b565b9150611439826113f8565b602082019050919050565b6000602082019050818103600083015261145d81611421565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061149e82610e24565b91506114a983610e24565b9250826114b9576114b8611464565b5b828204905092915050565b7f536f727279206e6f7420656e6f756768204554482070726f7669646564000000600082015250565b60006114fa601d8361137b565b9150611505826114c4565b602082019050919050565b60006020820190508181036000830152611529816114ed565b9050919050565b7f5573652070617961626c652076616c696461746f720000000000000000000000600082015250565b600061156660158361137b565b915061157182611530565b602082019050919050565b6000602082019050818103600083015261159581611559565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6115d18161159c565b82525050565b60006060820190506115ec600083018661126e565b6115f9602083018561126e565b61160660408301846115c8565b949350505050565b60008115159050919050565b6116238161160e565b811461162e57600080fd5b50565b6000815190506116408161161a565b92915050565b60006020828403121561165c5761165b610d8f565b5b600061166a84828501611631565b91505092915050565b7f4c696d6974206d75737420626520756e64657220737570706c7920746f74616c600082015250565b60006116a960208361137b565b91506116b482611673565b602082019050919050565b600060208201905081810360008301526116d88161169c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61174381610e24565b82525050565b6000611755838361173a565b60208301905092915050565b6000602082019050919050565b60006117798261170e565b6117838185611719565b935061178e8361172a565b8060005b838110156117bf5781516117a68882611749565b97506117b183611761565b925050600181019050611792565b5085935050505092915050565b600082825260208201905092915050565b50565b60006117ed6000836117cc565b91506117f8826117dd565b600082019050919050565b6000608082019050611818600083018661126e565b818103602083015261182a818561176e565b9050818103604083015261183e818461176e565b90508181036060830152611851816117e0565b9050949350505050565b600081905092915050565b600061187360008361185b565b915061187e826117dd565b600082019050919050565b600061189482611866565b9150819050919050565b7f5472616e73666572206661696c65642e00000000000000000000000000000000600082015250565b60006118d460108361137b565b91506118df8261189e565b602082019050919050565b60006020820190508181036000830152611903816118c7565b905091905056fea264697066735822122045126d4153aeaf78608b710bf14c18c62a5001fe4803286821314cb01797810264736f6c634300080a0033";

type PaymentValidatorV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PaymentValidatorV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PaymentValidatorV2__factory extends ContractFactory {
  constructor(...args: PaymentValidatorV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _core: string,
    id_: BigNumberish,
    cost_: BigNumberish,
    _supply: BigNumberish,
    authority: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PaymentValidatorV2> {
    return super.deploy(
      _core,
      id_,
      cost_,
      _supply,
      authority,
      overrides || {}
    ) as Promise<PaymentValidatorV2>;
  }
  override getDeployTransaction(
    _core: string,
    id_: BigNumberish,
    cost_: BigNumberish,
    _supply: BigNumberish,
    authority: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _core,
      id_,
      cost_,
      _supply,
      authority,
      overrides || {}
    );
  }
  override attach(address: string): PaymentValidatorV2 {
    return super.attach(address) as PaymentValidatorV2;
  }
  override connect(signer: Signer): PaymentValidatorV2__factory {
    return super.connect(signer) as PaymentValidatorV2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PaymentValidatorV2Interface {
    return new utils.Interface(_abi) as PaymentValidatorV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PaymentValidatorV2 {
    return new Contract(address, _abi, signerOrProvider) as PaymentValidatorV2;
  }
}