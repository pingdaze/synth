/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { ethers } = require("hardhat");
import {SelectableOptions, WearablesValidator, AugmentsValidator} from "../typechain-types/";
import   {SKELETON_OPTIONS, SkeletonOption, Location, StepOption, STEP_OPTIONS_BY_TYPE } from "../data/airtable"
import { BigNumber } from "ethers";

const pillToId: { [key:string]: number} = {
  "genesis": 0x1,
  "payback pill": 0x2,
  "prodpill": 0x3,
  "unipill":  0x4,
  "hypepill":  0x5,
  "rektpill":  0x6,
  "memfruit":  0x7,
  "synth_memwraith":  0x8,
  "memricorn":  0x9,
  "memsnake":  0xA,
  "ratspill": 0xB,
  "kirbonite": 0xC,
  "shadowpak": 0xD,
  "mirrorpill":  0xE,
  "runnerpill":  0x1,
  "0xpill":  0x2,
  "toadzpill":  0x3,
  "blitpill":  0x4,
  "wassiepill":  0x5,
  "tubbypill":  0x6,
}

const projectToId: { [key:string]: number} = {
  "chainrunners": 0x1,
  "0xmons": 0x2,
  "cryptoadz": 0x3,
  "blitmap": 0x4,
  "blitnauts": 0x4,
  "wassies": 0x5,
  "tubbycats": 0x6,
}

const nameToId: { [key:string]: number} = {
  "Pepelian Head": 1,
  "Pepelian Torso": 2,
  "Pepelian Left Arm": 3,
  "Pepelian Right Arm": 4,
  "Pepelian Left Leg": 5,
  "Pepelian Right Leg": 6,
  "Pepelian Mouth": 7,
  "Pepelian Eye": 8,
  "Pepelian Color": 9,
  "Pepelian Marking": 10,
  "Unadorned": 11
}

const pepelColors  = [
  "blue",
  "dark",
  "deepgreen",
  "lime",
  "orange",
  "pale",
  "yellow"
]

const hashmonkColors  = [
  "arctic",
  "coral",
  "shadowmarked",
  "sunstrider",
  "tropic"
]

export async function refreshCIDs(optionsAddress: string, wearablesAddress: string, augmentsAddress: string, index: number = 0){
  // Grab the signers so we can drop them test tokens
  let options = await ethers.getContractAt('SelectableOptions', optionsAddress) as SelectableOptions;
  let wearables = await ethers.getContractAt('WearablesValidator', wearablesAddress) as WearablesValidator;
  let augments = await ethers.getContractAt('AugmentsValidator', augmentsAddress) as AugmentsValidator;
  for(let i = index; i< SKELETON_OPTIONS.length; i++) {
    const option = SKELETON_OPTIONS[i];
    await processCIDs(options, wearables, augments)(option);
    console.log(`Processed:${i}#${option.name}`);
  }
}
export async function pushOptions(optionsAddress: string, wearablesAddress: string, augmentsAddress: string, index: number = 0){
  // Grab the signers so we can drop them test tokens
  let options = await ethers.getContractAt('SelectableOptions', optionsAddress) as SelectableOptions;
  let wearables = await ethers.getContractAt('WearablesValidator', wearablesAddress) as WearablesValidator;
  let augments = await ethers.getContractAt('AugmentsValidator', augmentsAddress) as AugmentsValidator;
  // optionID -- name -- slot -- form
  // let processing = SKELETON_OPTIONS.map(processSkeletonOption(options, wearables, augments));
  // await Promise.all(processing);
  for(let i = index; i< SKELETON_OPTIONS.length; i++) {
    const option = SKELETON_OPTIONS[i];
    await processSkeletonOption(options, wearables, augments)(option);
    console.log(`Processed:${i}#${option.name}`);
  }
  //console.log("Done processing skeleton options");

  // processing = STEP_OPTIONS_BY_TYPE.Faction.map(processFactionOption(options, "Faction"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Faction) {
    await processFactionOption(options, "Faction")(option);
    //console.log(`Added ${option.name}`);
  }
  //console.log("Done processing Faction options");
  
  // processing = STEP_OPTIONS_BY_TYPE.Upbringing.map(processStepOption(options, "Upbringing"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Upbringing) {
    await processStepOption(options, "Upbringing")(option);
    //console.log(`Added ${option.name}`);
  }
  //console.log("Done processing Upbringing options");
  
  // processing = STEP_OPTIONS_BY_TYPE.Gift.map(processStepOption(options, "Gift"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Gift) {
    await processStepOption(options, "Gift")(option);
    //console.log(`Added ${option.name}`);
  }
  //console.log("Done processing Gift options");
  
  // processing = STEP_OPTIONS_BY_TYPE.Origin.map(processStepOption(options, "Origin"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Origin) {
    await processStepOption(options, "Origin")(option);
    //console.log(`Added ${option.name}`);
  }
  //console.log("Done processing Origin options");
 for(let color of pepelColors) {
    await options.addOption(color, color, "Type", 1);
    //console.log(`Added ${color}`);
   };
   for(let color of hashmonkColors) {
    await options.addOption(color, color, "Type", 0);
    //console.log(`Added ${color}`);
  };
}

