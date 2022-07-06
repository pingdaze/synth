import { network, ethers } from "hardhat";
import { expect } from "chai";

import { Basic1155, Core1155, AirdropValidator, MetadataRegistry } from "../typechain-types";
import {
  zeroAddress,
} from "../test/shared/deploys";

const ids = [1,2,3,4,5,6];

async function main() {

  let core: Core1155, nift: Basic1155, validator: AirdropValidator, receipt;
  const owner = (await ethers.getSigners())[0].address;
  const accounts = await ethers.getSigners();
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
// This is horribly inneficient, probably don't redeploy these each time?
  // We get the contract to deploy
  const Registry = await ethers.getContractFactory("MetadataRegistry");
  const registry =  await Registry.connect(accounts[3]).deploy(zeroAddress) as MetadataRegistry;
  await registry.deployed();
  console.log("Registry deployed to " + registry.address);
  const Collectible = await ethers.getContractFactory("Core1155");
  core = await Collectible.connect(accounts[3]).deploy("https://ipfs.pills.host/", registry.address, zeroAddress) as Core1155;
  // In production instances the IDs must line up correctly
  const AirdropValidator = await ethers.getContractFactory("AirdropValidator");
  validator = await  AirdropValidator.connect(accounts[3]).deploy(core.address, ethers.constants.AddressZero) as AirdropValidator;
  const tx = await core.connect(accounts[3]).addValidator(validator.address, ids);
  console.log("Validator deployed to " + validator.address);
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});