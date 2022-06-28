

import { network, ethers } from "hardhat";
import charDeploymant from "./deploy-args/char-mock-deployment.json"

import {
  WearablesValidator,
  SelectableOptions,
  AugmentsValidator,
} from "../typechain-types";


// Replace magic numbers

async function main() {
  // Protect from doing some dumb shit on mainnet
  if(network.name === "mainnet" || network.name === "arbmainnet") {
    return;
  }
  let wearablesValidator: WearablesValidator;
  let augmentsValidator: AugmentsValidator;



  let options: SelectableOptions;

  let owner: string;
  // TODO: Turn this into a cute lil' reusable function
  console.log("Network: " + network.name);
  owner = (await ethers.getSigners())[0].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  if(network.name === "arbrinkeby") {
    options = await ethers.getContractAt('SelectableOptions', charDeploymant.ArbRinkeby.SelectableOptions) as SelectableOptions;
    console.log("SelectableOptions address: ", options.address);
    wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.ArbRinkeby.WearablesValidator) as WearablesValidator;  
    console.log("WearablesValidator address: ", wearablesValidator.address);
    augmentsValidator = await ethers.getContractAt('AugmentsValidator', charDeploymant.ArbRinkeby.AugmentsValidator) as AugmentsValidator;
    console.log("AugmentsValidator address: ", augmentsValidator.address);
    console.log(await options.getOption("bafybeih7il4wy626fvsk7fzm74noo7d5awppo6smfwpcmmy3uaf7t3q7iq"))
  }
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });