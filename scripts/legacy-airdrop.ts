
import { network, ethers } from "hardhat";

import { Basic1155, Core1155, AirdropValidator, MetadataRegistry } from "../typechain-types";
import {getLegacyPillsBalances} from "../utils/pills";
import { BigNumber } from "ethers";

import charDeploymant from "./deploy-args/char-mock-deployment.json"


const testAccounts = [
  "0x3aD353E2845B96fB1B58C1Ca6CdA46B870dE8D6f",
  "0x1425C88ce0780E5bcE5f405333C81f9336dC52eA",
  "0xe003644d10d4ac0e7651c288305bc593c3f62804",
  "0x0f1c01d98ae190ad2739a6075b21c2343d8b412e",
  "0xc6665eb39d2106fb1DBE54bf19190F82FD535c19",
  "0x053E2aD328147a438d2B136637a213E068200fC7"
]

const collabIds = [ 0x1, 0x2, 0x3, 0x4, 0x5, 0x6 ];
const collabAmounts = [10, 10, 10, 10, 10, 10]

async function main() {

  let core: Core1155, nift: Basic1155, validator: AirdropValidator, receipt, registry: MetadataRegistry;
  const owner = (await ethers.getSigners())[0].address;
  const accounts = await ethers.getSigners();
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  core = await ethers.getContractAt("Core1155", charDeploymant.ArbRinkeby.Pills1155) as Core1155;


  let pillIDs: BigNumber[] = [];
  for(let i = 0; i < testAccounts.length; i++) {
    const pills = await getLegacyPillsBalances(testAccounts[i], ethers.getDefaultProvider('mainnet'));
    console.log(pills);
    pills.forEach(pill => {
      pillIDs = pillIDs.concat(pill.ids.map(id => BigNumber.from(id)));
    });
    const amounts = Array(pillIDs.length).fill(1);
    await core.mintBatch("0x0f1C01d98AE190Ad2739a6075B21C2343d8b412e", pillIDs, amounts, ethers.constants.HashZero);
    console.log("Minted", pillIDs.length, "pills for", testAccounts[i]);
  }
  console.log("Core1155 deployed to " + core.address);
  await core.mintBatch("0x0f1C01d98AE190Ad2739a6075B21C2343d8b412e", collabIds, collabAmounts, ethers.constants.HashZero);

}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});


