/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { ethers } = require("hardhat");
import {SelectableOptions, WearablesValidator, AugmentsValidator} from "../typechain-types/";
import   {SKELETON_OPTIONS, SkeletonOption, Location, StepOption, STEP_OPTIONS_BY_TYPE } from "../data/airtable"

const pillToId: { [key:string]: number; kirbonite: number; shadowpak: number; ratspill: number} = {
  "kirbonite": 0xC,
  "shadowpak": 0xD,
  "ratspill": 0xB,
  "unipill":  0x4,
  "tubbypill":  0x0,
  "memricorn":  0x9,
  "mirrorpill":  0xE,
  "memfruit":  0x7,
  "memsnake":  0xA,
  "blitpill":  0x0,
  "synth_memwraith":  0x8,
  "0xpill":  0x0,
  "wassiepill":  0x0,
  "toadzpill":  0x0,
  "runnerpill":  0x0,
}


export async function pushOptions(optionsAddress: string, wearablesAddress: string, augmentsAddress: string){
  // Grab the signers so we can drop them test tokens
  let options = await ethers.getContractAt('SelectableOptions', optionsAddress) as SelectableOptions;
  let wearables = await ethers.getContractAt('WearablesValidator', wearablesAddress) as WearablesValidator;
  let augments = await ethers.getContractAt('AugmentsValidator', augmentsAddress) as AugmentsValidator;
  // optionID -- name -- slot -- form
  let processing = SKELETON_OPTIONS.map(processSkeletonOption(options, wearables, augments));
  await Promise.all(processing);
  console.log("Done processing skeleton options");
  processing = STEP_OPTIONS_BY_TYPE.Faction.map(processFactionOption(options, "Faction"));
  await Promise.all(processing);
  console.log("Done processing Faction options");
  processing = STEP_OPTIONS_BY_TYPE.Upbringing.map(processStepOption(options, "Upbringing"));
  await Promise.all(processing);
  console.log("Done processing Upbringing options");
  processing = STEP_OPTIONS_BY_TYPE.Gift.map(processStepOption(options, "Gift"));
  await Promise.all(processing);
  console.log("Done processing Gift options");
  processing = STEP_OPTIONS_BY_TYPE.Origin.map(processStepOption(options, "Origin"));
  await Promise.all(processing);
  console.log("Done processing Origin options");
  

}

function processStepOption(optionsContract: SelectableOptions, slot: string) { return async (option: StepOption) => {
  let receipt;
  receipt = await optionsContract.addOption(option.name, option.name, slot, 2);
  receipt.wait();
  if(option.prerequisite_type === "HAS TRAIT") {
    const id = await optionsContract.getOptionId(option.name);
    await optionsContract.setTraitRequirement(id, option.prerequisite_value!);
  } else if (option.prerequisite_type === "HAS NOT TRAIT") {
    const id = await optionsContract.getOptionId(option.name);
    await optionsContract.setNotTraitRequirement(id, option.prerequisite_value!);
  }
  
}}
function processFactionOption(optionsContract: SelectableOptions, slot: string) { return async (option: StepOption) => {
  let receipt;
  receipt = await optionsContract.addOption(option.name, option.name, slot, 2);
  receipt.wait();
  const id = await optionsContract.getOptionId(option.name);
  if(option.prerequisite_type === "HAS PILL") {
    const pillId = pillToId[option.prerequisite_value!];
    if(pillId !== 0x0)
      await optionsContract.setLegacyPillRequirement(id, pillId)
  }

}}

function processSkeletonOption(optionsContract: SelectableOptions, wearablesContract: WearablesValidator, augmentsContract: AugmentsValidator) { return async (option: SkeletonOption) => {
  let receipt;
  if(option._cid === null)
      return;
    let slot = "";
    if(option.skeleton === "marking"){
      slot = "Markings";
    } else if (option.location.includes(Location["Eyes"])){
      slot = "Eyes";
    } else if (option.location.includes(Location["Mouth"])){
      slot = "Mouth";
    } else if (option.category === "mask"){
      slot = "Mask";
    }

    if(slot !== "") {
      receipt = await optionsContract.addOption(option.uuid, option.name, slot, getFormUint(option.form));
      await receipt.wait();
    }
    if(option.prerequisite_type === "HAS TRAIT") {
      const id = await optionsContract.getOptionId(option.name);
      await optionsContract.setTraitRequirement(id, option.prerequisite_value!);
    }    
    else if (option.prerequisite_type === "HAS NOT TRAIT") {
      const id = await optionsContract.getOptionId(option.name);
      await optionsContract.setNotTraitRequirement(id, option.prerequisite_value!);
    } else if (option.prerequisite_type === "HAS ETH") {
      const id = await optionsContract.getOptionId(option.name);
      await optionsContract.setEthRequirement(id, ethers.utils.parseEther(option.prerequisite_value!));      
    } else if (option.prerequisite_type === "HAS PILL") {
      const id = await optionsContract.getOptionId(option.name);
      const pillId = pillToId[option.prerequisite_value!];
      console.log(`Setting ${option.name} to require ${option.prerequisite_value} ID: ${pillId}`);
      if(pillId && pillId !== 0x0) {
        await optionsContract.setLegacyPillRequirement(id, pillId)
      }
    }
    const rarity = option.rarity ? getRarityUint(option.rarity): 0
    const form = getFormUint(option.form);
    const slotUint = getSlotUint(option.location);
    if(option.skeleton === "base") {
      receipt = await augmentsContract.addAugment(0, slotUint, form, rarity );
      await receipt.wait();
    } else if (option.skeleton === "wearable") {
      receipt = await wearablesContract.addWearable(0, slotUint, form, rarity );
      await receipt.wait();
    }
} }

function getFormUint(form: string){
  switch(form){
    case "hashmonk":
      return 0;
    case "pepel":
      return 1;
    case "universal":
      return 2;
  }
  return 2;
}

function getRarityUint(rarity: string){
  switch(rarity){
    case "Standard":
      return 0;
    case "Synth":
      return 1;
    case "Egodeth":
      return 2;
    case "Pillboost":
      return 3;
    case "Special":
      return 4;
  }
  return 0;
}

function getSlotUint(location: string[]){
  let slotUint = 0;
  location.forEach(slot => {
    switch(slot){
      case "head":
        slotUint += 1;
        break;
      case "torso":
        slotUint += 2;
        break;
      case "left-arm":
        slotUint += 4;
        break;
      case "right-arm":
        slotUint += 8;
        break;
      case "left-leg":
        slotUint += 16;
        break;
      case "right-leg":
        slotUint += 32;
        break;
      case "floating":
        slotUint += 64;
        break;
      case "mouth":
        slotUint += 128;
        break;
      case "eyes":
        slotUint += 256;
        break;
      case "marking":
        slotUint += 512;
        break;
      case "mask":
        slotUint += 1024;
        break;
    }
  });
  return slotUint;
}

