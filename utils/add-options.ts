/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { ethers } = require("hardhat");
import {SelectableOptions, WearablesValidator, AugmentsValidator} from "../typechain-types/";
import   {SKELETON_OPTIONS, SkeletonOption, Location, StepOption, STEP_OPTIONS_BY_TYPE } from "../data/airtable"
import { BigNumber } from "ethers";



const locationToId: { [key:string]: number} = {
  "head": 1,
  "torso": 2,
  "left-arm": 3,
  "right-arm": 4,
  "left-leg": 5,
  "right-leg": 6,
  "eyes": 8,
  "crown": 11
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
let usedCIDs: string[] = [];

export async function refreshCIDs(optionsAddress: string, wearablesAddress: string, augmentsAddress: string, index: number = 0){
  // Grab the signers so we can drop them test tokens
  let options = await ethers.getContractAt('SelectableOptions', optionsAddress) as SelectableOptions;
  let wearables = await ethers.getContractAt('WearablesValidator', wearablesAddress) as WearablesValidator;
  let augments = await ethers.getContractAt('AugmentsValidator', augmentsAddress) as AugmentsValidator;
  for(let i = index; i< SKELETON_OPTIONS.length; i++) {
    const option = SKELETON_OPTIONS[i];
    await processCIDs(options, wearables, augments)(option);
    // console.log(`Processed:${i}#${option.name}`);
  }
}
export async function pushOptions(optionsAddress: string, wearablesAddress: string, augmentsAddress: string, index: number = 0){
  // Grab the signers so we can drop them test tokens
  let options = await ethers.getContractAt('SelectableOptions', optionsAddress) as SelectableOptions;
  let wearables = await ethers.getContractAt('WearablesValidator', wearablesAddress) as WearablesValidator;
  let augments = await ethers.getContractAt('AugmentsValidator', augmentsAddress) as AugmentsValidator;


  // processing = STEP_OPTIONS_BY_TYPE.Faction.map(processFactionOption(options, "Faction"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Faction) {
    await processFactionOption(options, "Faction")(option);
    console.log(`Added ${option.name}`);
  }
  console.log("Done processing Faction options");
  
  // processing = STEP_OPTIONS_BY_TYPE.Upbringing.map(processStepOption(options, "Upbringing"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Upbringing) {
    await processStepOption(options, "Upbringing")(option);
    console.log(`Added ${option.name}`);
  }
  console.log("Done processing Upbringing options");
  
  // processing = STEP_OPTIONS_BY_TYPE.Gift.map(processStepOption(options, "Gift"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Gift) {
    await processStepOption(options, "Gift")(option);
    console.log(`Added ${option.name}`);
  }
  console.log("Done processing Gift options");
  
  // processing = STEP_OPTIONS_BY_TYPE.Origin.map(processStepOption(options, "Origin"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Origin) {
    await processStepOption(options, "Origin")(option);
    console.log(`Added ${option.name}`);
  }
  console.log("Done processing Origin options");
 for(let color of pepelColors) {
    await options.addOption(color, color, "Type", 1);
    console.log(`Added ${color}`);
   };
   for(let color of hashmonkColors) {
    await options.addOption(color, color, "Type", 0);
    console.log(`Added ${color}`);
  };

  // optionID -- name -- slot -- form
  // let processing = SKELETON_OPTIONS.map(processSkeletonOption(options, wearables, augments));
  // await Promise.all(processing);
  for(let i = index; i< SKELETON_OPTIONS.length; i++) {
    const option = SKELETON_OPTIONS[i];
    await processSkeletonOption(options, wearables, augments)(option);
    console.log(`Processed:${i}#${option.name}`);
  }
  console.log("Done processing skeleton options");
}

function processStepOption(optionsContract: SelectableOptions, slot: string) { return async (option: StepOption) => {
  let id = await optionsContract.getOptionId(option.name);
  if(id.gt(0))  {
    console.log(`Option ${option.name} already exists`);
    return;
  }
  let receipt;
  receipt = await optionsContract.addOption(option.name, option.name, slot, 2);
  console.log(option);
  receipt.wait(4);
  id = await optionsContract.getOptionId(option.name);
  console.log(`Added ${option.name} with id ${id}`);
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
  let id = await optionsContract.getOptionId(option.name);
  if(id.gt(0))  {
    console.log(`Option ${option.name} already exists`);
    return;
  }
  let receipt;
  receipt = await optionsContract.addOption(option.name, option.name, slot, 2);
  console.log(option);
  receipt.wait(4);
  id = await optionsContract.getOptionId(option.name);
  console.log(`Added ${option.name} with id ${id}`);

}}