function processStepOption(optionsContract: SelectableOptions, slot: string) { return async (option: StepOption) => {
  let receipt;
  receipt = await optionsContract.addOption(option.name, option.name, slot, 2);
  receipt.wait();
  if(option.prerequisite_type === "HAS TRAIT") {
    const id = await optionsContract.getOptionId(option.name);
    receipt = await optionsContract.setTraitRequirement(id, option.prerequisite_value!);
    receipt.wait();
  } else if (option.prerequisite_type === "HAS NOT TRAIT") {
    const id = await optionsContract.getOptionId(option.name);
    receipt = await optionsContract.setNotTraitRequirement(id, option.prerequisite_value!);
    receipt.wait();
  }
  
}}
function processFactionOption(optionsContract: SelectableOptions, slot: string) { return async (option: StepOption) => {
  let receipt;
  receipt = await optionsContract.addOption(option.name, option.name, slot, 2);
  receipt.wait();
  const id = await optionsContract.getOptionId(option.name);
  if(option.prerequisite_type === "HAS PILL") {
    const pillId = pillToId[option.prerequisite_value!];
    if(pillId !== 0x0) {
      receipt = await optionsContract.setLegacyPillRequirement(id, pillId)
      receipt.wait();
    }
  }

}}

function processCIDs(optionsContract: SelectableOptions, wearablesContract: WearablesValidator, augmentsContract: AugmentsValidator) { return async (option: SkeletonOption) => {
  if(option.cid === null) {
    return;
  }
  let receipt;
  const id = (await optionsContract.getOptionId(option.cid!)).toNumber();
  if(id !== 0) {
    if(option.skeleton === "base" || option.skeleton === "marking") {
      if((await augmentsContract.cid(id)) == '') {
        receipt = await augmentsContract.setCID(id, option.cid!);
        await receipt.wait();
        console.log(`Added ${option.name} with id ${id} to Augments with CID: ${option.cid}`);
      }
    } else if (option.skeleton === "wearable") {
      if((await augmentsContract.cid(id)) == '') {
        receipt = await wearablesContract.setCID(id, option.cid!)
        await receipt.wait();
        // console.log(`Added ${option.name} with id ${id}  to Wearables with CID: ${option.cid}`);
      }
    }
  }
  else {
    console.log(`Could not find id for ${option.name}`);
  }
}}

