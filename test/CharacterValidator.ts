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
import { pushOptions } from "../utils/add-options";
const coreIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const mockCollabId = 32;
const mockLegacyId = ethers.BigNumber.from(
  "0xE00000000000000940000000000000001"
);
const mockShadowPaktPill = ethers.BigNumber.from(
  "0xD00000000000000940000000000000001"
);
const mockKirbonitePill = ethers.BigNumber.from(
  "0xC00000000000000650000000000000001"
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
    let tx: ContractTransaction;
    let options: SelectableOptions;
    let nift: Core1155;
    let owner: string;
    let optionID: BigNumber;

    before(async () => {
      owner = (await ethers.getSigners())[0].address;
      console.log("owner", owner);
      const balance = await ethers.provider.getBalance(owner);
      console.log("Owner balance: ", ethers.utils.formatEther(balance));
      nift = (await deployCore1155()) as Core1155;
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
        requester,
        nift,
        nift
      )) as CharacterValidator;
      nift.setApprovalForAll(characterValidator.address, true);
      character.setValidator(characterValidator.address);
      tx = await core721.addValidator(characterValidator.address, coreIds);
      await pushOptions(
        options.address,
        wearablesValidator.address,
        augmentsValidator.address
      );
      optionID = await options.getOptionId("lime");

    });
    it("Can mint a pepel", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Aateos",
        "Interstellar Nomad",
        "Diamond Hands",
        "None",
        "bafybeieback55fctuhhyh42tavz623xtuxk4pwrdn2jvatr6zzonui2jpa", // MOUTH
        "bafybeicdchpng53briinhnrqq54ozr2vmyd7cvwu2wndtcz4sfiugdvyxm", // EYES
        "lime",                                                        // COLOR
        "bafybeiavzoy6bqsgvpxbargktrh26dq2jwy6sjioa5qwch4sbdlryw7vw4"  // MARKING
      ] as string[];
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint a hashmonk", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Hashmonk",
        "Aateos",
        "Interstellar Nomad",
        "Diamond Hands",
        "None",
        "bafybeid5jm436ecxh7ig2qwgcl3biyhwbgdu6ltzirjsjv3w5l4rbekbxe", // head
        "bafybeibg5bmwhq3ojlobeo3y7ho637wwzopqjgwlywbpqeil7jsanpnmpq", // torso
        "bafybeibat3eowgbdsx3dzciq335h6lxkdpobb4guplyymy5oqxl4hdbryy", // larm
        "bafybeigahfafrfgdaaoqcsql3b2gz34zsppgjj6pbmnyb36vpn4y64vhjq", // rarm
        "bafybeiabtufdf7g54zcg7o4kqazasoqth4qxr2ivqutt6t2j5445znynje", // lleg
        "bafybeifcye2t5kty6gohmwmr7iizdu3jp5imzriszxpglxi4r4d6mmjbne", // rleg
        "arctic", // color
        "bafybeih7il4wy626fvsk7fzm74noo7d5awppo6smfwpcmmy3uaf7t3q7iq", // crown
        "bafybeibz6d6h2reybjauchsgetmtjp7f3boruxwjbtx35ehtnootk4gmky", // mask
      ] as string[];
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Avatars default to having the correct CIDs", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "None",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      tx = await characterValidator.createCharacter(
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
    it("Can get avatar equipment", async () => {
      tx = await nift.mintBatch(owner, [mockKirbonitePill], [1], ethers.constants.HashZero);
      await tx.wait();
      tx = await nift.mintBatch(owner, [mockShadowPaktPill], [1], ethers.constants.HashZero);
      await tx.wait();
      const legacyPills: BigNumber[] = [
        mockShadowPaktPill,
        mockKirbonitePill,
        BigZero,
        BigZero,
        BigZero,
      ];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "None",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
      console.log(tx);
      await tx.wait();
      const equipment = await characterValidator.getEquipment(4);
      console.log(equipment);
      expect(equipment).to.include("bafybeid5kzylu7gbo7fxvcsikju6brsjccciovgbggn43xsdm2ky5yewcm");
    });
    it("Can retrieve a CID from a character ID", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "None",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      tx = await characterValidator.createCharacter(
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
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "None",
        "bafybeic4usd6kmt3bizhjyvdtezrall5zsda6vatj4ru5onl5fry2oe5ry",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      const startingBalance = await ethers.provider.getBalance(owner);

      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus,
        { value: cost }
      );
      const receipt = await tx.wait();
      const gasUsed = receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice) ;

      console.log("gas used", gasUsed.toNumber());
      
      const endingBalance = await ethers.provider.getBalance(owner);
      expect (startingBalance.sub(endingBalance.add(gasUsed))).to.equal(cost);
    });
    it("Can recover ETH sent for paid upgrades", async () => {
      const startingBalance = await ethers.provider.getBalance(owner);

      tx = await characterValidator.collectAllEth(
        owner
      );
      const receipt = await tx.wait();
      const gasUsed = receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice) ;
      console.log("gas used", gasUsed.toNumber());
      
      const endingBalance = await ethers.provider.getBalance(owner);
      expect (endingBalance.add(gasUsed).sub(startingBalance)).to.equal(cost);
    });
    it("Fails to mint an avatar with paid upgrade and no value", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "None",
        "bafybeic4usd6kmt3bizhjyvdtezrall5zsda6vatj4ru5onl5fry2oe5ry",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      await expect(
        characterValidator.createCharacter(legacyPills, collabPills, traitsplus)
      ).to.be.revertedWith("not enough ETH");
    });
    it("Fails to mint an avatar with a pill gated upgrade if not holding pill", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "None",
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
      tx = await nift.mintBatch(owner, [mockLegacyId], [1], ethers.constants.HashZero);
      await tx.wait();
      tx = await nift.mintBatch(owner, [mockShadowPaktPill], [1], ethers.constants.HashZero);
      await tx.wait();
      const legacyPills: BigNumber[] = [
        BigZero,
        BigZero,
        BigZero,
        mockLegacyId,
        BigZero,
      ];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "None",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      await tx.wait();
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint an avatar with a collab pill gated upgrade", async () => {
      tx = await nift.mintBatch(owner, [mockCollabId], [1], ethers.constants.HashZero);

      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, mockCollabId, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "None",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      tx = await options.setCollabPillRequirement(optionID, mockCollabId);
      await tx.wait();
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint a Pepel with a trait gated upgrade", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Galaxy Brain",
        "None",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      tx = await options.setTraitRequirement(optionID, "Galaxy Brain");
      await tx.wait();
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint a Hashmonk with a trait gated upgrade", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Hashmonk",
        "Deepmem",
        "Bearbarian",
        "Frontrunner",
        "None",
        "bafybeierppjhuh63eeaekfrtintwzz6swvongraj7bieryjpumhu7kt6ey",
        "bafybeid3ng4tq3nyzwzwemyt2ju3djvkw2c5wanfx4rr23aqgvjkt3rzni",
        "bafybeibat3eowgbdsx3dzciq335h6lxkdpobb4guplyymy5oqxl4hdbryy",
        "bafybeigahfafrfgdaaoqcsql3b2gz34zsppgjj6pbmnyb36vpn4y64vhjq",
        "bafybeiabtufdf7g54zcg7o4kqazasoqth4qxr2ivqutt6t2j5445znynje",
        "bafybeihx37wpm2bins2zltikjsikgjcgepboqub7yumydleelddospkswi",
        "tropic",
        "bafybeih7il4wy626fvsk7fzm74noo7d5awppo6smfwpcmmy3uaf7t3q7iq",
        "bafybeiab7wr5ynymlxqx4ja2kc4t5lnqne37aifcsihyz4qclazimdm3kq"
      ] as string[];
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Fails to mint an avatar with a trait gated upgrade if trait isn't present", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Deepmem",
        "Doomskroler",
        "Gweibond",
        "None",
        "bafybeih53q7lmjzrbg6uycrfne3cfnxqqkfwdrv5julewb2e7qvdkcufz4",
        "bafybeidutfyyojdwoyfxv7o5js7hhgnb2fkms7ngcwqcurn33hsrn4qseu",
        "lime",
        "bafybeidnniq32g63mgxq2kw77zf4jcr3mipi72hoyi3goyi5qwez6wsnuu",
      ] as string[];
      tx = await options.setTraitRequirement(optionID, "Galaxy Brain");
      await tx.wait();
      await expect(
        characterValidator.createCharacter(legacyPills, collabPills, traitsplus)
      ).to.be.revertedWith("You don't have the correct trait");
    });
    it("Fails to mint an avatar with a gated faction if not holding the legacy pill", async () => {
      const legacyPills: number[] = [0, 0, 0, 0, 0];
      const collabPills: number[] = [0, 0, 0, 0, 0];
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
      tx = await nift.mintBatch(owner, [mockShadowPaktPill], [1], ethers.constants.HashZero);
      const legacyPills: BigNumber[] = [
        mockShadowPaktPill,
        BigZero,
        BigZero,
        BigZero,
        BigZero,
      ];
      const collabPills: number[] = [0, 0, 0, 0, 0];
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
      await tx.wait();
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint an avatar with a gated faction if holding the correctlegacy pill", async () => {
      tx = await nift.mintBatch(owner, [mockShadowPaktPill], [1], ethers.constants.HashZero);
      const legacyPills: BigNumber[] = [
        mockShadowPaktPill,
        BigZero,
        BigZero,
        BigZero,
        BigZero,
      ];
      const collabPills: number[] = [0, 0, 0, 0, 0];
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
      await tx.wait();
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
  });
});
