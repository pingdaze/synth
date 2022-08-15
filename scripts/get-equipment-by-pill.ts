import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import { WearablesValidator } from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"
import { BigNumber } from "ethers";


const pillIDs =  Array.from({length: 14}, (v, k) => k);
const pillNames = [
  "genesis",
  "payback pill",
  "prodpill",
  "unipill",
  "hypepill",
  "rektpill",
  "memfruit",
  "synth_memwraith",
  "memricorn",
  "memsnake",
  "ratspill",
  "kirbonite",
  "shadowpak",
  "mirrorpill"
]

// Replace magic numbers
async function main() {
  let owner: SignerWithAddress, user1: SignerWithAddress;
  [owner, user1] = await ethers.getSigners();

  let wearablesValidator: WearablesValidator;
  console.log("Current Network: " + network.name);

  console.log("Testing deploy to " + network.name);
  //await deployToTestnet();
  [owner, user1] = await ethers.getSigners();
  console.log("Signing as " + owner.address);
  wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.ArbRinkeby.WearablesValidator) as WearablesValidator;
  for(let i = 1; i < pillIDs.length; i++) {
    const cid = await wearablesValidator.getEquipmentFromPill(BigNumber.from(pillIDs[i]), 1);
    console.log(`Pills ID ${pillIDs[i]} ${pillNames[i -1]}  CIDs: ${cid}`);
  }
    
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});