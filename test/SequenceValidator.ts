/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { artifacts, web3, contract } = require("hardhat");
import { assert } from "chai";
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
const Collectible = artifacts.require("Collectible2.sol");
const BoolValidator = artifacts.require("BoolValidator.sol");
const HolderContract = artifacts.require("CollectibleHolder.sol");
const Registry = artifacts.require("MetadataRegistry.sol");
const SequenceValidator = artifacts.require("SequenceValidator.sol");

const zeroAddress = "0x0000000000000000000000000000000000000000";
const burnerAddress = "0x0000000000000000000000000000000000000001";

const toBN = (x) => web3.utils.toBN(x);

const id = 1;
const amount = 5;
const startTime = 0;
const endTime = Math.floor(Date.now() / 1000 + 1000);
const getEndBlock = async () => (await web3.eth.getBlockNumber()) + 100;

const deployToken = async (
  original = zeroAddress,
  baseUri = "",
  registry = zeroAddress
) => {
  return Collectible.new(original, baseUri, registry);
};

contract("SequenceValidator", (addresses) => {
  describe("createDrop", () => {
    it("can create a drop", async () => {
      const endBlock = await getEndBlock();
      console.log("time: ", endTime);
      const token = await deployToken();
      const C = await SequenceValidator.new(token.address);
      await C.createDrop(id, amount, startTime, endTime, endBlock);
      const drop = await C.drops(1);
      console.log(
        "drop: ",
        Object.values(drop).map((bn) => bn.toString()),
        drop
      );
      assert.equal(drop.collectibleId, id);
      assert.equal(drop.quantityAvailable, amount);
      assert.equal(drop.startTime, startTime);
      assert.equal(drop.endTime, endTime);
      assert.equal(drop.endBlock, endBlock);
    });
    it("fails if drop exists", async () => {
      const endBlock = await getEndBlock();
      const token = await deployToken();
      const C = await SequenceValidator.new(token.address);
      await C.createDrop(id, amount, startTime, endTime, endBlock);
      await expectRevert(
        C.createDrop(id, amount, startTime, endTime, endBlock),
        "SEQ_DROP_DUPLICATE_DROP"
      );
    });
  });
  describe("isValid", () => {
    it("returns true if a mint request is valid", async () => {
      const endBlock = await getEndBlock();
      const token = await deployToken();
      const C = await SequenceValidator.new(token.address);
      await C.createDrop(id, amount, startTime, endTime, endBlock);
      await C.isValid(zeroAddress, id, 1, "", []);
    });
    it("fails if more than one token is requested", async () => {
      const endBlock = await getEndBlock();
      const token = await deployToken();
      const C = await SequenceValidator.new(token.address);
      await C.createDrop(id, amount, startTime, endTime, endBlock);
      await expectRevert(
        C.isValid(zeroAddress, id, 2, "", []),
        "SEQ_DROP_LIMIT_ONE"
      );
    });
    it("fails if the request would exceed that available quantity", async () => {
      const endBlock = await getEndBlock();
      const token = await deployToken();
      const C = await SequenceValidator.new(token.address);
      await C.createDrop(id, amount, startTime, endTime, endBlock);
      await expectRevert(
        C.isValid(zeroAddress, id, 6, "", []),
        "SEQ_DROP_MAX_QUANTITY"
      );
    });
  });
});
