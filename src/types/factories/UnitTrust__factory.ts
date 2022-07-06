/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { UnitTrust, UnitTrustInterface } from "../UnitTrust";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "closeUnitTrust",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "fundWithdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_investor",
        type: "address",
      },
    ],
    name: "getInvestor",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "salePrice",
            type: "uint256",
          },
          {
            internalType: "uint16",
            name: "ownedUnits",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "saleUnits",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "authorized",
            type: "bool",
          },
        ],
        internalType: "struct Investor",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRemainingUnits",
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
    name: "getTotalUnits",
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
    name: "getUnitPrice",
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
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "investorWithdraw",
    outputs: [],
    stateMutability: "payable",
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
        internalType: "uint16",
        name: "_amount",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "_salePrice",
        type: "uint256",
      },
    ],
    name: "postUnit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_amount",
        type: "uint16",
      },
    ],
    name: "purchaseUnit",
    outputs: [],
    stateMutability: "payable",
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
        name: "_seller",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "_amount",
        type: "uint16",
      },
    ],
    name: "transferUnit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1681525034801561004357600080fd5b50608051612cd361007b600039600081816105ed0152818161067c015281816108a00152818161092f01526109df0152612cd36000f3fe6080604052600436106100fe5760003560e01c8063715018a61161009557806393e4a0ca1161006457806393e4a0ca146102b1578063a754a702146102dc578063cc57733d14610307578063e6febc9b14610323578063f2fde38b1461033f576100fe565b8063715018a61461021b5780638129fc1c146102325780638da5cb5b146102495780638f35a75e14610274576100fe565b80634ab53c24116100d15780634ab53c241461018f5780634f1ef286146101ab57806352d1902d146101c7578063587de58b146101f2576100fe565b8063012a33aa14610103578063242a37e81461012e578063243f63371461014a5780633659cfe614610166575b600080fd5b34801561010f57600080fd5b50610118610368565b6040516101259190611be1565b60405180910390f35b61014860048036038101906101439190611c4a565b610375565b005b610164600480360381019061015f9190611ca3565b6104f4565b005b34801561017257600080fd5b5061018d60048036038101906101889190611d2e565b6105eb565b005b6101a960048036038101906101a49190611ca3565b610774565b005b6101c560048036038101906101c09190611ea1565b61089e565b005b3480156101d357600080fd5b506101dc6109db565b6040516101e99190611f16565b60405180910390f35b3480156101fe57600080fd5b5061021960048036038101906102149190611f31565b610a94565b005b34801561022757600080fd5b50610230610cc4565b005b34801561023e57600080fd5b50610247610d4c565b005b34801561025557600080fd5b5061025e610e1b565b60405161026b9190611f80565b60405180910390f35b34801561028057600080fd5b5061029b60048036038101906102969190611d2e565b610e45565b6040516102a8919061203c565b60405180910390f35b3480156102bd57600080fd5b506102c6610f10565b6040516102d39190611be1565b60405180910390f35b3480156102e857600080fd5b506102f1610f1d565b6040516102fe9190611be1565b60405180910390f35b610321600480360381019061031c9190612057565b610f2a565b005b61033d60048036038101906103389190611ca3565b6111f7565b005b34801561034b57600080fd5b5061036660048036038101906103619190611d2e565b611325565b005b600060c960010154905090565b8061ffff1660c96002015410156103c1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103b8906120f4565b60405180910390fd5b60c960030154670de0b6b3a76400008261ffff166103df9190612157565b67ffffffffffffffff166103f39190612199565b3414610434576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042b9061223b565b60405180910390fd5b8060c960050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008282829054906101000a900461ffff16610496919061225b565b92506101000a81548161ffff021916908361ffff1602179055508061ffff1660c960020160008282546104c99190612293565b9250508190555060c96003015460c960040160008282546104ea9190612199565b9250508190555050565b6104fc61141d565b73ffffffffffffffffffffffffffffffffffffffff1661051a610e1b565b73ffffffffffffffffffffffffffffffffffffffff1614610570576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161056790612313565b60405180910390fd5b600060c9600201549050600060c9600201819055503373ffffffffffffffffffffffffffffffffffffffff166108fc8260c9600001546105b09190612293565b846105bb9190612333565b9081150290604051600060405180830381858888f193505050501580156105e6573d6000803e3d6000fd5b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16141561067a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610671906123ff565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166106b9611425565b73ffffffffffffffffffffffffffffffffffffffff161461070f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070690612491565b60405180910390fd5b6107188161147c565b61077181600067ffffffffffffffff81111561073757610736611d76565b5b6040519080825280601f01601f1916602001820160405280156107695781602001600182028036833780820191505090505b5060006114fb565b50565b61077c61141d565b73ffffffffffffffffffffffffffffffffffffffff1661079a610e1b565b73ffffffffffffffffffffffffffffffffffffffff16146107f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e790612313565b60405180910390fd5b8060c9600401541015610838576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082f906124fd565b60405180910390fd5b8060c9600401600082825461084d9190612293565b925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561089a573d6000803e3d6000fd5b5050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16141561092d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610924906123ff565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1661096c611425565b73ffffffffffffffffffffffffffffffffffffffff16146109c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109b990612491565b60405180910390fd5b6109cb8261147c565b6109d7828260016114fb565b5050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610a6b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a629061258f565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b8161ffff1660c960050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900461ffff1661ffff161015610b32576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b29906125fb565b60405180910390fd5b8161ffff1660c9600201541015610b7e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b75906120f4565b60405180910390fd5b8160c960050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008282829054906101000a900461ffff16610be0919061261b565b92506101000a81548161ffff021916908361ffff1602179055508160c960050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160028282829054906101000a900461ffff16610c5c919061225b565b92506101000a81548161ffff021916908361ffff1602179055508060c960050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055505050565b610ccc61141d565b73ffffffffffffffffffffffffffffffffffffffff16610cea610e1b565b73ffffffffffffffffffffffffffffffffffffffff1614610d40576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3790612313565b60405180910390fd5b610d4a6000611669565b565b6000610d58600161172f565b90508015610d7c576001600060016101000a81548160ff0219169083151502179055505b610d8461181f565b6103e860c9600001819055506103e860c960020181905550670de0b6b3a764000060c960010181905550662386f26fc1000060c9600301819055508015610e185760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024986001604051610e0f91906126a1565b60405180910390a15b50565b6000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610e4d611b8f565b60c960050160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060a001604052908160008201548152602001600182015481526020016002820160009054906101000a900461ffff1661ffff1661ffff1681526020016002820160029054906101000a900461ffff1661ffff1661ffff1681526020016002820160049054906101000a900460ff1615151515815250509050919050565b600060c960020154905090565b600060c960000154905090565b60c96003015460c960050160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101548261ffff16610f859190612333565b610f8f9190612199565b3414610fd0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fc79061223b565b60405180910390fd5b8061ffff1660c960050160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160029054906101000a900461ffff1661ffff16101561106e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106590612708565b60405180910390fd5b60c9600301543461107f9190612293565b60c960050160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282546110d39190612199565b925050819055508060c960050160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160028282829054906101000a900461ffff1661113c919061261b565b92506101000a81548161ffff021916908361ffff1602179055508060c960050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008282829054906101000a900461ffff166111b8919061225b565b92506101000a81548161ffff021916908361ffff16021790555060c96003015460c960040160008282546111ec9190612199565b925050819055505050565b8060c960050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154101561127f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611276906124fd565b60405180910390fd5b8060c960050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282546112d49190612293565b925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015611321573d6000803e3d6000fd5b5050565b61132d61141d565b73ffffffffffffffffffffffffffffffffffffffff1661134b610e1b565b73ffffffffffffffffffffffffffffffffffffffff16146113a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161139890612313565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611411576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114089061279a565b60405180910390fd5b61141a81611669565b50565b600033905090565b60006114537f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b611878565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61148461141d565b73ffffffffffffffffffffffffffffffffffffffff166114a2610e1b565b73ffffffffffffffffffffffffffffffffffffffff16146114f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114ef90612313565b60405180910390fd5b50565b6115277f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b611882565b60000160009054906101000a900460ff161561154b576115468361188c565b611664565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156115b357506040513d601f19601f820116820180604052508101906115b091906127e6565b60015b6115f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115e990612885565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b8114611657576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161164e90612917565b60405180910390fd5b50611663838383611945565b5b505050565b6000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081609760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008060019054906101000a900460ff16156117a65760018260ff1614801561175e575061175c30611971565b155b61179d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611794906129a9565b60405180910390fd5b6000905061181a565b8160ff1660008054906101000a900460ff1660ff16106117fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117f2906129a9565b60405180910390fd5b816000806101000a81548160ff021916908360ff160217905550600190505b919050565b600060019054906101000a900460ff1661186e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161186590612a3b565b60405180910390fd5b611876611994565b565b6000819050919050565b6000819050919050565b61189581611971565b6118d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118cb90612acd565b60405180910390fd5b806119017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b611878565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b61194e836119f5565b60008251118061195b5750805b1561196c5761196a8383611a44565b505b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff166119e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119da90612a3b565b60405180910390fd5b6119f36119ee61141d565b611669565b565b6119fe8161188c565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b6060611a4f83611971565b611a8e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a8590612b5f565b60405180910390fd5b6000808473ffffffffffffffffffffffffffffffffffffffff1684604051611ab69190612bf9565b600060405180830381855af49150503d8060008114611af1576040519150601f19603f3d011682016040523d82523d6000602084013e611af6565b606091505b5091509150611b1e8282604051806060016040528060278152602001612c7760279139611b28565b9250505092915050565b60608315611b3857829050611b88565b600083511115611b4b5782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b7f9190612c54565b60405180910390fd5b9392505050565b6040518060a001604052806000815260200160008152602001600061ffff168152602001600061ffff1681526020016000151581525090565b6000819050919050565b611bdb81611bc8565b82525050565b6000602082019050611bf66000830184611bd2565b92915050565b6000604051905090565b600080fd5b600080fd5b600061ffff82169050919050565b611c2781611c10565b8114611c3257600080fd5b50565b600081359050611c4481611c1e565b92915050565b600060208284031215611c6057611c5f611c06565b5b6000611c6e84828501611c35565b91505092915050565b611c8081611bc8565b8114611c8b57600080fd5b50565b600081359050611c9d81611c77565b92915050565b600060208284031215611cb957611cb8611c06565b5b6000611cc784828501611c8e565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611cfb82611cd0565b9050919050565b611d0b81611cf0565b8114611d1657600080fd5b50565b600081359050611d2881611d02565b92915050565b600060208284031215611d4457611d43611c06565b5b6000611d5284828501611d19565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611dae82611d65565b810181811067ffffffffffffffff82111715611dcd57611dcc611d76565b5b80604052505050565b6000611de0611bfc565b9050611dec8282611da5565b919050565b600067ffffffffffffffff821115611e0c57611e0b611d76565b5b611e1582611d65565b9050602081019050919050565b82818337600083830152505050565b6000611e44611e3f84611df1565b611dd6565b905082815260208101848484011115611e6057611e5f611d60565b5b611e6b848285611e22565b509392505050565b600082601f830112611e8857611e87611d5b565b5b8135611e98848260208601611e31565b91505092915050565b60008060408385031215611eb857611eb7611c06565b5b6000611ec685828601611d19565b925050602083013567ffffffffffffffff811115611ee757611ee6611c0b565b5b611ef385828601611e73565b9150509250929050565b6000819050919050565b611f1081611efd565b82525050565b6000602082019050611f2b6000830184611f07565b92915050565b60008060408385031215611f4857611f47611c06565b5b6000611f5685828601611c35565b9250506020611f6785828601611c8e565b9150509250929050565b611f7a81611cf0565b82525050565b6000602082019050611f956000830184611f71565b92915050565b611fa481611bc8565b82525050565b611fb381611c10565b82525050565b60008115159050919050565b611fce81611fb9565b82525050565b60a082016000820151611fea6000850182611f9b565b506020820151611ffd6020850182611f9b565b5060408201516120106040850182611faa565b5060608201516120236060850182611faa565b5060808201516120366080850182611fc5565b50505050565b600060a0820190506120516000830184611fd4565b92915050565b6000806040838503121561206e5761206d611c06565b5b600061207c85828601611d19565b925050602061208d85828601611c35565b9150509250929050565b600082825260208201905092915050565b7f4e6f20656e6f75676820756e6974730000000000000000000000000000000000600082015250565b60006120de600f83612097565b91506120e9826120a8565b602082019050919050565b6000602082019050818103600083015261210d816120d1565b9050919050565b600067ffffffffffffffff82169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061216282612114565b915061216d83612114565b92508167ffffffffffffffff048311821515161561218e5761218d612128565b5b828202905092915050565b60006121a482611bc8565b91506121af83611bc8565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156121e4576121e3612128565b5b828201905092915050565b7f496e636f727265637420616d6f756e742073656e740000000000000000000000600082015250565b6000612225601583612097565b9150612230826121ef565b602082019050919050565b6000602082019050818103600083015261225481612218565b9050919050565b600061226682611c10565b915061227183611c10565b92508261ffff0382111561228857612287612128565b5b828201905092915050565b600061229e82611bc8565b91506122a983611bc8565b9250828210156122bc576122bb612128565b5b828203905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006122fd602083612097565b9150612308826122c7565b602082019050919050565b6000602082019050818103600083015261232c816122f0565b9050919050565b600061233e82611bc8565b915061234983611bc8565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561238257612381612128565b5b828202905092915050565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f64656c656761746563616c6c0000000000000000000000000000000000000000602082015250565b60006123e9602c83612097565b91506123f48261238d565b604082019050919050565b60006020820190508181036000830152612418816123dc565b9050919050565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f6163746976652070726f78790000000000000000000000000000000000000000602082015250565b600061247b602c83612097565b91506124868261241f565b604082019050919050565b600060208201905081810360008301526124aa8161246e565b9050919050565b7f4e6f7420656e6f7567682066756e647300000000000000000000000000000000600082015250565b60006124e7601083612097565b91506124f2826124b1565b602082019050919050565b60006020820190508181036000830152612516816124da565b9050919050565b7f555550535570677261646561626c653a206d757374206e6f742062652063616c60008201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000602082015250565b6000612579603883612097565b91506125848261251d565b604082019050919050565b600060208201905081810360008301526125a88161256c565b9050919050565b7f4e6f7420656e6f75676820756e69747300000000000000000000000000000000600082015250565b60006125e5601083612097565b91506125f0826125af565b602082019050919050565b60006020820190508181036000830152612614816125d8565b9050919050565b600061262682611c10565b915061263183611c10565b92508282101561264457612643612128565b5b828203905092915050565b6000819050919050565b600060ff82169050919050565b6000819050919050565b600061268b6126866126818461264f565b612666565b612659565b9050919050565b61269b81612670565b82525050565b60006020820190506126b66000830184612692565b92915050565b7f4e6f7420656e6f75676820756e69747320666f722073616c6500000000000000600082015250565b60006126f2601983612097565b91506126fd826126bc565b602082019050919050565b60006020820190508181036000830152612721816126e5565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612784602683612097565b915061278f82612728565b604082019050919050565b600060208201905081810360008301526127b381612777565b9050919050565b6127c381611efd565b81146127ce57600080fd5b50565b6000815190506127e0816127ba565b92915050565b6000602082840312156127fc576127fb611c06565b5b600061280a848285016127d1565b91505092915050565b7f45524331393637557067726164653a206e657720696d706c656d656e7461746960008201527f6f6e206973206e6f742055555053000000000000000000000000000000000000602082015250565b600061286f602e83612097565b915061287a82612813565b604082019050919050565b6000602082019050818103600083015261289e81612862565b9050919050565b7f45524331393637557067726164653a20756e737570706f727465642070726f7860008201527f6961626c65555549440000000000000000000000000000000000000000000000602082015250565b6000612901602983612097565b915061290c826128a5565b604082019050919050565b60006020820190508181036000830152612930816128f4565b9050919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000612993602e83612097565b915061299e82612937565b604082019050919050565b600060208201905081810360008301526129c281612986565b9050919050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b6000612a25602b83612097565b9150612a30826129c9565b604082019050919050565b60006020820190508181036000830152612a5481612a18565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b6000612ab7602d83612097565b9150612ac282612a5b565b604082019050919050565b60006020820190508181036000830152612ae681612aaa565b9050919050565b7f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f60008201527f6e74726163740000000000000000000000000000000000000000000000000000602082015250565b6000612b49602683612097565b9150612b5482612aed565b604082019050919050565b60006020820190508181036000830152612b7881612b3c565b9050919050565b600081519050919050565b600081905092915050565b60005b83811015612bb3578082015181840152602081019050612b98565b83811115612bc2576000848401525b50505050565b6000612bd382612b7f565b612bdd8185612b8a565b9350612bed818560208601612b95565b80840191505092915050565b6000612c058284612bc8565b915081905092915050565b600081519050919050565b6000612c2682612c10565b612c308185612097565b9350612c40818560208601612b95565b612c4981611d65565b840191505092915050565b60006020820190508181036000830152612c6e8184612c1b565b90509291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212200d99d96272c68e06edee2d900f87d1fc447f51defb388859117974f72f4aa32e64736f6c634300080a0033";

export class UnitTrust__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UnitTrust> {
    return super.deploy(overrides || {}) as Promise<UnitTrust>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): UnitTrust {
    return super.attach(address) as UnitTrust;
  }
  connect(signer: Signer): UnitTrust__factory {
    return super.connect(signer) as UnitTrust__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UnitTrustInterface {
    return new utils.Interface(_abi) as UnitTrustInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UnitTrust {
    return new Contract(address, _abi, signerOrProvider) as UnitTrust;
  }
}
