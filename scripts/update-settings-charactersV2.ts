import { network, ethers } from "hardhat";
import { MetadataRegistry, CharacterValidatorV2 } from "../typechain-types";
import { deployRegistry } from "../test/shared/deploys";
import charDeploymant from "./deploy-args/char-mock-deployment.json"


async function main() {

  const accounts = await ethers.getSigners();
  let charactersValidator : CharacterValidatorV2;
  let registry : MetadataRegistry;
  let owner;
  owner = (await ethers.getSigners())[0].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  registry = await deployRegistry() as MetadataRegistry;
  charactersValidator = await ethers.getContractAt('CharacterValidatorV2', charDeploymant.ArbMainnet.CharacterValidator) as CharacterValidatorV2;
  let core = charDeploymant.ArbMainnet.Core721;
  let options = charDeploymant.ArbMainnet.SelectableOptions;
  let wearables = charDeploymant.ArbMainnet.WearablesValidator;
  let character = charDeploymant.ArbMainnet.CharactersV2;
  let charPerCall = 100;
  let collabPills = charDeploymant.ArbMainnet.Core1155;
  let legacyPills = charDeploymant.ArbMainnet.Core1155;
  let portalPill = charDeploymant.ArbMainnet.PortalCore;
  await charactersValidator.connect(accounts[3]).settings(
    core,
    options,
    wearables,
    character,
    charPerCall,
    collabPills,
    legacyPills,
    portalPill
  );
  console.log("Registry address: ", registry.address);
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});