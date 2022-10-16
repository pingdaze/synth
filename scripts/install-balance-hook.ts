import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import {BalanceHook, Core721} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"


async function main() {
  const coreIds = Array.from(Array(10).keys());

  let core721 : Core721;
  let hook : BalanceHook;
  let receipt, owner, Hook;
  owner = (await ethers.getSigners())[0].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  core721 = await ethers.getContractAt('Core721', charDeploymant.ArbGorli.Core721) as Core721;
  if(network.name === "arbgorli" ) {
    Hook = await ethers.getContractFactory('BalanceHook');
    hook = await Hook.deploy() as BalanceHook;    
    await core721.addTransferHook(charDeploymant.ArbGorli.BalanceHook, coreIds);
  }
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});