function processSkeletonOption(optionsContract: SelectableOptions, wearablesContract: WearablesValidator, augmentsContract: AugmentsValidator) { return async (option: SkeletonOption) => {
  let receipt;
  if(option.cid === null || (await optionsContract.getOptionId(option.cid!)).toNumber() !== 0) {
      return;
  }
  let slot = "";
  if(option.skeleton === "marking"){
    slot = "Markings";
  } else if (option.location.includes(Location["Head"])){
    slot = "Head";
  } else if (option.location.includes(Location["Torso"])){
    slot = "Torso";
  } else if (option.location.includes(Location["LeftArm"])){
    slot = "LeftArm";
  } else if (option.location.includes(Location["RightArm"])){
    slot = "RightArm";
  } else if (option.location.includes(Location["LeftLeg"])){
    slot = "LeftLeg";
  } else if (option.location.includes(Location["RightLeg"])){
    slot = "RightLeg";
  } else if (option.location.includes(Location["Mouth"])){
    slot = "Mouth";
  } else if (option.location.includes(Location["Eyes"])){
    slot = "Eyes";
  } else if (option.location.includes(Location["Crown"])){
    slot = "Crown";
  } else if (option.category === "mask"){
    slot = "Mask";
  }

  if(slot !== "") {
    if((option.name.includes("Pepelian") || option.name.includes("Unadorned")) && !option.name.includes("Mutagenic")) {
      //console.log(`Adding \nName:${option.name} \nCID:${option.cid}`);
      receipt = await optionsContract.addOptionWithId(option.cid!, nameToId[option.name], option.name, slot, getFormUint(option.form));
      console.log(`Added \nName:${option.name} \nCID:${option.cid}`);
      const tx = await receipt.wait();
    } else {
      receipt = await optionsContract.addOption(option.cid!, option.name, slot, getFormUint(option.form));
      await receipt.wait();
    }
    const id = await optionsContract.getOptionId(option.cid!);
    if(option.name.includes("Pepelian") && !option.name.includes("Mutagenic")) {
    }
    await receipt.wait();
    if(option.skeleton === "base" || option.skeleton === "marking") {
      receipt = await augmentsContract.setCID(id, option.cid!);
      await receipt.wait();
      console.log(`Added ${option.name} with id ${id} to Augments with CID: ${option.cid}`);
    } else if (option.skeleton === "wearable") {
      receipt = await wearablesContract.setCID(id, option.cid!)
      await receipt.wait();
      //console.log(`Added ${option.name} with id ${id}  to Wearables with CID: ${option.cid}`);
    }
    //console.log(`Added ${option.name} to ${slot}`);
    if(option.prerequisite_type === "HAS TRAIT") {
      receipt = await optionsContract.setTraitRequirement(id, option.prerequisite_value!);
      await receipt.wait();
      //console.log(`Set ${option.name} to have trait ${option.prerequisite_value}`);
    }    
    else if (option.prerequisite_type === "HAS NOT TRAIT") {
      const id = await optionsContract.getOptionId(option.cid!);
      receipt = await optionsContract.setNotTraitRequirement(id, option.prerequisite_value!);
      await receipt.wait();
      //console.log(`Set ${option.name} to have not trait ${option.prerequisite_value}`);
    } else if (option.prerequisite_type === "HAS ETH") {
      const id = await optionsContract.getOptionId(option.cid!);
      receipt = await optionsContract.setEthRequirement(id, ethers.utils.parseEther(option.prerequisite_value!));      
      await receipt.wait();
      // console.log(`Set ${option.name}:${id} to have ETH ${option.prerequisite_value}`);
    } else if (option.prerequisite_type === "HAS PILL") {
      const id = await optionsContract.getOptionId(option.cid!);
      const pillId = pillToId[option.prerequisite_value!];
      //console.log(`Setting ${option.name} to require ${option.prerequisite_value} ID: ${pillId}`);
      if(option.skeleton === "wearable" && pillId ) {
        //console.log(`Setting ${option.name} to require ${option.prerequisite_value} ID: ${pillId}`);
        await wearablesContract.setLegacyPill(BigNumber.from(pillId), option.cid!);
      }
      if(pillId && pillId !== 0x0) {
        receipt = await optionsContract.setLegacyPillRequirement(id, pillId)
        await receipt.wait();
        //console.log(`Set ${option.name} to require ${option.prerequisite_value}`);
      }
    }
    const rarity = option.rarity ? getRarityUint(option.rarity): 0
    const form = getFormUint(option.form);
    const slotUint = getSlotUint(option.location);
    if(option.skeleton === "base") {
      receipt = await augmentsContract.addAugment(0, slotUint, form, rarity );
      await receipt.wait();
      //console.log(`Added ${option.name} to augments`);
    } else if (option.skeleton === "wearable") {
      receipt = await wearablesContract.addWearable(0, slotUint, form, rarity );
      await receipt.wait();
      //console.log(`Added ${option.name} to wearables`);
    }
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
      case "crown":
        slotUint += 1024;
        break;
    }
  });
  return slotUint;
}

