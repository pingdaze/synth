import { network, ethers } from "hardhat";
import {BalanceHook} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"


async function main() {

  let hook : BalanceHook;
  let owner;
  owner = (await ethers.getSigners())[0].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  hook = await ethers.getContractAt('BalanceHook', charDeploymant.ArbGorli.BalanceHook) as BalanceHook;
  console.log(await hook.getTokens(owner));
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});