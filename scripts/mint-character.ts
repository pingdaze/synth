import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
import {CharacterValidator, WearablesValidator, SelectableOptions, Core1155, Core721, AugmentsValidator, Characters} from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"

const mockShadowPaktPill = ethers.BigNumber.from(
  "0xD00000000000000940000000000000001"
);
const mockKirbonitePill = ethers.BigNumber.from(
  "0xC00000000000000650000000000000001"
);
const BigZero = ethers.BigNumber.from("0");

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

    let legacyPills: BigNumber[] = [
      BigZero,
      BigZero,
      BigZero,
      BigZero,
      BigZero,
    ];
    let collabPills: BigNumber[] = [
      BigZero,
      BigZero,
      BigZero,
      BigZero,
      BigZero,
    ];
    let traitsplus: string[] = [
      "Pepel",
      "Aateos",
      "Doomskroler",
      "Galaxy Brain",
      "Yearn",
      "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
      "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
      "lime",
      "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
    ] as string[];
    receipt = await characterValidator.createCharacter(
      legacyPills,
      collabPills,
      traitsplus,
      {gasPrice: 10000000000}
    );
    console.log("Character minted: ", receipt.hash);
    legacyPills = [
      BigZero,
      BigZero,
      BigZero,
      BigZero,
      BigZero,
    ];
    collabPills = [
      BigZero,
      BigZero,
      BigZero,
      BigZero,
      BigZero,
    ];
    traitsplus = [
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
    console.log("Character minted: ", receipt.hash);
  }
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});