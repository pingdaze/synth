import { network, ethers } from "hardhat";
import { MetadataRegistry, Core721 } from "../typechain-types";
import { deployRegistry } from "../test/shared/deploys";
import charDeploymant from "./deploy-args/char-mock-deployment.json"


async function main() {

  let core721 : Core721;
  let registry : MetadataRegistry;
  let owner;
  owner = (await ethers.getSigners())[0].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  registry = await deployRegistry() as MetadataRegistry;
  core721 = await ethers.getContractAt('Core721', charDeploymant.ArbGorli.Core721) as Core721;
  core721.setNewRegistry(registry.address);
  console.log("Registry address: ", registry.address);
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});