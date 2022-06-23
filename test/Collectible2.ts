export {};
/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */

import { ethers } from "hardhat";
import { expect } from "chai";
import { Core1155 } from "../typechain-types/contracts/Core1155";
import { BasicValidator } from "../typechain-types/contracts/test/BasicValidator";
import { MetadataRegistry } from "../typechain-types/contracts/MetadataRegistry.sol";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  deployCore1155,
  deployBasicValidator,
  deployHolder,
  deployRegistry,
} from "./shared/deploys";

const zeroAddress = ethers.constants.AddressZero;

const amount = 5;
const id1 = 0;
const id2 = 1;
const id3 = 2;
const id4 = 3;
const badID = 10;

describe("Core", () => {
  let user2: SignerWithAddress, user1: SignerWithAddress;
  let validator: BasicValidator;
  let registry: MetadataRegistry;
  before(async () => {
    [user1, user2] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("deploys", async () => {
      const core = await deployCore1155();
      // sanity check
      expect(core.owner()).not.to.equal(zeroAddress);
    });
  });
  describe("Validators", () => {
    let core: Core1155;
    let validator: BasicValidator;
    before(async () => {
      core = (await deployCore1155()) as Core1155;
      // We create this validator with ID3 as the first two tests don't require
      // actual minting
      validator = (await deployBasicValidator(id3, core)) as BasicValidator;
    });
    it("can add a validator", async () => {
      const tx = await core.addValidator(validator.address, [id1]);
      const receipt = await tx.wait();
      expect(core.addValidator(validator.address, [id1]))
        .to.emit(core, "Validator")
        .withArgs(validator.address, true);
      expect(await core.isValidator(validator.address)).to.equal(true);
    });
    it("can remove a validator", async () => {
      expect(await core.isValidator(validator.address)).to.equal(true);
      expect(core.removeValidator(validator.address))
        .to.emit(validator, "Validator")
        .withArgs(validator.address, false);
      expect(await core.isValidator(validator.address)).to.equal(false);
    });
    describe("modular mint", () => {
      const amount = 5;
      const id = 0;
      it("reverts if passed an inactive Validator Address", async () => {
        expect(
          core.modularMintInit(id, user1.address, [amount], "", zeroAddress, "")
        ).to.be.revertedWith("BAD_VALIDATOR");
      });
      it("reverts if the validator doesn't succeed", async () => {
        const badValidator = await deployBasicValidator(badID, core);
        await core.addValidator(badValidator.address, [id2]);
        expect(
          core.modularMintInit(
            badID,
            user1.address,
            [amount],
            "",
            badValidator.address,
            ""
          )
        ).to.be.revertedWith("INVALID_MINT");
      });
      it("mints tokens to a contract", async () => {
        const holder = await deployHolder();
        await core.addValidator(validator.address, [id3]);
        const initialMintedQuantity = await core.quantityMinted(id3);
        await expect(
          core.modularMintInit(
            id3,
            holder.address,
            [amount],
            ethers.constants.HashZero,
            validator.address,
            ""
          )
        )
          .to.emit(core, "TransferBatch")
          .withArgs(
            validator.address,
            zeroAddress,
            holder.address,
            [id3],
            [amount]
          );
        /*
        const balance = await core.balanceOf(holder.address, id3);
        expect(balance).to.equal(amount);
        const updatedMintedQuantity = await core.quantityMinted(id3);
        const newlyMintedQuantity =
          updatedMintedQuantity.sub(initialMintedQuantity);
        expect(newlyMintedQuantity).to.equal(amount);*/
      });
      it("mints tokens to an EOA", async () => {
        const initialMintedQuantity = await core.quantityMinted(id3);

        const tx = await expect(
          core.modularMintInit(
            id3,
            user1.address,
            [amount],
            ethers.constants.HashZero,
            validator.address,
            ""
          )
        )
          .to.emit(core, "TransferBatch")
          .withArgs(
            validator.address,
            zeroAddress,
            user1.address,
            [id3],
            [amount]
          );

        const balance = await core.balanceOf(user1.address, id3);
        expect(balance).to.equal(amount);
        const updatedMintedQuantity = await core.quantityMinted(id3);
        const newlyMintedQuantity = updatedMintedQuantity.sub(
          initialMintedQuantity
        );
        expect(newlyMintedQuantity).to.equal(amount);
      });
    });
  });
  describe("batch minting", () => {
    it("can mint batches of tokens", async () => {
      const core = await deployCore1155();
      const tx = await expect(core.mintBatch(user1.address, [id4], [amount], 0))
        .to.emit(core, "TransferBatch")
        .withArgs(user1.address, zeroAddress, user1.address, [id4], [amount]);

      expect(await core.balanceOf(user1.address, id4)).to.equal(5);
    });
    it("can only be utilized by owners", async () => {
      const core = await deployCore1155();
      expect(
        core.connect(user2).mintBatch(user1.address, [id4], [amount], 0)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
  describe("uri", () => {
    it("reverts without a valid registry", async () => {
      const core = await deployCore1155();
      expect(core.uri(0)).to.be.reverted;
    });
    it("reverts if metadata is not set", async () => {
      registry = (await deployRegistry()) as MetadataRegistry;
      const core = await deployCore1155(
        "https://pillz.club/",
        registry.address
      );
      expect(registry.get(0)).to.be.revertedWith("MISSING_URI");
    });
    it("can get a valid URI entry", async () => {
      const base = "https://pillz.club/";
      const metadata = "abc123";
      const registry = await deployRegistry();
      await registry.set(0, metadata);
      const core = await deployCore1155(base, registry.address);
      const uri = await core.uri(0);
      expect(uri).to.equal(base + metadata);
    });
  });
});
