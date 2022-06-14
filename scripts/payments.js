/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { artifacts, web3, network, ethers } = require("hardhat");
import {deployPaymentValidator} from "../test/shared";
import {PaymentValidator} from "../typechain-types/";

async function main() {
    // Grab the signers so we can drop them test tokens
    console.log("Current Network: " + network.name);

    if(network.name === "ropsten" || network.name === "rinkeby" ) {
      console.log("Testing deploy to " + network.name);
      //await deployToTestnet();
      await deployMockToTestnet();
    }
    const cost = ethers.utils.parseEther(".1");
    if(network.name === "mainnet") {
      const accounts = await ethers.getSigners();
      console.log(accounts[3]);
      const coreAddress = "0xA16891897378a82E9F0ad44A705B292C9753538C";
      validator = await deployPaymentValidator(core, coreId, cost);
      const Core = await ethers.getContractFactory("Core1155");
      const core = await Core.attach(coreAddress);
      const tx = await core.addValidator(validator.address, [coreId]);
    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });