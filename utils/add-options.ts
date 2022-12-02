/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { ethers } = require("hardhat");
import {SelectableOptions, WearablesValidator, AugmentsValidator} from "../typechain-types/";
import   {SKELETON_OPTIONS, SkeletonOption, Location, StepOption, STEP_OPTIONS_BY_TYPE } from "../data/airtable"
import { BigNumber } from "ethers";
import * as fs from 'fs';


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

let testData: string[][] = [];

let traitsPlusPepel = [
  "Pepel",
  "Durn",
  "Algorist",
  "Simptongued",
  "None",
  "bafybeibuasbtuzltmwi56z2t5ndyniwfh37atvdjv2ftf6xyisahcxqori",
  "bafybeicr5vd3mqpyqhfe55x3t23ngwy477jnqqg3ydwpbmq3missdfnvyy",
  "pale",
  "bafybeigroraemt2yujiqgztpaya5q6lzp3tswy7sgkaicq5phdswbkptqi"
]


let traitsPlusHashmonk = [
  "Hashmonk",
  "Aateos",
  "Patcher",
  "Diamond Hands",
  "None",
  "bafybeiffkfo5hqskknmwb7r3zuz6iqdf3zcscvfmli4z64opkufki4udh4", 
  "bafybeigv7y7cvlgr3z4f7oabtyzi5vk74fcqjzfulwsdoi6h4beqlbhgp4",
  "bafybeibq36sktzmwao2sza22ks6jijaphhgzcxsk6r2z6mesmhreookdye", 
  "bafybeiefwn32qzxqyewiadmcx4au2tuexh7pp26wfdl4uf336po7cczn2i", 
  "bafybeig5tb5rxqof5zxp2bolr5dqxhjwc7fqgprng2wc2zu5zhzncxhw5u", 
  "bafybeich2xydybqqxx53sucuswdohm4764boxcqqxywkf27frtnc5f2vr4", 
  "arctic",
  "bafybeiauxnajd2vno6dtkbr64qnksjolfoolj7sgiiz6w5aguc3gfrdsqe", 
  "bafybeiab7wr5ynymlxqx4ja2kc4t5lnqne37aifcsihyz4qclazimdm3kq"
]

