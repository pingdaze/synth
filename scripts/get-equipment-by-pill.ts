import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import { WearablesValidator } from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"
import { BigNumber } from "ethers";


const pillIDs =  Array.from({length: 14}, (v, k) => k);
const legacyPillToId: { [key:string]: string} = {
  "genesis": "0x80000000000000000000000000000001000000000000000d0000000000000001",
  "payback pill": "0x80000000000000000000000000000002000000000000000c0000000000000001",
  "prodpill": "0x8000000000000000000000000000000300000000000000000000000000000003",
  "unipill": "0x80000000000000000000000000000004000000000000000c0000000000000001",
  "hypepill":  "0x8000000000000000000000000000000500000000000000040000000000000001",
  "rektpill":  "0x80000000000000000000000000000006000000000000002a0000000000000001",
  "memfruit":  "0x80000000000000000000000000000007000000000000000d0000000000000001",
  "synth_memwraith":  "0x80000000000000000000000000000008000000000000000d0000000000000001",
  "memricorn": "0x80000000000000000000000000000009000000000000000d0000000000000001",
  "memsnake":  "0x8000000000000000000000000000000a000000000000000d0000000000000001",
  "ratspill": "0x8000000000000000000000000000000b00000000000000110000000000000001",
  "egodeth_ratspill": "0x8000000000000000000000000000000b00000000000000030000000000000001",
  "kirbonite": "0x8000000000000000000000000000000c000000000000000d0000000000000001",
  "shadowpak": "0x8000000000000000000000000000000d000000000000000d0000000000000001",
  "mirrorpill":  "0x8000000000000000000000000000000e000000000000000d0000000000000001"
}
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
  wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.ArbGorli.WearablesValidator) as WearablesValidator;
  for(const pill in legacyPillToId) {
    const cid = await wearablesValidator.getEquipmentFromPill(BigNumber.from(legacyPillToId[pill]), 1);
    console.log(`Pills ID ${legacyPillToId[pill]} ${pill}  CIDs: ${cid}`);
  }
    
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});