import { network, ethers } from "hardhat";
import { expect } from "chai";

import { Basic1155, Core1155, AirdropValidator, MetadataRegistry } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  deployAirdropValidator,
  deployCore1155,
  deployRegistry,
  zeroAddress,
} from "../test/shared/deploys";

import charDeploymant from "./deploy-args/char-mock-deployment.json"


import data from "../data/PILLSx Airdrop - THE LIST.json"
const ids = [1,2,3,4,5,6];

const projectToId: { [key:string]: number} = {
  "chainrunners": 0x1,
  "0xmons": 0x2,
  "cryptoadz": 0x3,
  "blitmap": 0x4,
  "blitnauts": 0x4,
  "wassies": 0x5,
  "tubbycats": 0x6,
}
const pillToId: { [key:string]: number} = {
  "runnerpill": 0x1,
  "0xpill": 0x2,
  "toadzpill": 0x3,
  "blitpill": 0x4,
  "wassiepill": 0x5,
  "tubbypill": 0x6,
}

type dropInfo = {
  address: string,
  amount: number
}
async function main() {

  let core: Core1155, nift: Basic1155, validator: AirdropValidator, receipt, registry: MetadataRegistry;
  const owner = (await ethers.getSigners())[0].address;
  const accounts = await ethers.getSigners();
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network);
  registry =  await ethers.getContractAt("MetadataRegistry", charDeploymant.ArbGorli.Registry) as MetadataRegistry;
  core =  await ethers.getContractAt("Core1155", charDeploymant.ArbGorli.Core1155) as Core1155;
  validator = await ethers.getContractAt("AirdropValidator", charDeploymant.ArbGorli.AirdropValidator) as AirdropValidator;
  let runnersDrop: dropInfo[] = [];
  let oxDrop: dropInfo[] = [];
  let toadzDrop: dropInfo[] = [];
  let blitDrop: dropInfo[] = [];
  let wassieDrop: dropInfo[] = [];
  let tubbyDrop: dropInfo[] = [];
  const metadata = ["QmaM3P9vYiXQX1rNFFJ2fat17q86SCQR8ixFTbWQaWoX1r","QmQtgUMAqjAD2JrN1VEMoUKv4wYAgcs4h1yFFwXLrNVMVP","QmYbThwj2rWwZ2GgGm9Wg27BE23e495azXZrDSj9X9Mctd","Qmee3nukSthSn6ehckxVwG6XXiCQGZNfNtAxHLkFMajbm7","QmX1HMcGCGjeWKrCEdkLzwbiRNwTBYjKAMXSWVDCza1ZD3", "QmfQhVJFwXmk7amnsWRwAqcDqXRtDLYm8yRb3qj1DARwsU" ];


  data.forEach(element => {
    if (element.Project.toLowerCase() === "chainRunnersxr" || element.Project.toLowerCase() === "chainrunners") {
      runnersDrop.push({address: element.Address, amount: parseInt(element["Eligible Tokens"])})
    } else if (element.Project.toLowerCase() === "0xmons") {
      oxDrop.push({address: element.Address, amount: parseInt(element["Eligible Tokens"])})
    }  else if (element.Project.toLowerCase() === "cryptoadz") {
      toadzDrop.push({address: element.Address, amount: parseInt(element["Eligible Tokens"])})
    }  else if (element.Project.toLowerCase() === "blitnauts" || element.Project.toLowerCase() === "blitmap") {
      blitDrop.push({address: element.Address, amount: parseInt(element["Eligible Tokens"])})
    }  else if (element.Project.toLowerCase() === "wassies") {
      wassieDrop.push({address: element.Address, amount: parseInt(element["Eligible Tokens"])})
    }  else if (element.Project.toLowerCase() === "tubbycats") {
      tubbyDrop.push({address: element.Address, amount: parseInt(element["Eligible Tokens"])})
    }
  });
  
  receipt = await validator.connect(accounts[3]).drop(runnersDrop.map((element) => element.address), runnersDrop.map(element => element.amount), 0x1);
  receipt = await receipt.wait();
  receipt = await registry.connect(accounts[3]).set(1, metadata[0]);
  receipt = await receipt.wait();
  console.log(`Dropped ${runnersDrop.length} runners`);
  console.log(oxDrop.length);

  receipt = await validator.connect(accounts[3]).drop(oxDrop.map((element) => element.address), oxDrop.map(element => element.amount), 0x2);
  receipt = await receipt.wait();
  receipt = await registry.connect(accounts[3]).set(2, metadata[1]);
  receipt = await receipt.wait();
  console.log(`Dropped ${oxDrop.length} ox`);

  receipt = await validator.connect(accounts[3]).drop(toadzDrop.map((element) => element.address), toadzDrop.map(element => element.amount), 0x3);
  receipt = await receipt.wait();
  receipt = await registry.connect(accounts[3]).set(3, metadata[2]);
  receipt = await receipt.wait();
  console.log(`Dropped ${toadzDrop.length} toadz`);

  receipt = await validator.connect(accounts[3]).drop(blitDrop.map((element) => element.address), blitDrop.map(element => element.amount), 0x4);
  receipt = await receipt.wait();
  receipt = await registry.connect(accounts[3]).set(4, metadata[3]);
  receipt = await receipt.wait();
  console.log(`Dropped ${blitDrop.length} blit`);

  receipt = await validator.connect(accounts[3]).drop(wassieDrop.map((element) => element.address), wassieDrop.map(element => element.amount), 0x5);
  receipt = await receipt.wait();
  receipt = await registry.connect(accounts[3]).set(5, metadata[4]);
  receipt = await receipt.wait();
  console.log(`Dropped ${wassieDrop.length} wassie`); 
  
  
  
  receipt = await validator.connect(accounts[3]).drop(tubbyDrop.map((element) => element.address), tubbyDrop.map(element => element.amount), 0x6);
  receipt = await receipt.wait();
  receipt = await registry.connect(accounts[3]).set(6, metadata[5]);
  receipt = await receipt.wait();
  console.log(`Dropped ${tubbyDrop.length} tubby`);

}



  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});