export async function refreshCIDs(optionsAddress: string, wearablesAddress: string, augmentsAddress: string, index: number = 0){
  // Grab the signers so we can drop them test tokens
  const accounts = await ethers.getSigners();
  let optionsT = await ethers.getContractAt('SelectableOptions', optionsAddress) as SelectableOptions;
  let wearablesT = await ethers.getContractAt('WearablesValidator', wearablesAddress) as WearablesValidator;
  let augmentsT = await ethers.getContractAt('AugmentsValidator', augmentsAddress) as AugmentsValidator;
  let options = optionsT.connect(accounts[3]);
  let wearables =  wearablesT.connect(accounts[3]);
  let augments = augmentsT.connect(accounts[3]);
  for(let i = index; i< SKELETON_OPTIONS.length; i++) {
    const option = SKELETON_OPTIONS[i];
    await processCIDs(options, wearables, augments)(option);
    // console.log(`Processed:${i}#${option.name}`);
  }
}
export async function pushOptions(optionsAddress: string, wearablesAddress: string, augmentsAddress: string, index: number = 0){
  // Grab the signers so we can drop them test tokens
  const accounts = await ethers.getSigners();
  let optionsT = await ethers.getContractAt('SelectableOptions', optionsAddress) as SelectableOptions;
  let wearablesT = await ethers.getContractAt('WearablesValidator', wearablesAddress) as WearablesValidator;
  let augmentsT = await ethers.getContractAt('AugmentsValidator', augmentsAddress) as AugmentsValidator;
  let options = optionsT.connect(accounts[3]);
  let wearables =  wearablesT.connect(accounts[3]);
  let augments = augmentsT.connect(accounts[3]);

  // processing = STEP_OPTIONS_BY_TYPE.Faction.map(processFactionOption(options, "Faction"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Faction) {
    await processFactionOption(options, "Faction")(option);
    console.log(`Added ${option.name}`);
    let tempTestData = [...traitsPlusPepel];
    tempTestData[4] = option.name;
    testData.push(tempTestData);
    tempTestData = [...traitsPlusHashmonk];
    tempTestData[4] = option.name;
    testData.push(tempTestData);
  }
  console.log("Done processing Faction options");
  
  // processing = STEP_OPTIONS_BY_TYPE.Upbringing.map(processStepOption(options, "Upbringing"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Upbringing) {
    await processStepOption(options, "Upbringing")(option);
    console.log(`Added ${option.name}`);
    let tempTestData = [...traitsPlusPepel];
    tempTestData[2] = option.name;
    testData.push(tempTestData);
    tempTestData = [...traitsPlusHashmonk];
    tempTestData[2] = option.name;
    testData.push(tempTestData);
  }
  console.log("Done processing Upbringing options");
  
  // processing = STEP_OPTIONS_BY_TYPE.Gift.map(processStepOption(options, "Gift"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Gift) {
    await processStepOption(options, "Gift")(option);
    console.log(`Added ${option.name}`);
    
    let tempTestData = [...traitsPlusPepel];
    tempTestData[3] = option.name;
    testData.push(tempTestData);
    tempTestData = [...traitsPlusHashmonk];
    tempTestData[3] = option.name;
    testData.push(tempTestData);
  }
  console.log("Done processing Gift options");
  
  // processing = STEP_OPTIONS_BY_TYPE.Origin.map(processStepOption(options, "Origin"));
  // await Promise.all(processing);
  for(let option of STEP_OPTIONS_BY_TYPE.Origin) {
    await processStepOption(options, "Origin")(option);
    console.log(`Added ${option.name}`);
    
    let tempTestData = [...traitsPlusPepel];
    tempTestData[1] = option.name;
    testData.push(tempTestData);
    tempTestData = [...traitsPlusHashmonk];
    tempTestData[1] = option.name;
    testData.push(tempTestData);
  }
  console.log("Done processing Origin options");

  for(let color of pepelColors) {
    let tempTestData = [...traitsPlusPepel];
    await options.addOption(color, color, "Type", 1);
    console.log(`Added ${color}`);
    tempTestData[7] = color;
    testData.push(tempTestData);
  };
   for(let color of hashmonkColors) {
    let tempTestData = [...traitsPlusHashmonk];

    await options.addOption(color, color, "Type", 0);
    console.log(`Added ${color}`);
    tempTestData[11] = color;
    testData.push(tempTestData);
  };
  // optionID -- name -- slot -- form
  // let processing = SKELETON_OPTIONS.map(processSkeletonOption(options, wearables, augments));
  // await Promise.all(processing);
  for(let i = index; i< SKELETON_OPTIONS.length; i++) {
    const option = SKELETON_OPTIONS[i];
    await processSkeletonOption(options, wearables, augments)(option);
    console.log(`Processed:${i}#${option.name}`);
  }
  fs.writeFileSync('./data/test-mints.json', JSON.stringify(testData));

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


  let slot = "";
  if(option.skeleton === "marking"){
    let tempTestData = [...traitsPlusPepel];
    tempTestData[8] = option.cid!;
    testData.push(tempTestData);
    slot = "Markings";
  } else if (option.location.includes(Location["Head"])){
    let tempTestData = [...traitsPlusHashmonk];
    tempTestData[5] = option.cid!;
    testData.push(tempTestData);

    slot = "Head";
  } else if (option.location.includes(Location["Torso"])){
    let tempTestData = [...traitsPlusHashmonk];
    tempTestData[6] = option.cid!;
    testData.push(tempTestData);

    slot = "Torso";
  } else if (option.location.includes(Location["LeftArm"])){
    let tempTestData = [...traitsPlusHashmonk];
    tempTestData[7] = option.cid!;
    testData.push(tempTestData);

    slot = "LeftArm";
  } else if (option.location.includes(Location["RightArm"])){
    slot = "RightArm";
    let tempTestData = [...traitsPlusHashmonk];
    tempTestData[8] = option.cid!;
    testData.push(tempTestData);

  } else if (option.location.includes(Location["LeftLeg"])){
    let tempTestData = [...traitsPlusHashmonk];
    tempTestData[9] = option.cid!;
    testData.push(tempTestData);
    slot = "LeftLeg";
  } else if (option.location.includes(Location["RightLeg"])){
    let tempTestData = [...traitsPlusHashmonk];
    tempTestData[10] = option.cid!;
    testData.push(tempTestData);
    slot = "RightLeg";
  } else if (option.location.includes(Location["Mouth"])){
    let tempTestData = [...traitsPlusPepel];
    tempTestData[11] = option.cid!;
    testData.push(tempTestData);
    slot = "Mouth";
  } else if (option.location.includes(Location["Eyes"])){
    let tempTestData = [...traitsPlusPepel];
    tempTestData[6] = option.cid!;
    testData.push(tempTestData);
    slot = "Eyes";
  } else if (option.location.includes(Location["Crown"])){
    let tempTestData = [...traitsPlusHashmonk];
    tempTestData[12] = option.cid!;
    testData.push(tempTestData);
    slot = "Crown";
  } else if (option.location.includes(Location["Floating"])){
    slot = "Floating";
  } else if (option.category === "mask"){
    let tempTestData = [...traitsPlusHashmonk];
    tempTestData[12] = option.cid!;
    testData.push(tempTestData);
    slot = "Mask";
  }
  if ((await optionsContract.getOptionId(option.cid!)).toNumber() !== 0) {
    console.log(`Option ${option.name} already exists`);
    return;
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

