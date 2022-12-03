import { network, ethers } from "hardhat";

import { Basic1155, Core1155, AirdropValidator, MetadataRegistry } from "../typechain-types";


import charDeploymant from "./deploy-args/char-mock-deployment.json"


import data from "../data/portal-pills.json"

async function main() {

  let core: Core1155, nift: Basic1155, validator: AirdropValidator, receipt, registry: MetadataRegistry;
  const owner = (await ethers.getSigners())[0].address;
  const accounts = await ethers.getSigners();
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network);
  core =  await ethers.getContractAt("Core1155", charDeploymant.ArbGorli.Core1155) as Core1155;
  validator = await ethers.getContractAt("AirdropValidator", charDeploymant.ArbGorli.AirdropValidator) as AirdropValidator;


  
  receipt = await validator.connect(accounts[3]).drop(data.map((element) => element.address), data.map(element => element.amount), 0x1);
  receipt = await receipt.wait();
  console.log(`Dropped portal pills to ${data.length} accounts`);
  console.log("Gas used: ", receipt.gasUsed.toString());
  
}



  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});