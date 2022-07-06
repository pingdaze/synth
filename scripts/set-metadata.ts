import { network, ethers } from "hardhat";
import { MetadataRegistry, Core721 } from "../typechain-types";
import { deployRegistry } from "../test/shared/deploys";
import charDeploymant from "./deploy-args/char-mock-deployment.json"


async function main() {

  let registry : MetadataRegistry;
  let owner;
  const accounts = await ethers.getSigners();

  owner = (await ethers.getSigners())[0].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  registry = await ethers.getContractAt("MetadataRegistry", charDeploymant.ArbMainnet.Registry) as MetadataRegistry;
  const receipt = await registry.connect(accounts[3]).set(6, "QmfQhVJFwXmk7amnsWRwAqcDqXRtDLYm8yRb3qj1DARwsU");

  console.log("Registry address: ", registry.address);
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});