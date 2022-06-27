import { ethers } from "hardhat";
import { expect } from "chai";
import { BigNumber } from "@ethersproject/bignumber";
import {
  CharacterValidator,
  RandomnessRelayL2,
  WearablesValidator,
  Characters,
  SelectableOptions,
  Core1155,
  Core721,
  AugmentsValidator,
  Basic1155,
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
  deployMock1155,
} from "./shared/deploys";
import { ContractTransaction } from "ethers";
import { pushOptions } from "../utils/add-options";
const coreIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mockCollabId = 1;
const mockLegacyId = ethers.BigNumber.from(
  "0xE00000000000000940000000000000001"
);
const mockShadowPaktPill = ethers.BigNumber.from(
  "0xD00000000000000940000000000000001"
);
const mockLegacyIdReq = ethers.BigNumber.from(0xe);
const mockShadowReq = ethers.BigNumber.from(0xd);
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
    let optionID: BigNumber;

    before(async () => {
      owner = (await ethers.getSigners())[0].address;
      console.log("owner", owner);
      const balance = await ethers.provider.getBalance(owner);
      console.log("Owner balance: ", ethers.utils.formatEther(balance));
      nift = (await deployMock1155()) as Basic1155;
      await nift.mint(mockCollabId, owner, amount);
      await nift.mint(mockLegacyId, owner, amount);
      core721 = (await deployCore721()) as Core721;
      core1155 = (await deployCore1155()) as Core1155;
      options = (await deploySelectableOptions(
        nift.address,
        nift.address
      )) as SelectableOptions;

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
      receipt = await core721.addValidator(characterValidator.address, coreIds);
      await pushOptions(
        options.address,
        wearablesValidator.address,
        augmentsValidator.address
      );
      optionID = await options.getOptionId("lime");

    });
    it("Can mint a pepel", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Aateos",
        "Interstellar Nomad",
        "Diamond Hands",
        "Aave",
        "bafybeieback55fctuhhyh42tavz623xtuxk4pwrdn2jvatr6zzonui2jpa",
        "bafybeicdchpng53briinhnrqq54ozr2vmyd7cvwu2wndtcz4sfiugdvyxm",
        "lime",
        "bafybeiavzoy6bqsgvpxbargktrh26dq2jwy6sjioa5qwch4sbdlryw7vw4"
      ] as string[];
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint a hashmonk", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Hashmonk",
        "Aateos",
        "Interstellar Nomad",
        "Diamond Hands",
        "Aave",
        "bafybeid5jm436ecxh7ig2qwgcl3biyhwbgdu6ltzirjsjv3w5l4rbekbxe", // head
        "bafybeibg5bmwhq3ojlobeo3y7ho637wwzopqjgwlywbpqeil7jsanpnmpq", // torso
        "bafybeibat3eowgbdsx3dzciq335h6lxkdpobb4guplyymy5oqxl4hdbryy", // larm
        "bafybeigahfafrfgdaaoqcsql3b2gz34zsppgjj6pbmnyb36vpn4y64vhjq", // rarm
        "bafybeiabtufdf7g54zcg7o4kqazasoqth4qxr2ivqutt6t2j5445znynje", // lleg
        "bafybeifcye2t5kty6gohmwmr7iizdu3jp5imzriszxpglxi4r4d6mmjbne", // rleg
        "arctic", // color
        "bafybeih7il4wy626fvsk7fzm74noo7d5awppo6smfwpcmmy3uaf7t3q7iq", // crown
      ] as string[];
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Avatars default to having the correct CIDs", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "Yearn",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
      const characterID = await character.getCharacter(1);
      const skeleton = await character.getSkeleton(1);
      skeleton.forEach(async (element) => {
        console.log("CID:", await augmentsValidator.cid(element), "For:", element);
      });
    });
    it("Can retrieve a CID from a character ID", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "Yearn",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
      const uintID = await options.getOptionId("bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4");
      //TODO: add some more intermediary checks in here
      const cid = await augmentsValidator.cid(uintID);
      const id = await augmentsValidator.id(cid); 
      expect(id).to.equal(uintID);
      //const skeleton 
    });
    it("Can mint an avatar with a paid in ETH upgrade", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "Yearn",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      await options.setEthRequirement(optionID, cost);
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus,
        { value: cost }
      );
    });
    it("Fails to mint an avatar with paid upgrade and no value", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "Yearn",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      await options.setEthRequirement(optionID, cost);
      await expect(
        characterValidator.createCharacter(legacyPills, collabPills, traitsplus)
      ).to.be.revertedWith("not enough ETH");
    });
    it("Fails to mint an avatar with a pill gated upgrade if not holding pill", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "Yearn",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      await options.setLegacyPillRequirement(optionID, mockLegacyIdReq);
      await expect(
        characterValidator.createCharacter(legacyPills, collabPills, traitsplus)
      ).to.be.revertedWith("You do not have the required Legacy pill");
    });
    it("Can mint an avatar with a pill gated upgrade if holding pill", async () => {
      const legacyPills: BigNumber[] = [
        mockLegacyId,
        BigZero,
        BigZero,
        mockShadowPaktPill,
        BigZero,
      ];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "Yearn",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      receipt = await options.setLegacyPillRequirement(
        optionID,
        mockShadowReq
      );
      receipt = await nift.mint(mockShadowPaktPill, owner, amount);
      await receipt.wait();
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint an avatar with a collab pill gated upgrade", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "Yearn",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      receipt = await options.setCollabPillRequirement(optionID, mockCollabId);
      await receipt.wait();
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint an avatar with a trait gated upgrade", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "Yearn",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      receipt = await options.setTraitRequirement(optionID, "Galaxy Brain");
      await receipt.wait();
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Fails to mint an avatar with a trait gated upgrade if trait isn't present", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Gweibond",
        "Yearn",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      receipt = await options.setTraitRequirement(optionID, "Galaxy Brain");
      await receipt.wait();
      await expect(
        characterValidator.createCharacter(legacyPills, collabPills, traitsplus)
      ).to.be.revertedWith("You don't have the correct trait");
    });
    it("Fails to mint an avatar with a gated faction if not holding the legacy pill", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "Shadowpakt",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      await expect(
        characterValidator.createCharacter(legacyPills, collabPills, traitsplus)
      ).to.be.revertedWith("You do not have the required Legacy pill");
    });
    it("Can mint an avatar with a gated faction if holding the correctlegacy pill", async () => {
      const legacyPills: BigNumber[] = [
        mockShadowPaktPill,
        BigZero,
        BigZero,
        BigZero,
        BigZero,
      ];
      const collabPills: number[] = [];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "Shadowpakt",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      receipt = await nift.mint(mockShadowPaktPill, owner, amount);
      await receipt.wait();
      receipt = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
  });
});
