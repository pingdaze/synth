import { ethers } from "hardhat";
import { expect } from "chai";
import { BigNumber} from "@ethersproject/bignumber";
import {
  CharacterValidator,
  RandomnessRelayL2,
  WearablesValidator,
  Characters,
  SelectableOptions,
  Core1155,
  Core721,
  AugmentsValidator,
  Basic1155
} from "../typechain-types";
import {
  deployCore721,
  deployCore1155,
  deploySelectableOptions,
  deployWearablesValidator,
  deployAugmentsValidator,
  deployCharacter,
  deployCharacterValidator,
  deployRequester,
  deployMock1155
} from "./shared/deploys";
import { ContractTransaction } from "ethers";

const coreId = 1;
const mockCollabId = 1;
const mockLegacyId = ethers.BigNumber.from("0xE00000000000000940000000000000001");
const mockLegacyIdReq = 0xE;
const amount = 1;
const BigZero = ethers.BigNumber.from("0");

const cost = ethers.utils.parseEther("1");

// Replace magic numbers

describe.only("Characters Validator", () => {
  describe("isValid", () => {
    let core721: Core721;
    let core1155: Core1155;
    let characterValidator: CharacterValidator;
    let wearablesValidator: WearablesValidator;
    let augmentsValidator: AugmentsValidator;
    let requester: RandomnessRelayL2;
    let character: Characters;
    let receipt: ContractTransaction;
    let options: SelectableOptions;
    let nift: Basic1155;
    let owner: string;
    // This is horribly inneficient, probably don't redeploy these each time?

    before(async () => {
      owner = (await ethers.getSigners())[0].address;
      console.log("owner", owner);
      const balance = await ethers.provider.getBalance(owner);
      console.log("Owner balance: ", ethers.utils.formatEther(balance));
      nift = (await deployMock1155()) as Basic1155;
      await nift.mint(mockCollabId, owner, amount);
      await nift.mint(mockLegacyId, owner, amount);
    });
    beforeEach(async () => {
      // We get the contract to deploy
      core721 = (await deployCore721()) as Core721;
      core1155 = (await deployCore1155()) as Core1155;
      options = (await deploySelectableOptions(nift.address, nift.address)) as SelectableOptions;

      // In production instances the IDs must line up correctly
      character = (await deployCharacter(core721, options)) as Characters;
      wearablesValidator = (await deployWearablesValidator(
        core1155,
        character
      )) as WearablesValidator;
      augmentsValidator = (await deployAugmentsValidator(
        core1155,
        character
      )) as AugmentsValidator;
      requester = (await deployRequester()) as RandomnessRelayL2;
      characterValidator = (await deployCharacterValidator(
        core721,
        options,
        wearablesValidator,
        augmentsValidator,
        character,
        requester
      )) as CharacterValidator;
      character.setValidator(characterValidator.address);
      receipt = await core721.addValidator(characterValidator.address, [
        coreId,
      ]);
    });
    it("Can mint an avatar", async () => {
      const legacyPills: number[] = [0,0,0,0,0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        1,
        2,
        3,
        4,
        5,
        6,
        "Purple",
        "Orange",
        "Green",
        "Blue",
      ] as string[];
      await options.addOption("Purple", "Mouth", 1, 1);
      await options.addOption("Orange", "Eyes", 2, 1);
      await options.addOption("Green", "Type", 3, 1);
      await options.addOption("Blue", "Markings", 4, 1);
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint an avatar with a paid in ETH upgrade", async () => {
      const legacyPills: number[] = [0,0,0,0,0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        1,
        2,
        3,
        4,
        5,
        6,
        "Purple",
        "Orange",
        "Green",
        "Blue",
      ] as string[];
      await options.addOption("Purple", "Mouth", 1, 1);
      await options.addOption("Orange", "Eyes", 2, 1);
      await options.addOption("Green", "Type", 3, 1);
      await options.addOption("Blue", "Markings", 4, 1);
      await options.setEthRequirement(1, cost);
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus,
        { value: cost }
      );
    });
    it("Fails to mint an avatar with paid upgrade and no value", async () => {
      const legacyPills: number[] = [0,0,0,0,0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        1,
        2,
        3,
        4,
        5,
        6,
        "Purple",
        "Orange",
        "Green",
        "Blue",
      ] as string[];
      await options.addOption("Purple", "Mouth", 1, 1);
      await options.addOption("Orange", "Eyes", 2, 1);
      await options.addOption("Green", "Type", 3, 1);
      await options.addOption("Blue", "Markings", 4, 1);
      await options.setEthRequirement(1, cost);
      expect(
        characterValidator.createCharacter(legacyPills, collabPills, traitsplus)
      ).to.be.revertedWith("not enough ETH");
    });
    it("Fails to mint an avatar with a pill gated upgrade if not holding pill", async () => {
      const legacyPills: number[] = [0,0,0,0,0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        1,
        2,
        3,
        4,
        5,
        6,
        "Purple",
        "Orange",
        "Green",
        "Blue",
      ] as string[];
      await options.addOption("Purple", "Mouth", 1, 1);
      await options.addOption("Orange", "Eyes", 2, 1);
      await options.addOption("Green", "Type", 3, 1);
      await options.addOption("Blue", "Markings", 4, 1);
      await options.setLegacyPillRequirement(1, mockLegacyIdReq);
      expect(
        characterValidator.createCharacter(
          legacyPills,
          collabPills,
          traitsplus
        )
      ).to.be.revertedWith("You do not have the required pill");
    });
    it("Can mint an avatar with a pill gated upgrade if holding pill", async () => {
      const legacyPills: BigNumber[] = [mockLegacyId,BigZero,BigZero,BigZero,BigZero];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        1,
        2,
        3,
        4,
        5,
        6,
        "Purple",
        "Orange",
        "Green",
        "Blue",
      ] as string[];
      await options.addOption("Purple", "Mouth", 1, 1);
      await options.addOption("Orange", "Eyes", 2, 1);
      await options.addOption("Green", "Type", 3, 1);
      await options.addOption("Blue", "Markings", 4, 1);
      receipt = await options.setLegacyPillRequirement(1, mockLegacyIdReq);
      await receipt.wait();
      receipt = await characterValidator.createCharacter(
          legacyPills,
          collabPills,
          traitsplus
        );
    });
    it("Can mint an avatar with a collab pill gated upgrade", async () => {
      const legacyPills: number[] = [0,0,0,0,0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        1,
        2,
        3,
        4,
        5,
        6,
        "Purple",
        "Orange",
        "Green",
        "Blue",
      ] as string[];
      await options.addOption("Purple", "Mouth", 1, 1);
      await options.addOption("Orange", "Eyes", 2, 1);
      await options.addOption("Green", "Type", 3, 1);
      await options.addOption("Blue", "Markings", 4, 1);
      receipt = await options.setCollabPillRequirement(1, mockCollabId);
      console.log("balance", await nift.balanceOf(owner, mockCollabId));
      await receipt.wait();
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint an avatar with a trait gated upgrade", async () => {
      
    });
  });
});
