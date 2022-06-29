/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { artifacts, web3, network, ethers } = require("hardhat");
const { waitForDebugger } = require("inspector");

//import { assert } from "chai";
//const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
//const Collectible = artifacts.require("Core1155.sol");
//const BasicValidator = artifacts.require("BasicValidator.sol");
//const HolderContract = artifacts.require("CollectibleHolder.sol");
//const Registry = artifacts.require("MetadataRegistry.sol");
//const Basic1155 = artifacts.require("Basic1155.sol");

//const zeroAddress = "0x0000000000000000000000000000000000000000";
const legacyAddress = "0x33a4cfc925ad40e5bb2b9b2462d7a1a5a5da4476";
//const toBN = (x) => web3.utils.toBN(x);

async function deployToTestnet() {
  const accounts = await ethers.getSigners();
  // We get the contract to deploy
  const Core = await ethers.getContractFactory("Core");
  const Nift = await ethers.getContractFactory("Basic1155");
  const CheckerValidator = await ethers.getContractFactory("CheckerValidator");
  const AuctionValidator = await ethers.getContractFactory("AuctionValidator");
  const Registry = await ethers.getContractFactory("MetadataRegistry");
  const registry = await Registry.deploy();
  const nift = await Nift.deploy();
  const core = await Core.deploy("", registry.address);
  const claim = await CheckerValidator.deploy(core.address, nift.address, 1, {gasPrice: 225000000000});
  const auction = await AuctionValidator.deploy(core.address, {gasPrice: 225000000000});
  
  // Log some information about the deployed contracts
  console.log("Core deployed to:", core.address);
  console.log("Token deployed to:", nift.address);
  console.log("Claim deployed to:", claim.address);
  console.log("Auction deployed to:", auction.address);

}

async function printAllSigners() {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
}

async function deployMockToTestnet() {
  // We get the contract to deploy
  const CharacterGenMock = await ethers.getContractFactory("CharacterGenMock");
  const mock = await CharacterGenMock.deploy();
  // Log some information about the deployed contracts
  console.log("Mock deployed to:", mock.address);
  return mock;
}

async function deployCoreToMainnet(registry) {
  // We get the contract to deploy
  const Core = await ethers.getContractFactory("Core");
  const core = await Core.deploy("", registry);
  // Log some information about the deployed contracts
  console.log("Core deployed to:", core.address);
  return core;
}

async function deployRegistryToMainnet() {
  // We get the contract to deploy
  const Registry = await ethers.getContractFactory("MetadataRegistry");
  const registry = await Registry.deploy();
  // Log some information about the deployed contracts
  console.log("Registry deployed to:", registry.address);
  return registry;
}

async function deployCheckerValidatorToMainnet(address) {
  // We get the contract to deploy
  const Validator = await ethers.getContractFactory("CheckerValidator");
  const validator = await Validator.deploy(address, legacyAddress, 1);
  // Log some information about the deployed contracts
  console.log("Validator deployed to:", validator.address);
}
async function deployCheckerValidatorToMainnet(address) {
  // We get the contract to deploy
  const Validator = await ethers.getContractFactory("CheckerValidator");
  const validator = await Validator.deploy(address, legacyAddress, 1);
  // Log some information about the deployed contracts
  console.log("Validator deployed to:", validator.address);
}

async function main() {
    // Grab the signers so we can drop them test tokens
    console.log("Current Network: " + network.name);

    if(network.name === "ropsten" || network.name === "rinkeby" ) {
      console.log("Testing deploy to " + network.name);
      //await deployToTestnet();
      await deployMockToTestnet();
    }

    if(network.name === "mainnet") {
      const accounts = await ethers.getSigners();
      console.log(accounts[3]);
      //const registry = await deployRegistryToMainnet();
      //const registryAddress = "0xD820C86445a831174767458501C315f526AC3197";
      
      //const core = await deployCoreToMainnet(registryAddress, {gasPrice: 125000000000});
      const coreAddress = "0xA16891897378a82E9F0ad44A705B292C9753538C";
      //await deployValidatorToMainnet(coreAddress, {gasPrice: 125000000000});
      const Core = await ethers.getContractFactory("Core1155");
      const core = await Core.attach(coreAddress);
      await core.connect(accounts[3]).mintBatch("0x0f1C01d98AE190Ad2739a6075B21C2343d8b412e", [1], [200], 0x0);
      /*const validatorAddress = "0xe934340Ce8DF26494CDf5aeC0bE83d6F42868c73"
      let tx = await core.addValidator(validatorAddress, [1], {gasPrice: 225000000000});
      const rx = tx.wait();
      console.log("Response: " + rx);
      */
      //tx = await core.transferOwnership("0x38B8b00ec79f43E3Ec9b8142F32ea2210D2A7aff");
      //const MetadataRegistry = await ethers.getContractFactory("MetadataRegistry");
      //const registry = await MetadataRegistry.attach(registryAddress);
      //validator.connect(user1).claimAuction(1);

      //tx = await registry.set(1, metadata, {gasPrice: 225000000000});
      //tx = await registry.transferOwnership("0x38B8b00ec79f43E3Ec9b8142F32ea2210D2A7aff");

    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });