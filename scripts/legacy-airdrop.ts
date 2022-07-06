
import { network, ethers } from "hardhat";

import { Basic1155, Core1155, AirdropValidator, MetadataRegistry } from "../typechain-types";
import {getLegacyPillsBalances} from "../utils/pills";
import { BigNumber } from "ethers";

import charDeploymant from "./deploy-args/char-mock-deployment.json"


const testAccounts = [
  "0x3aD353E2845B96fB1B58C1Ca6CdA46B870dE8D6f",
  "0x1425C88ce0780E5bcE5f405333C81f9336dC52eA",
  "0xe003644d10d4ac0e7651c288305bc593c3f62804",
  "0x0f1c01d98ae190ad2739a6075b21c2343d8b412e"
]

async function main() {

  let core: Core1155, nift: Basic1155, validator: AirdropValidator, receipt, registry: MetadataRegistry;
  const owner = (await ethers.getSigners())[0].address;
  const accounts = await ethers.getSigners();
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  core = await ethers.getContractAt("Core1155", charDeploymant.ArbRinkeby.Core1155) as Core1155;


  let pillIDs: BigNumber[] = [];
  for(let i = 0; i < testAccounts.length; i++) {
    const pills = await getLegacyPillsBalances(testAccounts[i], ethers.getDefaultProvider());
    pills.forEach(pill => {
      pillIDs.concat(pill.ids.map(id => BigNumber.from(id)));
    });
    const amounts = Array(pillIDs.length).fill(1);
    core.mintBatch(testAccounts[i], pillIDs, amounts, "");
    console.log("Minted", pillIDs.length, "pills for", testAccounts[i]);
  }

}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});


