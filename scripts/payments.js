/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { artifacts, web3, network, ethers } = require("hardhat");
const {deployPaymentValidator} = require("../test/shared/deploys.ts");
const {PaymentValidator} = require("../typechain-types/");

async function main() {
    // Grab the signers so we can drop them test tokens
    console.log("Current Network: " + network.name);

    if(network.name === "ropsten" || network.name === "rinkeby" ) {
      console.log("Testing deploy to " + network.name);
      //await deployToTestnet();
      await deployMockToTestnet();
    }
    const cost = ethers.utils.parseEther(".1");
    const coreId = 2;
    if(network.name === "mainnet") {
      const accounts = await ethers.getSigners();
      console.log(accounts[3]);
      const coreAddress = "0xA16891897378a82E9F0ad44A705B292C9753538C";
      const Core = await ethers.getContractFactory("Core");
      const core = await Core.attach(coreAddress);
      const uri = await core.uri(1);
      console.log("URI", uri);
      validator = await deployPaymentValidator(core, coreId, cost);
      const tx = await core.addValidator(validator.address, [coreId]);
      const registryAddress = "0xD820C86445a831174767458501C315f526AC3197";
      const MetadataRegistry = await ethers.getContractFactory("MetadataRegistry");
      const metadata = "Qmbd4EZ29Xhrg8xxFvL4mVaCLZ1tAzXB45DL4B8jBDfG4G";
      const registry = await MetadataRegistry.attach(registryAddress);
      tx = await registry.set(1, metadata, {gasPrice: 225000000000});
    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });