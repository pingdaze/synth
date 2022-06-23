import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { expect } from "chai";
import {
  CharacterValidator,
  RandomnessRelayL2,
  WearablesValidator,
  Characters,
  SelectableOptions,
  Core1155,
  Core721,
  AugmentsValidator,
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
} from "./shared/deploys";
import { ContractTransaction } from "ethers";

const coreId = 1;

const cost = ethers.utils.parseEther("1");

// Replace magic numbers

describe.only("Characters Validator", () => {
  let owner: SignerWithAddress, user1: SignerWithAddress;
  before(async () => {
    [owner, user1] = await ethers.getSigners();
  });
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
    // This is horribly inneficient, probably don't redeploy these each time?
    beforeEach(async () => {
      // We get the contract to deploy
      core721 = (await deployCore721()) as Core721;
      core1155 = (await deployCore1155()) as Core1155;
      options = (await deploySelectableOptions()) as SelectableOptions;

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
      const pillboosts: string[] = [];
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
        pillboosts,
        traitsplus
      );
    });
    it("Can mint an avatar with a paid in ETH upgrade", async () => {
      const pillboosts: string[] = [];
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
        pillboosts,
        traitsplus,
        { value: cost }
      );
    });
    it("Fails to mint an avatar with paid upgrade and no value", async () => {
      const pillboosts: string[] = [];
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
        characterValidator.createCharacter(pillboosts, traitsplus)
      ).to.be.revertedWith("not enough ETH");
    });
    it("Can mint an avatar with a pill gated upgrade", async () => {});
    it("Can mint an avatar with a collab pill gated upgrade", async () => {});
    it("Can mint an avatar with a trait gated upgrade", async () => {});
    it("Receives Boosterpack correctly", async () => {});
    it("Receives Boosterpack correctly with 1 pillboost", async () => {});
    it("Receives Boosterpack correctly with 5 pillboosts", async () => {});
    it("Receives Boosterpack correctly with EGODETH pillboosts", async () => {});
    it("Receives Boosterpack correctly with Collab Pillboosts", async () => {});
  });
});
