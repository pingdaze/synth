/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { ethers } = require("hardhat");
import {SelectableOptions, WearablesValidator, AugmentsValidator} from "../typechain-types/";
import   {SKELETON_OPTIONS, SkeletonOption, Location, StepOption, STEP_OPTIONS_BY_TYPE } from "../data/airtable"



export async function pushOptions(optionsAddress: string, wearablesAddress: string, augmentsAddress: string){
  // Grab the signers so we can drop them test tokens
  let options = await ethers.getContractAt('SelectableOptions', optionsAddress) as SelectableOptions;
  let wearables = await ethers.getContractAt('WearablesValidator', wearablesAddress) as WearablesValidator;
  let augments = await ethers.getContractAt('AugmentsValidator', augmentsAddress) as AugmentsValidator;
  // optionID -- name -- slot -- form
  let processing = SKELETON_OPTIONS.map(processSkeletonOption(options, wearables, augments));
  await Promise.all(processing);
  console.log("Done processing skeleton options");
  processing = STEP_OPTIONS_BY_TYPE.Faction.map(processStepOption(options, "Faction"));
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