function processCIDs(optionsContract: SelectableOptions, wearablesContract: WearablesValidator, augmentsContract: AugmentsValidator) { return async (option: SkeletonOption) => {
  if(option.cid === null) {
    return;
  } else {
    console.log(`Processing ${option.name}`);
  }
  let receipt;
  const id = (await optionsContract.getOptionId(option.cid!)).toNumber();
  if(option.cid == "bafybeidwnw43hvgat2ay32z44x7umjmhozjnpx3fiiybmmzux4rkh26foa") {
    console.log("option,", option);
  }
  if(id !== 0) {
    if(option.skeleton === "base" || option.skeleton === "marking") {
      if((await augmentsContract.cid(id)) == '') {
        receipt = await augmentsContract.setCID(id, option.cid!);
        await receipt.wait();
        console.log(`Added ${option.name} with id ${id} to Augments with CID: ${option.cid}`);
      }
    } else if (option.skeleton === "wearable") {
      if((await wearablesContract.cid(id)) == '') {
        receipt = await wearablesContract.setCID(id, option.cid!)
        await receipt.wait();
        console.log(`Added ${option.name} with id ${id}  to Wearables with CID: ${option.cid}`);
      }
    }
  }
  else {
    console.log(`Could not find id for ${option.name}`);
    await processSkeletonOption(optionsContract, wearablesContract, augmentsContract)(option);
  }
}}

function processSkeletonOption(optionsContract: SelectableOptions, wearablesContract: WearablesValidator, augmentsContract: AugmentsValidator) { return async (option: SkeletonOption) => {
  let receipt;
  if(option.cid === null ){
    return;
  }
  console.log("Processing: " + option.name);
  console.log(option);
  if ((await optionsContract.getOptionId(option.cid!)).toNumber() !== 0) {
    console.log(`Option ${option.name} already exists`);
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
  } else if (option.location.includes(Location["Floating"])){
    slot = "Floating";
  } else if (option.category === "mask"){
    slot = "Mask";
  }

  if(slot !== "") {
    if((option.name.includes("Pepelian") || option.name.includes("Unadorned")) && !option.name.includes("Mutagenic")) {
      console.log(`Adding \nName:${option.name} \nCID:${option.cid} as default`);
      receipt = await optionsContract.addOptionWithId(option.cid!, locationToId[option.location[0]], option.name, slot, getFormUint(option.form));
      console.log(`Added \nName:${option.name} \nCID:${option.cid}`);
      const tx = await receipt.wait();
    } else {
      console.log(`Adding \nName:${option.name} \nCID:${option.cid} as option`);
      receipt = await optionsContract.addOption(option.cid!, option.name, slot, getFormUint(option.form));
      console.log(`Added \nName:${option.name} \nCID:${option.cid}`);
      await receipt.wait();
    }
    const id = await optionsContract.getOptionId(option.cid!);
    await receipt.wait();
    if(option.skeleton === "base" || option.skeleton === "marking") {
      receipt = await augmentsContract.setCID(id, option.cid!);
      await receipt.wait();
      console.log(`Added ${option.name} with id ${id} to Augments with CID: ${option.cid}`);
    } else if (option.skeleton === "wearable") {
      receipt = await wearablesContract.setCID(id, option.cid!)
      await receipt.wait();
      console.log(`Added ${option.name} with id ${id}  to Wearables with CID: ${option.cid}`);
    }
    console.log(`Added ${option.name} to ${slot}`);
    if(option.prerequisite_type === "HAS TRAIT") {
      receipt = await optionsContract.setTraitRequirement(id, option.prerequisite_value!);
      await receipt.wait();
      console.log(`Set ${option.name} to have trait ${option.prerequisite_value}`);
    }    
    else if (option.prerequisite_type === "HAS NOT TRAIT") {
      const id = await optionsContract.getOptionId(option.cid!);
      receipt = await optionsContract.setNotTraitRequirement(id, option.prerequisite_value!);
      await receipt.wait();
      console.log(`Set ${option.name} to have not trait ${option.prerequisite_value}`);
    } else if (option.prerequisite_type === "HAS ETH") {
      const id = await optionsContract.getOptionId(option.cid!);
      receipt = await optionsContract.setEthRequirement(id, ethers.utils.parseEther(option.prerequisite_value!));      
      await receipt.wait();
      console.log(`Set ${option.name}:${id} to have ETH ${option.prerequisite_value}`);
    } 
    const rarity = option.rarity ? getRarityUint(option.rarity): 0
    const form = getFormUint(option.form);
    const slotUint = getSlotUint(option.location);
    if(option.skeleton === "base") {
      receipt = await augmentsContract.addAugment(0, slotUint, form, rarity );
      await receipt.wait();
      console.log(`Added ${option.name} to augments`);
    } else if (option.skeleton === "wearable") {
      receipt = await wearablesContract.addWearable( slotUint, form, rarity, option.cid! );
      await receipt.wait();
      console.log(`Added ${option.name} to wearables`);
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

