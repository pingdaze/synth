import { network, ethers } from "hardhat";
import { Core721 } from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"


async function main() {

  let core721 : Core721;
  let owner;
  owner = (await ethers.getSigners())[0].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  core721 = await ethers.getContractAt('Core721', charDeploymant.ArbRinkeby.Core721) as Core721;
  await core721.setBaseURI(`https://image.pills.host/api/v0/characters/metadata/`);
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});