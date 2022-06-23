import { ethers } from "hardhat";
import { expect } from "chai";
import { SequenceValidator } from "../typechain-types/contracts/validators/SequenceValidator";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Core1155 } from "../typechain-types/contracts/Core1155";
import { deploySequenceValidator, deployCore1155 } from "./shared/deploys";

const id = 1;
const amount = 5;
const startTime = 0;
const endTime = Math.floor(Date.now() / 1000 + 1000000000);
const getEndBlock = async () => (await ethers.provider.getBlockNumber()) + 100;

describe("SequenceValidator", () => {
  let user1: SignerWithAddress;
  let validator: SequenceValidator;
  let core: Core1155;
  before(async () => {
    [user1] = await ethers.getSigners();
    core = (await deployCore1155()) as Core1155;
    validator = (await deploySequenceValidator(core)) as SequenceValidator;
  });
  describe("createDrop", () => {
    it("can create a drop", async () => {
      const endBlock = await getEndBlock();
      await validator.createDrop(id, amount, startTime, endTime, endBlock);
      const drop = await validator.drops(1);
      expect(drop.collectibleId).to.equal(id);
      expect(drop.quantityAvailable).to.equal(amount);
      expect(drop.startTime).to.equal(startTime);
      expect(drop.endTime).to.equal(endTime);
      expect(drop.endBlock).to.equal(endBlock);
    });
    it("fails if drop exists", async () => {
      const endBlock = await getEndBlock();
      expect(
        validator.createDrop(id, amount, startTime, endTime, endBlock)
      ).to.be.revertedWith("SEQ_DROP_DUPLICATE_DROP");
    });
  });
  describe("isValid", () => {
    let validator: SequenceValidator;

    let endBlock: number;
    before(async () => {
      endBlock = await getEndBlock();
      validator = (await deploySequenceValidator(core)) as SequenceValidator;
      await core.addValidator(validator.address, [id]);
      await validator.createDrop(id, amount, startTime, endTime, endBlock);
    });
    it("returns true if a mint request is valid", async () => {
      await validator.validate(user1.address, [id], [1], "", []);
    });
    it("fails if more than one token is requested", async () => {
      expect(
        validator.validate(user1.address, [id], [2], "", [])
      ).to.be.revertedWith("SEQ_DROP_LIMIT_ONE");
    });
    it("fails if the request would exceed that available quantity", async () => {
      expect(
        validator.validate(user1.address, [id], [6], "", [])
      ).to.be.revertedWith("SEQ_DROP_MAX_QUANTITY");
    });
  });
});
