/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { artifacts, web3, network, ethers } = require("hardhat");
const { waitForDebugger } = require("inspector");

const zeroAddress = "0x0000000000000000000000000000000000000000";
const coreId = 1;
let core, validator, receipt, options, characterOptions;

const legacyAddress = "0x33a4cfc925ad40e5bb2b9b2462d7a1a5a5da4476";
//const toBN = (x) => web3.utils.toBN(x);


const deployMock1155 = async (
  ) => {
    const Basic1155 = await ethers.getContractFactory("Basic1155");
    return Basic1155.deploy();
  };

const deployCore = async (
  baseUri = "",
  registry = zeroAddress
) => {
  const Collectible = await ethers.getContractFactory("Core721");
  return Collectible.deploy(baseUri, registry);
};
const deployValidator = async (
    core, options, characterOptions
) => {
  const CharacterValidator = await ethers.getContractFactory("Characters");
  const deployment = await CharacterValidator.deploy(core, options, characterOptions);
  console.log("Validator deployed to:", deployment.address);
  return deployment;
};

const deployOptions = async () => {
    const Options = await ethers.getContractFactory("SelectableOptions");
    const deployment = await Options.deploy();
    console.log("Options deployed to:", deployment.address);
    return deployment;}

const deployCharacterOptions = async () => {
    const Options = await ethers.getContractFactory("CharacterOptions");
    const deployment = await Options.deploy();
    console.log("Character Options deployed to:", deployment.address);
    return deployment;
    
}

async function deployToTestnet() {
  // We get the contract to deploy
  core = await deployCore();
  options = await deployOptions();
  characterOptions = await deployCharacterOptions();
  // In production instances the IDs must line up correctly
  validator = await deployValidator(core.address, options.address, characterOptions.address);
  receipt = await core.addValidator(validator.address, [coreId]);
}


async function main() {
    // Grab the signers so we can drop them test tokens
    console.log("Current Network: " + network.name);

    if(network.name === "ropsten" || network.name === "rinkeby" ) {
      console.log("Testing deploy to " + network.name);
      await deployToTestnet();
      const pillboosts = [];
      const traitsplus = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"];
      await options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
      await options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
      await options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
      await options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
      console.log("Options Added");
      receipt = await validator.createCharacter(pillboosts, traitsplus, { gasLimit: 10000000 });
    }

    if(network.name === "mainnet") {

    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });