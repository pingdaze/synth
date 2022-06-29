import { ethers } from "hardhat";
import { expect } from "chai";

import { Basic1155, Core1155, CheckerValidator } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  deployCheckerValidator,
  deployCore1155,
  deployMock1155,
} from "./shared/deploys";

const coreId = 1;

const id1 = 1;
const id2 = 2;
const id3 = 3;
const id4 = 4;
const amount = 1;

describe("CheckerValidator", () => {
  describe("isValid", () => {
    let owner: SignerWithAddress, user1: SignerWithAddress;
    let core: Core1155, nift: Basic1155, validator: CheckerValidator, receipt;
    before(async () => {
      [owner, user1] = await ethers.getSigners();
    });
    // This is horribly inneficient, probably don't redeploy these each time?
    beforeEach(async () => {
      // We get the contract to deploy
      core = (await deployCore1155()) as Core1155;
      nift = (await deployMock1155()) as Basic1155;
      await nift.mint(id1, owner.address, amount);
      await nift.mint(id2, owner.address, amount);
      await nift.mint(id3, owner.address, amount);
      // In production instances the IDs must line up correctly
      validator = (await deployCheckerValidator(
        core,
        nift,
        coreId
      )) as CheckerValidator;
      const tx = await core.addValidator(validator.address, [coreId]);

      receipt = await tx.wait();
    });
    it("Check signer has a nift balance", async () => {
      expect(await nift.balanceOf(owner.address, id1)).to.equal(amount);
    });
    it("ensure the current validator is valid in core", async () => {
      const newValidator = await deployCheckerValidator(core, nift, 2);

      await expect(core.addValidator(newValidator.address, [2])).to.emit(
        core,
        "Validator"
      );
      //expect(tx).to.emit(core, "Validator")
      expect(await core.isValidator(validator.address)).to.equal(true);
    });
    it("check redemption status", async () => {
      receipt = await validator.checkAllRedemption([id1, id2, id3]);
    });
    it("can redeem mocked 1155", async () => {
      receipt = await validator.redeemAll([id1]);
      expect(await core.balanceOf(owner.address, coreId)).to.equal(1);
    });
    it("Can't redeem without holding mocked 1155", async () => {
      expect(validator.connect(user1).redeemAll([id1])).to.be.revertedWith(
        "Sender must hold all tokens for migration"
      );
    });
    it("can redeem all ids", async () => {
      receipt = await validator.redeemAll([id1, id2, id3]);
      expect(await core.balanceOf(owner.address, coreId)).to.equal(3);
    });
    it("can redeem all ids, mint, then redeem again", async () => {
      receipt = await validator.redeemAll([id1]);
      await nift.mint([id4], owner.address, amount);
      receipt = await validator.redeemAll([id2, id3, id4]);
      expect(await core.balanceOf(owner.address, coreId)).to.equal(4);
    });
    it("can't redeem the same id twice", async () => {
      receipt = await validator.redeemAll([id1]);
      expect(validator.redeemAll([id1])).to.be.revertedWith(
        "Token has already been redeemed"
      );
    });
  });
});
