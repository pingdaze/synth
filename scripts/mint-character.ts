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
  let legacy : Core1155;
  let characterValidator: CharacterValidator;
  let wearablesValidator: WearablesValidator;
  let augmentsValidator: AugmentsValidator;
  let character: Characters;
  let receipt, owner;
  let options: SelectableOptions;
  owner = (await ethers.getSigners())[0].address;
  const mockShadowPaktPill = ethers.BigNumber.from(
    "0xD00000000000000940000000000000001"
  );
  const mockKirbonitePill = ethers.BigNumber.from(
    "0xC00000000000000650000000000000001"
  );
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
  legacy = await ethers.getContractAt("Core1155", charDeploymant.ArbRinkeby.Pills1155) as Core1155;

  options = await ethers.getContractAt('SelectableOptions', charDeploymant.ArbRinkeby.SelectableOptions) as SelectableOptions;
  if(network.name === "arbrinkeby" ) {   
    if(await legacy.isApprovedForAll(owner, character.address) == false) {
      console.log("Approving legacy contract for owner");
      await legacy.setApprovalForAll(character.address, true);
      console.log("Approved legacy contract for owner");

    }

    let legacyPills: BigNumber[] = [
      BigZero,
      BigZero,
      BigZero,
      BigZero,
      BigZero,
      // BigNumber.from("57896044618658097711785492504343953927315557066662158947172050052883968688129"),
      // BigNumber.from("57896044618658097711785492504343953929016968901266851264415136113747971538945"),
      // BigNumber.from("57896044618658097711785492504343953927315557066662158946876902147704615862273"),
      // BigNumber.from("57896044618658097711785492504343953927315557066662158946710881451041229897729"),
      // BigNumber.from("57896044618658097711785492504343953926975274699741220483893142886189295992833"),
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
      "Interstellar Nomad",
      "Diamond Hands",
      "None",
      "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
      "bafybeicdchpng53briinhnrqq54ozr2vmyd7cvwu2wndtcz4sfiugdvyxm",
      "lime",
      "bafybeigog5ba76nro55k5wqheqduolkswxg35f3zm7zzi3kt7qqa62c6ny",
    ] as string[];
    // receipt = await characterValidator.createCharacter(
    //   legacyPills,
    //   collabPills,
    //   traitsplus,
    //   {gasPrice: 10000000000}
    // );
    // console.log("Character minted: ", receipt.hash);
    await legacy.mintBatch(owner, [mockShadowPaktPill, mockKirbonitePill], [1, 1], ethers.constants.HashZero);
    await legacy.setApprovalForAll(characterValidator.address, true);
    legacyPills = [
      BigZero,
      BigZero,
      BigZero,
      mockKirbonitePill,
      mockShadowPaktPill,
      // BigNumber.from("57896044618658097711785492504343953929016968901266851264415136113747971538945"),
      // BigNumber.from("57896044618658097711785492504343953927315557066662158946876902147704615862273"),
      // BigNumber.from("57896044618658097711785492504343953927315557066662158946710881451041229897729"),
      // BigNumber.from("57896044618658097711785492504343953926975274699741220483893142886189295992833"),
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
      "Patcher",
      "Diamond Hands",
      "None",
      "bafybeiffkfo5hqskknmwb7r3zuz6iqdf3zcscvfmli4z64opkufki4udh4", // head
      "bafybeigv7y7cvlgr3z4f7oabtyzi5vk74fcqjzfulwsdoi6h4beqlbhgp4", // torso
      "bafybeic6vuf2l6ouwg5xnzvi4zqff4ov6woqlhj54urrhatfjunmobsuxm", // larm
      "bafybeiefwn32qzxqyewiadmcx4au2tuexh7pp26wfdl4uf336po7cczn2i", // rarm
      "bafybeig5tb5rxqof5zxp2bolr5dqxhjwc7fqgprng2wc2zu5zhzncxhw5u", // lleg
      "bafybeich2xydybqqxx53sucuswdohm4764boxcqqxywkf27frtnc5f2vr4", // rleg
      "arctic", // color
      "bafybeiauxnajd2vno6dtkbr64qnksjolfoolj7sgiiz6w5aguc3gfrdsqe", // crown
      "bafybeiab7wr5ynymlxqx4ja2kc4t5lnqne37aifcsihyz4qclazimdm3kq", // mask
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