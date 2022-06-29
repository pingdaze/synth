import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import {CharacterValidator, WearablesValidator, SelectableOptions, Core1155, Core721, AugmentsValidator, Characters} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"


async function main() {

  let core721 : Core721;
  let core1155 : Core1155;
  let characterValidator: CharacterValidator;
  let wearablesValidator: WearablesValidator;
  let augmentsValidator: AugmentsValidator;
  let character: Characters;
  let receipt, owner;
  let options: SelectableOptions;
  owner = (await ethers.getSigners())[0].address;
  console.log("owner", owner);
  const balance = await ethers.provider.getBalance(owner);
  console.log("Owner balance: ", ethers.utils.formatEther(balance));
  console.log("Network: " + network.name);
  core721 = await ethers.getContractAt('Core721', charDeploymant.ArbRinkeby.Core721) as Core721;
  core1155 = await ethers.getContractAt('Core1155', charDeploymant.ArbRinkeby.Core1155) as Core1155;
  characterValidator = await ethers.getContractAt('CharacterValidator', charDeploymant.ArbRinkeby.CharacterValidator) as CharacterValidator;
  wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.ArbRinkeby.WearablesValidator) as WearablesValidator;
  augmentsValidator = await ethers.getContractAt('AugmentsValidator', charDeploymant.ArbRinkeby.AugmentsValidator) as AugmentsValidator;
  character = await ethers.getContractAt('Characters', charDeploymant.ArbRinkeby.Characters) as Characters;
  options = await ethers.getContractAt('SelectableOptions', charDeploymant.ArbRinkeby.SelectableOptions) as SelectableOptions;
  if(network.name === "arbrinkeby" ) {
    await options.addOption("lime", "lime", "Type", 1, {gasPrice: 10000000000});
    console.log("Option Added");     
    const legacyPills: number[] = [0, 0, 0, 0, 0];
    const collabPills: number[] = [];
    const traitsplus: string[] = [
      "Hashmonk",
      "Aateos",
      "Interstellar Nomad",
      "Diamond Hands",
      "None",
      "bafybeiap7phjnmfjicslxtfaulye6bhdxovwnnomfazxllh4steeytv6ey",
      "bafybeid3ng4tq3nyzwzwemyt2ju3djvkw2c5wanfx4rr23aqgvjkt3rzni",
      "bafybeibat3eowgbdsx3dzciq335h6lxkdpobb4guplyymy5oqxl4hdbryy",
      "bafybeigahfafrfgdaaoqcsql3b2gz34zsppgjj6pbmnyb36vpn4y64vhjq",
      "bafybeiabtufdf7g54zcg7o4kqazasoqth4qxr2ivqutt6t2j5445znynje",
      "bafybeihx37wpm2bins2zltikjsikgjcgepboqub7yumydleelddospkswi",
      "arctic",
      "bafybeih7il4wy626fvsk7fzm74noo7d5awppo6smfwpcmmy3uaf7t3q7iq",
      "bafybeiab7wr5ynymlxqx4ja2kc4t5lnqne37aifcsihyz4qclazimdm3kq"
    ] as string[];
    receipt = await characterValidator.createCharacter(
      legacyPills,
      collabPills,
      traitsplus,
      {gasPrice: 10000000000}
    );
  }
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});