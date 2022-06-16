/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Basic1155,
  Basic1155Interface,
} from "../../../contracts/test/Basic1155";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
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
        name: "operator",
        type: "address",
      },
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
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060200160405280600081525062000033816200003a60201b60201c565b506200016b565b80600290805190602001906200005292919062000056565b5050565b828054620000649062000135565b90600052602060002090601f016020900481019282620000885760008555620000d4565b82601f10620000a357805160ff1916838001178555620000d4565b82800160010185558215620000d4579182015b82811115620000d3578251825591602001919060010190620000b6565b5b509050620000e39190620000e7565b5090565b5b8082111562000102576000816000905550600101620000e8565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200014e57607f821691505b6020821081141562000165576200016462000106565b5b50919050565b61289f806200017b6000396000f3fe608060405234801561001057600080fd5b50600436106100925760003560e01c80634e1273f4116100665780634e1273f414610143578063836a104014610173578063a22cb4651461018f578063e985e9c5146101ab578063f242432a146101db57610092565b8062fdd58e1461009757806301ffc9a7146100c75780630e89341c146100f75780632eb2c2d614610127575b600080fd5b6100b160048036038101906100ac91906115ae565b6101f7565b6040516100be91906115fd565b60405180910390f35b6100e160048036038101906100dc9190611670565b6102c0565b6040516100ee91906116b8565b60405180910390f35b610111600480360381019061010c91906116d3565b6103a2565b60405161011e9190611799565b60405180910390f35b610141600480360381019061013c91906119b8565b610436565b005b61015d60048036038101906101589190611b4a565b6104d7565b60405161016a9190611c80565b60405180910390f35b61018d60048036038101906101889190611ca2565b6105f0565b005b6101a960048036038101906101a49190611d21565b610610565b005b6101c560048036038101906101c09190611d61565b610626565b6040516101d291906116b8565b60405180910390f35b6101f560048036038101906101f09190611da1565b6106ba565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610268576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161025f90611eaa565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061038b57507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061039b575061039a8261075b565b5b9050919050565b6060600280546103b190611ef9565b80601f01602080910402602001604051908101604052809291908181526020018280546103dd90611ef9565b801561042a5780601f106103ff5761010080835404028352916020019161042a565b820191906000526020600020905b81548152906001019060200180831161040d57829003601f168201915b50505050509050919050565b61043e6107c5565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061048457506104838561047e6107c5565b610626565b5b6104c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ba90611f9d565b60405180910390fd5b6104d085858585856107cd565b5050505050565b6060815183511461051d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105149061202f565b60405180910390fd5b6000835167ffffffffffffffff81111561053a576105396117c0565b5b6040519080825280602002602001820160405280156105685781602001602082028036833780820191505090505b50905060005b84518110156105e5576105b585828151811061058d5761058c61204f565b5b60200260200101518583815181106105a8576105a761204f565b5b60200260200101516101f7565b8282815181106105c8576105c761204f565b5b602002602001018181525050806105de906120ad565b905061056e565b508091505092915050565b61060b82848360405180602001604052806000815250610aef565b505050565b61062261061b6107c5565b8383610ca0565b5050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6106c26107c5565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806107085750610707856107026107c5565b610626565b5b610747576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073e90612168565b60405180910390fd5b6107548585858585610e0d565b5050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b8151835114610811576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610808906121fa565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610881576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108789061228c565b60405180910390fd5b600061088b6107c5565b905061089b8187878787876110a9565b60005b8451811015610a4c5760008582815181106108bc576108bb61204f565b5b6020026020010151905060008583815181106108db576108da61204f565b5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561097c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109739061231e565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a31919061233e565b9250508190555050505080610a45906120ad565b905061089e565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610ac3929190612394565b60405180910390a4610ad98187878787876110b1565b610ae78187878787876110b9565b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610b5f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b569061243d565b60405180910390fd5b6000610b696107c5565b90506000610b7685611291565b90506000610b8385611291565b9050610b94836000898585896110a9565b8460008088815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610bf3919061233e565b925050819055508673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628989604051610c7192919061245d565b60405180910390a4610c88836000898585896110b1565b610c978360008989898961130b565b50505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610d0f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d06906124f8565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610e0091906116b8565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610e7d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e749061228c565b60405180910390fd5b6000610e876107c5565b90506000610e9485611291565b90506000610ea185611291565b9050610eb18389898585896110a9565b600080600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905085811015610f48576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f3f9061231e565b60405180910390fd5b85810360008089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508560008089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ffd919061233e565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a60405161107a92919061245d565b60405180910390a4611090848a8a86868a6110b1565b61109e848a8a8a8a8a61130b565b505050505050505050565b505050505050565b505050505050565b6110d88473ffffffffffffffffffffffffffffffffffffffff166114e3565b15611289578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b815260040161111e95949392919061257c565b6020604051808303816000875af192505050801561115a57506040513d601f19601f8201168201806040525081019061115791906125f9565b60015b61120057611166612633565b806308c379a014156111c3575061117b612655565b8061118657506111c5565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111ba9190611799565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111f79061275d565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611287576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161127e906127ef565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff8111156112b0576112af6117c0565b5b6040519080825280602002602001820160405280156112de5781602001602082028036833780820191505090505b50905082816000815181106112f6576112f561204f565b5b60200260200101818152505080915050919050565b61132a8473ffffffffffffffffffffffffffffffffffffffff166114e3565b156114db578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b815260040161137095949392919061280f565b6020604051808303816000875af19250505080156113ac57506040513d601f19601f820116820180604052508101906113a991906125f9565b60015b611452576113b8612633565b806308c379a0141561141557506113cd612655565b806113d85750611417565b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161140c9190611799565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114499061275d565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146114d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114d0906127ef565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006115458261151a565b9050919050565b6115558161153a565b811461156057600080fd5b50565b6000813590506115728161154c565b92915050565b6000819050919050565b61158b81611578565b811461159657600080fd5b50565b6000813590506115a881611582565b92915050565b600080604083850312156115c5576115c4611510565b5b60006115d385828601611563565b92505060206115e485828601611599565b9150509250929050565b6115f781611578565b82525050565b600060208201905061161260008301846115ee565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61164d81611618565b811461165857600080fd5b50565b60008135905061166a81611644565b92915050565b60006020828403121561168657611685611510565b5b60006116948482850161165b565b91505092915050565b60008115159050919050565b6116b28161169d565b82525050565b60006020820190506116cd60008301846116a9565b92915050565b6000602082840312156116e9576116e8611510565b5b60006116f784828501611599565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561173a57808201518184015260208101905061171f565b83811115611749576000848401525b50505050565b6000601f19601f8301169050919050565b600061176b82611700565b611775818561170b565b935061178581856020860161171c565b61178e8161174f565b840191505092915050565b600060208201905081810360008301526117b38184611760565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6117f88261174f565b810181811067ffffffffffffffff82111715611817576118166117c0565b5b80604052505050565b600061182a611506565b905061183682826117ef565b919050565b600067ffffffffffffffff821115611856576118556117c0565b5b602082029050602081019050919050565b600080fd5b600061187f61187a8461183b565b611820565b905080838252602082019050602084028301858111156118a2576118a1611867565b5b835b818110156118cb57806118b78882611599565b8452602084019350506020810190506118a4565b5050509392505050565b600082601f8301126118ea576118e96117bb565b5b81356118fa84826020860161186c565b91505092915050565b600080fd5b600067ffffffffffffffff821115611923576119226117c0565b5b61192c8261174f565b9050602081019050919050565b82818337600083830152505050565b600061195b61195684611908565b611820565b90508281526020810184848401111561197757611976611903565b5b611982848285611939565b509392505050565b600082601f83011261199f5761199e6117bb565b5b81356119af848260208601611948565b91505092915050565b600080600080600060a086880312156119d4576119d3611510565b5b60006119e288828901611563565b95505060206119f388828901611563565b945050604086013567ffffffffffffffff811115611a1457611a13611515565b5b611a20888289016118d5565b935050606086013567ffffffffffffffff811115611a4157611a40611515565b5b611a4d888289016118d5565b925050608086013567ffffffffffffffff811115611a6e57611a6d611515565b5b611a7a8882890161198a565b9150509295509295909350565b600067ffffffffffffffff821115611aa257611aa16117c0565b5b602082029050602081019050919050565b6000611ac6611ac184611a87565b611820565b90508083825260208201905060208402830185811115611ae957611ae8611867565b5b835b81811015611b125780611afe8882611563565b845260208401935050602081019050611aeb565b5050509392505050565b600082601f830112611b3157611b306117bb565b5b8135611b41848260208601611ab3565b91505092915050565b60008060408385031215611b6157611b60611510565b5b600083013567ffffffffffffffff811115611b7f57611b7e611515565b5b611b8b85828601611b1c565b925050602083013567ffffffffffffffff811115611bac57611bab611515565b5b611bb8858286016118d5565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611bf781611578565b82525050565b6000611c098383611bee565b60208301905092915050565b6000602082019050919050565b6000611c2d82611bc2565b611c378185611bcd565b9350611c4283611bde565b8060005b83811015611c73578151611c5a8882611bfd565b9750611c6583611c15565b925050600181019050611c46565b5085935050505092915050565b60006020820190508181036000830152611c9a8184611c22565b905092915050565b600080600060608486031215611cbb57611cba611510565b5b6000611cc986828701611599565b9350506020611cda86828701611563565b9250506040611ceb86828701611599565b9150509250925092565b611cfe8161169d565b8114611d0957600080fd5b50565b600081359050611d1b81611cf5565b92915050565b60008060408385031215611d3857611d37611510565b5b6000611d4685828601611563565b9250506020611d5785828601611d0c565b9150509250929050565b60008060408385031215611d7857611d77611510565b5b6000611d8685828601611563565b9250506020611d9785828601611563565b9150509250929050565b600080600080600060a08688031215611dbd57611dbc611510565b5b6000611dcb88828901611563565b9550506020611ddc88828901611563565b9450506040611ded88828901611599565b9350506060611dfe88828901611599565b925050608086013567ffffffffffffffff811115611e1f57611e1e611515565b5b611e2b8882890161198a565b9150509295509295909350565b7f455243313135353a2062616c616e636520717565727920666f7220746865207a60008201527f65726f2061646472657373000000000000000000000000000000000000000000602082015250565b6000611e94602b8361170b565b9150611e9f82611e38565b604082019050919050565b60006020820190508181036000830152611ec381611e87565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611f1157607f821691505b60208210811415611f2557611f24611eca565b5b50919050565b7f455243313135353a207472616e736665722063616c6c6572206973206e6f742060008201527f6f776e6572206e6f7220617070726f7665640000000000000000000000000000602082015250565b6000611f8760328361170b565b9150611f9282611f2b565b604082019050919050565b60006020820190508181036000830152611fb681611f7a565b9050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b600061201960298361170b565b915061202482611fbd565b604082019050919050565b600060208201905081810360008301526120488161200c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006120b882611578565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156120eb576120ea61207e565b5b600182019050919050565b7f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260008201527f20617070726f7665640000000000000000000000000000000000000000000000602082015250565b600061215260298361170b565b915061215d826120f6565b604082019050919050565b6000602082019050818103600083015261218181612145565b9050919050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b60006121e460288361170b565b91506121ef82612188565b604082019050919050565b60006020820190508181036000830152612213816121d7565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b600061227660258361170b565b91506122818261221a565b604082019050919050565b600060208201905081810360008301526122a581612269565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b6000612308602a8361170b565b9150612313826122ac565b604082019050919050565b60006020820190508181036000830152612337816122fb565b9050919050565b600061234982611578565b915061235483611578565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156123895761238861207e565b5b828201905092915050565b600060408201905081810360008301526123ae8185611c22565b905081810360208301526123c28184611c22565b90509392505050565b7f455243313135353a206d696e7420746f20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b600061242760218361170b565b9150612432826123cb565b604082019050919050565b600060208201905081810360008301526124568161241a565b9050919050565b600060408201905061247260008301856115ee565b61247f60208301846115ee565b9392505050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b60006124e260298361170b565b91506124ed82612486565b604082019050919050565b60006020820190508181036000830152612511816124d5565b9050919050565b6125218161153a565b82525050565b600081519050919050565b600082825260208201905092915050565b600061254e82612527565b6125588185612532565b935061256881856020860161171c565b6125718161174f565b840191505092915050565b600060a0820190506125916000830188612518565b61259e6020830187612518565b81810360408301526125b08186611c22565b905081810360608301526125c48185611c22565b905081810360808301526125d88184612543565b90509695505050505050565b6000815190506125f381611644565b92915050565b60006020828403121561260f5761260e611510565b5b600061261d848285016125e4565b91505092915050565b60008160e01c9050919050565b600060033d11156126525760046000803e61264f600051612626565b90505b90565b600060443d1015612665576126e8565b61266d611506565b60043d036004823e80513d602482011167ffffffffffffffff821117156126955750506126e8565b808201805167ffffffffffffffff8111156126b357505050506126e8565b80602083010160043d0385018111156126d05750505050506126e8565b6126df826020018501866117ef565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b600061274760348361170b565b9150612752826126eb565b604082019050919050565b600060208201905081810360008301526127768161273a565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b60006127d960288361170b565b91506127e48261277d565b604082019050919050565b60006020820190508181036000830152612808816127cc565b9050919050565b600060a0820190506128246000830188612518565b6128316020830187612518565b61283e60408301866115ee565b61284b60608301856115ee565b818103608083015261285d8184612543565b9050969550505050505056fea2646970667358221220a8d62eecc5d65a3cbb042aa07525bd164d8b56a813c180658ba41c56c772769764736f6c634300080a0033";

type Basic1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Basic1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Basic1155__factory extends ContractFactory {
  constructor(...args: Basic1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Basic1155> {
    return super.deploy(overrides || {}) as Promise<Basic1155>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Basic1155 {
    return super.attach(address) as Basic1155;
  }
  override connect(signer: Signer): Basic1155__factory {
    return super.connect(signer) as Basic1155__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Basic1155Interface {
    return new utils.Interface(_abi) as Basic1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Basic1155 {
    return new Contract(address, _abi, signerOrProvider) as Basic1155;
  }
}
