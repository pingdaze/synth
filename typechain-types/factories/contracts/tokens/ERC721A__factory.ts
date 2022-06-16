/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC721A,
  ERC721AInterface,
} from "../../../contracts/tokens/ERC721A";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalToCurrentOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "ApproveToCaller",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200243a3803806200243a8339818101604052810190620000379190620002d9565b81600290805190602001906200004f9291906200008c565b508060039080519060200190620000689291906200008c565b50620000796200008760201b60201c565b6000819055505050620003c3565b600090565b8280546200009a906200038d565b90600052602060002090601f016020900481019282620000be57600085556200010a565b82601f10620000d957805160ff19168380011785556200010a565b828001600101855582156200010a579182015b8281111562000109578251825591602001919060010190620000ec565b5b5090506200011991906200011d565b5090565b5b80821115620001385760008160009055506001016200011e565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001a5826200015a565b810181811067ffffffffffffffff82111715620001c757620001c66200016b565b5b80604052505050565b6000620001dc6200013c565b9050620001ea82826200019a565b919050565b600067ffffffffffffffff8211156200020d576200020c6200016b565b5b62000218826200015a565b9050602081019050919050565b60005b838110156200024557808201518184015260208101905062000228565b8381111562000255576000848401525b50505050565b6000620002726200026c84620001ef565b620001d0565b90508281526020810184848401111562000291576200029062000155565b5b6200029e84828562000225565b509392505050565b600082601f830112620002be57620002bd62000150565b5b8151620002d08482602086016200025b565b91505092915050565b60008060408385031215620002f357620002f262000146565b5b600083015167ffffffffffffffff8111156200031457620003136200014b565b5b6200032285828601620002a6565b925050602083015167ffffffffffffffff8111156200034657620003456200014b565b5b6200035485828601620002a6565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620003a657607f821691505b60208210811415620003bd57620003bc6200035e565b5b50919050565b61206780620003d36000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb4651461025d578063b88d4fde14610279578063c87b56dd14610295578063e985e9c5146102c5576100ea565b80636352211e146101df57806370a082311461020f57806395d89b411461023f576100ea565b8063095ea7b3116100c8578063095ea7b31461016d57806318160ddd1461018957806323b872dd146101a757806342842e0e146101c3576100ea565b806301ffc9a7146100ef57806306fdde031461011f578063081812fc1461013d575b600080fd5b61010960048036038101906101049190611774565b6102f5565b60405161011691906117bc565b60405180910390f35b6101276103d7565b6040516101349190611870565b60405180910390f35b610157600480360381019061015291906118c8565b610469565b6040516101649190611936565b60405180910390f35b6101876004803603810190610182919061197d565b6104e5565b005b6101916105f0565b60405161019e91906119cc565b60405180910390f35b6101c160048036038101906101bc91906119e7565b610607565b005b6101dd60048036038101906101d891906119e7565b610617565b005b6101f960048036038101906101f491906118c8565b610637565b6040516102069190611936565b60405180910390f35b61022960048036038101906102249190611a3a565b61064d565b60405161023691906119cc565b60405180910390f35b61024761071d565b6040516102549190611870565b60405180910390f35b61027760048036038101906102729190611a93565b6107af565b005b610293600480360381019061028e9190611c08565b610927565b005b6102af60048036038101906102aa91906118c8565b6109a3565b6040516102bc9190611870565b60405180910390f35b6102df60048036038101906102da9190611c8b565b610a42565b6040516102ec91906117bc565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103c057507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806103d057506103cf82610ad6565b5b9050919050565b6060600280546103e690611cfa565b80601f016020809104026020016040519081016040528092919081815260200182805461041290611cfa565b801561045f5780601f106104345761010080835404028352916020019161045f565b820191906000526020600020905b81548152906001019060200180831161044257829003601f168201915b5050505050905090565b600061047482610b40565b6104aa576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6006600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104f082610637565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610558576040517f943f7b8c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610577610b8e565b73ffffffffffffffffffffffffffffffffffffffff16141580156105a957506105a7816105a2610b8e565b610a42565b155b156105e0576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6105eb838383610b96565b505050565b60006105fa610c48565b6001546000540303905090565b610612838383610c4d565b505050565b61063283838360405180602001604052806000815250610927565b505050565b60006106428261113e565b600001519050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156106b5576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff169050919050565b60606003805461072c90611cfa565b80601f016020809104026020016040519081016040528092919081815260200182805461075890611cfa565b80156107a55780601f1061077a576101008083540402835291602001916107a5565b820191906000526020600020905b81548152906001019060200180831161078857829003601f168201915b5050505050905090565b6107b7610b8e565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561081c576040517fb06307db00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060076000610829610b8e565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff166108d6610b8e565b73ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405161091b91906117bc565b60405180910390a35050565b610932848484610c4d565b6109518373ffffffffffffffffffffffffffffffffffffffff166113cd565b80156109665750610964848484846113f0565b155b1561099d576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b60606109ae82610b40565b6109e4576040517fa14c4b5000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006109ee611541565b9050600081511415610a0f5760405180602001604052806000815250610a3a565b80610a1984611558565b604051602001610a2a929190611d68565b6040516020818303038152906040525b915050919050565b6000600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600081610b4b610c48565b11158015610b5a575060005482105b8015610b87575060046000838152602001908152602001600020600001601c9054906101000a900460ff16155b9050919050565b600033905090565b826006600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a4505050565b600090565b6000610c588261113e565b90506000816000015173ffffffffffffffffffffffffffffffffffffffff16610c7f610b8e565b73ffffffffffffffffffffffffffffffffffffffff161480610cb25750610cb18260000151610cac610b8e565b610a42565b5b80610cf75750610cc0610b8e565b73ffffffffffffffffffffffffffffffffffffffff16610cdf84610469565b73ffffffffffffffffffffffffffffffffffffffff16145b905080610d30576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8473ffffffffffffffffffffffffffffffffffffffff16826000015173ffffffffffffffffffffffffffffffffffffffff1614610d99576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610e00576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610e0d85858560016116b9565b610e1d6000848460000151610b96565b6001600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282829054906101000a900467ffffffffffffffff160392506101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055506001600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282829054906101000a900467ffffffffffffffff160192506101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550836004600085815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550426004600085815260200190815260200160002060000160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055506000600184019050600073ffffffffffffffffffffffffffffffffffffffff166004600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156110ce576000548110156110cd5782600001516004600083815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082602001516004600083815260200190815260200160002060000160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055505b5b50828473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461113785858560016116bf565b5050505050565b6111466116c5565b600082905080611154610c48565b11158015611163575060005481105b15611396576000600460008381526020019081526020016000206040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016000820160149054906101000a900467ffffffffffffffff1667ffffffffffffffff1667ffffffffffffffff16815260200160008201601c9054906101000a900460ff1615151515815250509050806040015161139457600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16146112785780925050506113c8565b5b60011561139357818060019003925050600460008381526020019081526020016000206040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016000820160149054906101000a900467ffffffffffffffff1667ffffffffffffffff1667ffffffffffffffff16815260200160008201601c9054906101000a900460ff1615151515815250509050600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff161461138e5780925050506113c8565b611279565b5b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60008373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611416610b8e565b8786866040518563ffffffff1660e01b81526004016114389493929190611de1565b6020604051808303816000875af192505050801561147457506040513d601f19601f820116820180604052508101906114719190611e42565b60015b6114ee573d80600081146114a4576040519150601f19603f3d011682016040523d82523d6000602084013e6114a9565b606091505b506000815114156114e6576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050949350505050565b606060405180602001604052806000815250905090565b606060008214156115a0576040518060400160405280600181526020017f300000000000000000000000000000000000000000000000000000000000000081525090506116b4565b600082905060005b600082146115d25780806115bb90611e9e565b915050600a826115cb9190611f16565b91506115a8565b60008167ffffffffffffffff8111156115ee576115ed611add565b5b6040519080825280601f01601f1916602001820160405280156116205781602001600182028036833780820191505090505b5090505b600085146116ad576001826116399190611f47565b9150600a856116489190611f7b565b60306116549190611fac565b60f81b81838151811061166a57611669612002565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856116a69190611f16565b9450611624565b8093505050505b919050565b50505050565b50505050565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600067ffffffffffffffff1681526020016000151581525090565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6117518161171c565b811461175c57600080fd5b50565b60008135905061176e81611748565b92915050565b60006020828403121561178a57611789611712565b5b60006117988482850161175f565b91505092915050565b60008115159050919050565b6117b6816117a1565b82525050565b60006020820190506117d160008301846117ad565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156118115780820151818401526020810190506117f6565b83811115611820576000848401525b50505050565b6000601f19601f8301169050919050565b6000611842826117d7565b61184c81856117e2565b935061185c8185602086016117f3565b61186581611826565b840191505092915050565b6000602082019050818103600083015261188a8184611837565b905092915050565b6000819050919050565b6118a581611892565b81146118b057600080fd5b50565b6000813590506118c28161189c565b92915050565b6000602082840312156118de576118dd611712565b5b60006118ec848285016118b3565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611920826118f5565b9050919050565b61193081611915565b82525050565b600060208201905061194b6000830184611927565b92915050565b61195a81611915565b811461196557600080fd5b50565b60008135905061197781611951565b92915050565b6000806040838503121561199457611993611712565b5b60006119a285828601611968565b92505060206119b3858286016118b3565b9150509250929050565b6119c681611892565b82525050565b60006020820190506119e160008301846119bd565b92915050565b600080600060608486031215611a00576119ff611712565b5b6000611a0e86828701611968565b9350506020611a1f86828701611968565b9250506040611a30868287016118b3565b9150509250925092565b600060208284031215611a5057611a4f611712565b5b6000611a5e84828501611968565b91505092915050565b611a70816117a1565b8114611a7b57600080fd5b50565b600081359050611a8d81611a67565b92915050565b60008060408385031215611aaa57611aa9611712565b5b6000611ab885828601611968565b9250506020611ac985828601611a7e565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611b1582611826565b810181811067ffffffffffffffff82111715611b3457611b33611add565b5b80604052505050565b6000611b47611708565b9050611b538282611b0c565b919050565b600067ffffffffffffffff821115611b7357611b72611add565b5b611b7c82611826565b9050602081019050919050565b82818337600083830152505050565b6000611bab611ba684611b58565b611b3d565b905082815260208101848484011115611bc757611bc6611ad8565b5b611bd2848285611b89565b509392505050565b600082601f830112611bef57611bee611ad3565b5b8135611bff848260208601611b98565b91505092915050565b60008060008060808587031215611c2257611c21611712565b5b6000611c3087828801611968565b9450506020611c4187828801611968565b9350506040611c52878288016118b3565b925050606085013567ffffffffffffffff811115611c7357611c72611717565b5b611c7f87828801611bda565b91505092959194509250565b60008060408385031215611ca257611ca1611712565b5b6000611cb085828601611968565b9250506020611cc185828601611968565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611d1257607f821691505b60208210811415611d2657611d25611ccb565b5b50919050565b600081905092915050565b6000611d42826117d7565b611d4c8185611d2c565b9350611d5c8185602086016117f3565b80840191505092915050565b6000611d748285611d37565b9150611d808284611d37565b91508190509392505050565b600081519050919050565b600082825260208201905092915050565b6000611db382611d8c565b611dbd8185611d97565b9350611dcd8185602086016117f3565b611dd681611826565b840191505092915050565b6000608082019050611df66000830187611927565b611e036020830186611927565b611e1060408301856119bd565b8181036060830152611e228184611da8565b905095945050505050565b600081519050611e3c81611748565b92915050565b600060208284031215611e5857611e57611712565b5b6000611e6684828501611e2d565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611ea982611892565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611edc57611edb611e6f565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611f2182611892565b9150611f2c83611892565b925082611f3c57611f3b611ee7565b5b828204905092915050565b6000611f5282611892565b9150611f5d83611892565b925082821015611f7057611f6f611e6f565b5b828203905092915050565b6000611f8682611892565b9150611f9183611892565b925082611fa157611fa0611ee7565b5b828206905092915050565b6000611fb782611892565b9150611fc283611892565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611ff757611ff6611e6f565b5b828201905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220957a27a8188fbdbfadaaf3a6b36e637b9e489fb25e1f4e09ed149685c32f40ba64736f6c634300080a0033";

type ERC721AConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721AConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721A__factory extends ContractFactory {
  constructor(...args: ERC721AConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721A> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721A>;
  }
  override getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): ERC721A {
    return super.attach(address) as ERC721A;
  }
  override connect(signer: Signer): ERC721A__factory {
    return super.connect(signer) as ERC721A__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721AInterface {
    return new utils.Interface(_abi) as ERC721AInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721A {
    return new Contract(address, _abi, signerOrProvider) as ERC721A;
  }
}
