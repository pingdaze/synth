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
      const paymentsAddress = "0x1a3A2074c60d89E7B638FE76eE2FECFA6c1E57ee";
      const Payments = await ethers.getContractFactory("PaymentValidator");
      const payments = await Payments.attach(paymentsAddress);

      const tx = await payments.connect(accounts[3]).directSale("0x0f1C01d98AE190Ad2739a6075B21C2343d8b412e", 1, {value: cost});
    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });