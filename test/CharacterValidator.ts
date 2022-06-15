import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {  ethers } from "hardhat";
import {CharacterValidator, RandomnessRelayL2, WearablesValidator, Characters, SelectableOptions, Core1155, Core721, Basic1155, AugmentsValidator} from "../typechain-types";
import {deployCore721, deployCore1155, deploySelectableOptions, deployWearablesValidator, deployAugmentsValidator, deployCharacter, deployCharacterValidator, deployMock1155, deployRequester} from "./shared/deploys"
const zeroAddress = "0x0000000000000000000000000000000000000000";

const coreId = 1;

const id1 = 1;
const id2 = 2;
const id3 = 3;
const id4 = 4;
const amount = 1;


// Replace magic numbers

describe("Characters Validator", () => {
  let owner: SignerWithAddress, user1: SignerWithAddress;
  before(async () => {
      [owner, user1] = await ethers.getSigners();
    });
  describe("isValid", () => {
    let core721 : Core721;
    let core1155 : Core1155;
    let nift : Basic1155;
    let characterValidator: CharacterValidator;
    let wearablesValidator: WearablesValidator;
    let augmentsValidator: AugmentsValidator;
    let requester: RandomnessRelayL2;
    let character: Characters;
    let receipt;
    let options: SelectableOptions;
    // This is horribly inneficient, probably don't redeploy these each time?
    beforeEach(async () => {
        // We get the contract to deploy
        core721 = await deployCore721() as Core721;
        core1155 = await deployCore1155() as Core1155;
        options = await deploySelectableOptions() as SelectableOptions;
        nift = await deployMock1155() as Basic1155;
        await nift.mint(id1, owner.address, amount);
        await nift.mint(id2, owner.address, amount);
        await nift.mint(id3, owner.address, amount);
        // In production instances the IDs must line up correctly
        character = await deployCharacter(core721, options) as Characters;
        wearablesValidator = await deployWearablesValidator(core1155, character) as WearablesValidator;
        augmentsValidator = await deployAugmentsValidator(core1155, character) as AugmentsValidator;
        requester = await deployRequester() as RandomnessRelayL2;
        characterValidator = await deployCharacterValidator(core721, options, wearablesValidator, augmentsValidator, character, requester) as CharacterValidator;
        character.setValidator(characterValidator.address);
        receipt = await core721.addValidator(characterValidator.address, [coreId]);
    });
    it("Can mint an avatar", async () => {
        const pillboosts : string[] = [];
        const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
        options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
        options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
        options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
        options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
        receipt = await characterValidator.createCharacter(pillboosts, traitsplus);
    });
    it("Can mint an avatar with a paid in ETH upgrade", async () => {
        const pillboosts : string[] = [];
        const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
        options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
        options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
        options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
        options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
        receipt = await characterValidator.createCharacter(pillboosts, traitsplus);
    });
    it("Can mint an avatar with a pill gated upgrade", async () => {
        const pillboosts : string[] = [];
        const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
        options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
        options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
        options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
        options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
        receipt = await characterValidator.createCharacter(pillboosts, traitsplus);
    });
    it("Can mint an avatar with a collab pill gated upgrade", async () => {
        const pillboosts : string[] = [];
        const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
        options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
        options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
        options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
        options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
        receipt = await characterValidator.createCharacter(pillboosts, traitsplus);
    });
    it("Can mint an avatar with a trait gated upgrade", async () => {
        const pillboosts : string[] = [];
        const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
        options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
        options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
        options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
        options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
        receipt = await characterValidator.createCharacter(pillboosts, traitsplus);
    });
    it("Receives Boosterpack correctly", async () => {
        const pillboosts : string[] = [];
        const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
        options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
        options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
        options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
        options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
        receipt = await characterValidator.createCharacter(pillboosts, traitsplus);
    });
    it("Receives Boosterpack correctly with 1 pillboost", async () => {
        const pillboosts : string[] = [];
        const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
        options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
        options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
        options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
        options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
        receipt = await characterValidator.createCharacter(pillboosts, traitsplus);
    });
    it("Receives Boosterpack correctly with 5 pillboosts", async () => {
        const pillboosts : string[] = [];
        const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
        options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
        options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
        options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
        options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
        receipt = await characterValidator.createCharacter(pillboosts, traitsplus);
    });
    it("Receives Boosterpack correctly with EGODETH pillboosts", async () => {
        const pillboosts : string[] = [];
        const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
        options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
        options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
        options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
        options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
        receipt = await characterValidator.createCharacter(pillboosts, traitsplus);
    });
    it("Receives Boosterpack correctly with Collab Pillboosts", async () => {
        const pillboosts : string[] = [];
        const traitsplus: string[] = ["Pepel",1, 2, 3, 4, 5, 6, "Purple", "Orange", "Green", "Blue"] as string[];
        options.addOption("Purple", "Pepel", "Mouth", 0, zeroAddress, 0, 12);
        options.addOption("Orange", "Pepel", "Eyes", 0, zeroAddress, 0, 12);
        options.addOption("Green", "Pepel", "Type", 0, zeroAddress, 0, 12);
        options.addOption("Blue", "Pepel", "Markings", 0, zeroAddress, 0, 12);
        receipt = await characterValidator.createCharacter(pillboosts, traitsplus);
    });
  });
});
