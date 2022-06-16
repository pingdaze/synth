/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  AugmentsValidator,
  AugmentsValidatorInterface,
} from "../../../contracts/validators/AugmentsValidator";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ICharacter",
        name: "_character",
        type: "address",
      },
      {
        internalType: "contract ICore",
        name: "_core",
        type: "address",
      },
      {
        internalType: "contract Authority",
        name: "auth",
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
    inputs: [
      {
        internalType: "uint32",
        name: "series",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "form",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "rarity",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "slot",
        type: "uint8",
      },
    ],
    name: "addAugment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "optionString",
        type: "string",
      },
      {
        internalType: "uint32",
        name: "series",
        type: "uint32",
      },
    ],
    name: "addOption",
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
    name: "augmentExists",
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
    inputs: [],
    name: "character",
    outputs: [
      {
        internalType: "contract ICharacter",
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
        internalType: "uint32",
        name: "series",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "form",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "rarity",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "slot",
        type: "uint8",
      },
    ],
    name: "convertToAugmentUUID",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "core",
    outputs: [
      {
        internalType: "contract ICore",
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "slotID",
        type: "uint8",
      },
    ],
    name: "equipSkeleton",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "formToSlotCount",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "option",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "form",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "rarity",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "slot",
        type: "uint8",
      },
    ],
    name: "getAugmentIDByOption",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "series",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "form",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "rarity",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "slot",
        type: "uint8",
      },
    ],
    name: "getAugmentIDBySeries",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "optionStringToSeries",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
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
        internalType: "uint32",
        name: "series",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "form",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "rarity",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "slot",
        type: "uint8",
      },
    ],
    name: "removeAugment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "optionString",
        type: "string",
      },
    ],
    name: "removeOption",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "slotCount",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "slotID",
        type: "uint8",
      },
    ],
    name: "unequipSkeleton",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001d5b38038062001d5b833981810160405281019062000037919062000303565b3381816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7660405160405180910390a38073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa3396fd7f6e0a21b50e5089d2da70d5ac0a3bbbd1f617a93f134b7638998019860405160405180910390a3505081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050506200035f565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200022d8262000200565b9050919050565b6000620002418262000220565b9050919050565b620002538162000234565b81146200025f57600080fd5b50565b600081519050620002738162000248565b92915050565b6000620002868262000220565b9050919050565b620002988162000279565b8114620002a457600080fd5b50565b600081519050620002b8816200028d565b92915050565b6000620002cb8262000220565b9050919050565b620002dd81620002be565b8114620002e957600080fd5b50565b600081519050620002fd81620002d2565b92915050565b6000806000606084860312156200031f576200031e620001fb565b5b60006200032f8682870162000262565b93505060206200034286828701620002a7565b92505060406200035586828701620002ec565b9150509250925092565b6119ec806200036f6000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c8063670d3913116100ad578063bf7e214f11610071578063bf7e214f1461032a578063d373336d14610348578063eb79042514610364578063ed08fa8014610380578063f2f4eb261461039e57610121565b8063670d391314610260578063686a1281146102905780637a9e5e4b146102c05780637cf0c72f146102dc5780638da5cb5b1461030c57610121565b8063496f89e5116100f4578063496f89e5146101d25780634a03b97f146101ee5780634d2e03a01461020a5780635e039f961461022857806366a8ab251461024457610121565b80630c9683b41461012657806313af40351461015657806324bc506f146101725780633c93fb51146101a2575b600080fd5b610140600480360381019061013b9190610e93565b6103bc565b60405161014d9190610f13565b60405180910390f35b610170600480360381019061016b9190610f8c565b6103de565b005b61018c60048036038101906101879190610e93565b6104e8565b6040516101999190610f13565b60405180910390f35b6101bc60048036038101906101b79190610fe5565b610560565b6040516101c9919061102d565b60405180910390f35b6101ec60048036038101906101e79190611048565b610580565b005b61020860048036038101906102039190610e93565b610612565b005b6102126106bc565b60405161021f91906110d4565b60405180910390f35b610242600480360381019061023d9190611154565b6106e2565b005b61025e60048036038101906102599190610e93565b6106f2565b005b61027a600480360381019061027591906112f5565b61079c565b6040516102879190610f13565b60405180910390f35b6102aa60048036038101906102a59190611048565b610891565b6040516102b79190611387565b60405180910390f35b6102da60048036038101906102d591906113e0565b6108b1565b005b6102f660048036038101906102f1919061140d565b610a72565b6040516103039190611465565b60405180910390f35b610314610aab565b604051610321919061148f565b60405180910390f35b610332610acf565b60405161033f91906114cb565b60405180910390f35b610362600480360381019061035d91906114e6565b610af5565b005b61037e60048036038101906103799190611526565b610bd2565b005b610388610be2565b6040516103959190611387565b60405180910390f35b6103a6610bf5565b6040516103b39190611594565b60405180910390f35b6000630100000085026201000085026101008502840101019050949350505050565b61040c336000357fffffffff0000000000000000000000000000000000000000000000000000000016610c1b565b61044b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104429061160c565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7660405160405180910390a350565b60006104f6858585856103bc565b90506006600082815260200190815260200160002060009054906101000a900460ff16610558576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161054f9061169e565b60405180910390fd5b949350505050565b60066020528060005260406000206000915054906101000a900460ff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370fd4de682336040518363ffffffff1660e01b81526004016105dd9291906116be565b600060405180830381600087803b1580156105f757600080fd5b505af115801561060b573d6000803e3d6000fd5b5050505050565b610640336000357fffffffff0000000000000000000000000000000000000000000000000000000016610c1b565b61067f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106769061160c565b60405180910390fd5b600160066000610691878787876103bc565b815260200190815260200160002060006101000a81548160ff02191690831515021790555050505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6106ed838383610d59565b505050565b610720336000357fffffffff0000000000000000000000000000000000000000000000000000000016610c1b565b61075f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107569061160c565b60405180910390fd5b600060066000610771878787876103bc565b815260200190815260200160002060006101000a81548160ff02191690831515021790555050505050565b6000806004866040516107af9190611761565b908152602001604051809103902060009054906101000a900463ffffffff16905060008163ffffffff16141561081a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610811906117ea565b60405180910390fd5b610826818686866103bc565b91506006600083815260200190815260200160002060009054906101000a900460ff16610888576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087f9061169e565b60405180910390fd5b50949350505050565b60056020528060005260406000206000915054906101000a900460ff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806109cb5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166040518463ffffffff1660e01b815260040161098993929190611845565b602060405180830381865afa1580156109a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ca91906118a8565b5b6109d457600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa3396fd7f6e0a21b50e5089d2da70d5ac0a3bbbd1f617a93f134b7638998019860405160405180910390a350565b6004818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900463ffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b8060ff168260ff1614610b3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3490611921565b60405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b0c0a6208284336040518463ffffffff1660e01b8152600401610b9c93929190611941565b600060405180830381600087803b158015610bb657600080fd5b505af1158015610bca573d6000803e3d6000fd5b505050505050565b610bde82826000610d59565b5050565b600760009054906101000a900460ff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614158015610cfa57508073ffffffffffffffffffffffffffffffffffffffff1663b70096138530866040518463ffffffff1660e01b8152600401610cb893929190611845565b602060405180830381865afa158015610cd5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf991906118a8565b5b80610d50575060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b610d87336000357fffffffff0000000000000000000000000000000000000000000000000000000016610c1b565b610dc6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dbd9061160c565b60405180910390fd5b8060048484604051610dd992919061199d565b908152602001604051809103902060006101000a81548163ffffffff021916908363ffffffff160217905550505050565b6000604051905090565b600080fd5b600080fd5b600063ffffffff82169050919050565b610e3781610e1e565b8114610e4257600080fd5b50565b600081359050610e5481610e2e565b92915050565b600060ff82169050919050565b610e7081610e5a565b8114610e7b57600080fd5b50565b600081359050610e8d81610e67565b92915050565b60008060008060808587031215610ead57610eac610e14565b5b6000610ebb87828801610e45565b9450506020610ecc87828801610e7e565b9350506040610edd87828801610e7e565b9250506060610eee87828801610e7e565b91505092959194509250565b6000819050919050565b610f0d81610efa565b82525050565b6000602082019050610f286000830184610f04565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610f5982610f2e565b9050919050565b610f6981610f4e565b8114610f7457600080fd5b50565b600081359050610f8681610f60565b92915050565b600060208284031215610fa257610fa1610e14565b5b6000610fb084828501610f77565b91505092915050565b610fc281610efa565b8114610fcd57600080fd5b50565b600081359050610fdf81610fb9565b92915050565b600060208284031215610ffb57610ffa610e14565b5b600061100984828501610fd0565b91505092915050565b60008115159050919050565b61102781611012565b82525050565b6000602082019050611042600083018461101e565b92915050565b60006020828403121561105e5761105d610e14565b5b600061106c84828501610e7e565b91505092915050565b6000819050919050565b600061109a61109561109084610f2e565b611075565b610f2e565b9050919050565b60006110ac8261107f565b9050919050565b60006110be826110a1565b9050919050565b6110ce816110b3565b82525050565b60006020820190506110e960008301846110c5565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112611114576111136110ef565b5b8235905067ffffffffffffffff811115611131576111306110f4565b5b60208301915083600182028301111561114d5761114c6110f9565b5b9250929050565b60008060006040848603121561116d5761116c610e14565b5b600084013567ffffffffffffffff81111561118b5761118a610e19565b5b611197868287016110fe565b935093505060206111aa86828701610e45565b9150509250925092565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611202826111b9565b810181811067ffffffffffffffff82111715611221576112206111ca565b5b80604052505050565b6000611234610e0a565b905061124082826111f9565b919050565b600067ffffffffffffffff8211156112605761125f6111ca565b5b611269826111b9565b9050602081019050919050565b82818337600083830152505050565b600061129861129384611245565b61122a565b9050828152602081018484840111156112b4576112b36111b4565b5b6112bf848285611276565b509392505050565b600082601f8301126112dc576112db6110ef565b5b81356112ec848260208601611285565b91505092915050565b6000806000806080858703121561130f5761130e610e14565b5b600085013567ffffffffffffffff81111561132d5761132c610e19565b5b611339878288016112c7565b945050602061134a87828801610e7e565b935050604061135b87828801610e7e565b925050606061136c87828801610e7e565b91505092959194509250565b61138181610e5a565b82525050565b600060208201905061139c6000830184611378565b92915050565b60006113ad82610f4e565b9050919050565b6113bd816113a2565b81146113c857600080fd5b50565b6000813590506113da816113b4565b92915050565b6000602082840312156113f6576113f5610e14565b5b6000611404848285016113cb565b91505092915050565b60006020828403121561142357611422610e14565b5b600082013567ffffffffffffffff81111561144157611440610e19565b5b61144d848285016112c7565b91505092915050565b61145f81610e1e565b82525050565b600060208201905061147a6000830184611456565b92915050565b61148981610f4e565b82525050565b60006020820190506114a46000830184611480565b92915050565b60006114b5826110a1565b9050919050565b6114c5816114aa565b82525050565b60006020820190506114e060008301846114bc565b92915050565b600080604083850312156114fd576114fc610e14565b5b600061150b85828601610fd0565b925050602061151c85828601610e7e565b9150509250929050565b6000806020838503121561153d5761153c610e14565b5b600083013567ffffffffffffffff81111561155b5761155a610e19565b5b611567858286016110fe565b92509250509250929050565b600061157e826110a1565b9050919050565b61158e81611573565b82525050565b60006020820190506115a96000830184611585565b92915050565b600082825260208201905092915050565b7f554e415554484f52495a45440000000000000000000000000000000000000000600082015250565b60006115f6600c836115af565b9150611601826115c0565b602082019050919050565b60006020820190508181036000830152611625816115e9565b9050919050565b7f536f7272792074686520726571756573746564206175676d656e7420646f657360008201527f6e27742065786973740000000000000000000000000000000000000000000000602082015250565b60006116886029836115af565b91506116938261162c565b604082019050919050565b600060208201905081810360008301526116b78161167b565b9050919050565b60006040820190506116d36000830185611378565b6116e06020830184611480565b9392505050565b600081519050919050565b600081905092915050565b60005b8381101561171b578082015181840152602081019050611700565b8381111561172a576000848401525b50505050565b600061173b826116e7565b61174581856116f2565b93506117558185602086016116fd565b80840191505092915050565b600061176d8284611730565b915081905092915050565b7f536f7272792074686520726571756573746564206f7074696f6e20646f65732060008201527f6e6f742065786973740000000000000000000000000000000000000000000000602082015250565b60006117d46029836115af565b91506117df82611778565b604082019050919050565b60006020820190508181036000830152611803816117c7565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61183f8161180a565b82525050565b600060608201905061185a6000830186611480565b6118676020830185611480565b6118746040830184611836565b949350505050565b61188581611012565b811461189057600080fd5b50565b6000815190506118a28161187c565b92915050565b6000602082840312156118be576118bd610e14565b5b60006118cc84828501611893565b91505092915050565b7f5468697320646f65736e27742066697420696e207468697320736c6f74000000600082015250565b600061190b601d836115af565b9150611916826118d5565b602082019050919050565b6000602082019050818103600083015261193a816118fe565b9050919050565b60006060820190506119566000830186611378565b6119636020830185610f04565b6119706040830184611480565b949350505050565b600061198483856116f2565b9350611991838584611276565b82840190509392505050565b60006119aa828486611978565b9150819050939250505056fea2646970667358221220fe30b8071aa040f098477afb5f5a4c59315d8c117425defd09f9334c9e4384c664736f6c634300080a0033";

type AugmentsValidatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AugmentsValidatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AugmentsValidator__factory extends ContractFactory {
  constructor(...args: AugmentsValidatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _character: string,
    _core: string,
    auth: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AugmentsValidator> {
    return super.deploy(
      _character,
      _core,
      auth,
      overrides || {}
    ) as Promise<AugmentsValidator>;
  }
  override getDeployTransaction(
    _character: string,
    _core: string,
    auth: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_character, _core, auth, overrides || {});
  }
  override attach(address: string): AugmentsValidator {
    return super.attach(address) as AugmentsValidator;
  }
  override connect(signer: Signer): AugmentsValidator__factory {
    return super.connect(signer) as AugmentsValidator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AugmentsValidatorInterface {
    return new utils.Interface(_abi) as AugmentsValidatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AugmentsValidator {
    return new Contract(address, _abi, signerOrProvider) as AugmentsValidator;
  }
}
