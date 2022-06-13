/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { artifacts, web3, network, ethers } = require("hardhat");
const { waitForDebugger } = require("inspector");


const legacyAddress = "0x33a4cfc925ad40e5bb2b9b2462d7a1a5a5da4476";
//const toBN = (x) => web3.utils.toBN(x);

async function deployToTestnet() {
  const accounts = await ethers.getSigners();
  // We get the contract to deploy
  const Core = await ethers.getContractFactory("Core1155");
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


async function main() {
    // Grab the signers so we can drop them test tokens
    console.log("Current Network: " + network.name);

    if(network.name === "ropsten" || network.name === "rinkeby" ) {
      console.log("Testing deploy to " + network.name);
      await deployToTestnet();
    }

    if(network.name === "mainnet") {

    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });