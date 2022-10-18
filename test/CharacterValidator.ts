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
const mockRATSPill = ethers.BigNumber.from(
  "0xB00000000000000270000000000000001"
);
const mockLegacyIdReq = ethers.BigNumber.from(0xe);
const mockShadowReq = ethers.BigNumber.from(0xd);
const amount = 1;
const BigZero = ethers.BigNumber.from("0");

const cost = ethers.utils.parseEther("1");

// Replace magic numbers

describe("Characters Validator", () => {
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
    let booster: Core1155;
    let owner: string;
    let optionID: BigNumber;

    before(async () => {
      owner = (await ethers.getSigners())[0].address;
      console.log("owner", owner);
      const balance = await ethers.provider.getBalance(owner);
      console.log("Owner balance: ", ethers.utils.formatEther(balance));
      nift = (await deployCore1155()) as Core1155;
      booster = (await deployCore1155()) as Core1155;
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
        nift,
        nift,
        booster
      )) as CharacterValidator;
      nift.setApprovalForAll(characterValidator.address, true);
      character.setValidator(characterValidator.address);
      tx = await core721.addValidator(characterValidator.address, coreIds);
      await tx.wait();
      tx = await character.setWearables(wearablesValidator.address);
      await tx.wait();
      tx = await core1155.addValidator(wearablesValidator.address, coreIds);
      tx = await booster.addValidator(characterValidator.address, coreIds);
      await tx.wait();
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
        "bafybeiaoscozgkq6wczqbig74t7e3kgu5ikyp3frabso5ckjockootc4ke", // head
        "bafybeigv7y7cvlgr3z4f7oabtyzi5vk74fcqjzfulwsdoi6h4beqlbhgp4", // torso
        "bafybeic6vuf2l6ouwg5xnzvi4zqff4ov6woqlhj54urrhatfjunmobsuxm", // larm
        "bafybeihp5hq6deugx4ejx6xpiibbb6vbty6anrbotp7h4he76tsjmzsqyi", // rarm
        "bafybeig5tb5rxqof5zxp2bolr5dqxhjwc7fqgprng2wc2zu5zhzncxhw5u", // lleg
        "bafybeich2xydybqqxx53sucuswdohm4764boxcqqxywkf27frtnc5f2vr4", // rleg
        "arctic", // color
        "bafybeiauxnajd2vno6dtkbr64qnksjolfoolj7sgiiz6w5aguc3gfrdsqe", // crown
        "bafybeiab7wr5ynymlxqx4ja2kc4t5lnqne37aifcsihyz4qclazimdm3kq", // mask
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
      const receipt = await tx.wait();
      const events = receipt.events?.filter((x) => {return x.event == "CharacterCreated"})[0];
      const characterId = events && events.args ? events.args._id: 0;
      const skeleton = await character.getSkeleton(characterId);
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
      const receipt = await tx.wait();
      const events = receipt.events?.filter((x) => {return x.event == "CharacterCreated"})[0];
      const characterId = events && events.args ? events.args._id: 0;
      console.log("CharacterID", characterId);
      let equipment = await characterValidator.getEquipment(characterId);
      console.log(equipment);
      expect(equipment).to.include("bafybeifckzrhfjvn43i5tg7fmj4i4gxsq23didycjb5rqp7mnsit66bolu");
      expect(equipment).to.include("bafybeiajpeg6pudygrpzrj2sdpv7oxn2ft5kae5kdk5aozmzexcqiuvg5i");
      expect(equipment).to.include("bafybeiazjnlqqzdtvgldraz4braapf3ztm6azu3ty2eggmgsgzvrqwcl2e");
      expect(equipment).to.include("bafybeibsuqdacaii6yz3tc2h3znecoum6zah7iiyipa5zegjyiw7axm2yi");
      expect(equipment).to.include("bafybeie4amx642ryrag5twlztpy4kw5hdheo75hbtkxjilqciypgrbobma");
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
        "Aateos",
        "Patcher",
        "Diamond Hands",
        "None",
        "bafybeiaoscozgkq6wczqbig74t7e3kgu5ikyp3frabso5ckjockootc4ke", // head
        "bafybeigv7y7cvlgr3z4f7oabtyzi5vk74fcqjzfulwsdoi6h4beqlbhgp4", // torso
        "bafybeic6vuf2l6ouwg5xnzvi4zqff4ov6woqlhj54urrhatfjunmobsuxm", // larm
        "bafybeiauo73tlthvqp3vem5crjkmdko2vg4dhhgrhox2wu756xkrxshbse", // rarm
        "bafybeig5tb5rxqof5zxp2bolr5dqxhjwc7fqgprng2wc2zu5zhzncxhw5u", // lleg
        "bafybeich2xydybqqxx53sucuswdohm4764boxcqqxywkf27frtnc5f2vr4", // rleg
        "arctic", // color
        "bafybeiauxnajd2vno6dtkbr64qnksjolfoolj7sgiiz6w5aguc3gfrdsqe", // crown
        "bafybeiab7wr5ynymlxqx4ja2kc4t5lnqne37aifcsihyz4qclazimdm3kq", // mask
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
    it("Can mint an avatar with a Degenerators Faction if holding the correct legacy pill", async () => {
      tx = await nift.mintBatch(owner, [mockKirbonitePill], [1], ethers.constants.HashZero);
      const legacyPills: BigNumber[] = [
        mockKirbonitePill,
        BigZero,
        BigZero,
        BigZero,
        BigZero,
      ];
      const collabPills: number[] = [0, 0, 0, 0, 0];
      const traitsplus: string[] = [
        "Pepel",
        "Aateos",
        "Interstellar Nomad",
        "Galaxy Brain",
        "Degenerators",
        "bafybeif4roaeohve22gj6xkchsdareyjwshyfkrrhiu3odqrvxukftguba",
        "bafybeicdchpng53briinhnrqq54ozr2vmyd7cvwu2wndtcz4sfiugdvyxm",
        "lime",
        "bafybeiggzxrzkneefcqy3gg4yzgi346nk3l4vd5dbg2atw4xsg4iezp2yi"
      ] as string[];
      await tx.wait();
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint an avatar with a RATS Faction if holding the correct legacy pill", async () => {
      tx = await nift.mintBatch(owner, [mockRATSPill], [1], ethers.constants.HashZero);
      const legacyPills: BigNumber[] = [
        mockRATSPill,
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
        "RATStribe",
        "bafybeif4roaeohve22gj6xkchsdareyjwshyfkrrhiu3odqrvxukftguba",
        "bafybeicdchpng53briinhnrqq54ozr2vmyd7cvwu2wndtcz4sfiugdvyxm",
        "lime",
        "bafybeiggzxrzkneefcqy3gg4yzgi346nk3l4vd5dbg2atw4xsg4iezp2yi"
      ] as string[];
      await tx.wait();
      tx = await characterValidator.createCharacter(
        legacyPills,
        collabPills,
        traitsplus
      );
    });
    it("Can mint an avatar with a Shadowpak Pills if holding the correctlegacy pill", async () => {
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
