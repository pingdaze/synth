/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { artifacts, web3, contract } = require("hardhat");
import { assert } from "chai";
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
const Collectible = artifacts.require("Collectible2.sol");
const BoolValidator = artifacts.require("BoolValidator.sol");
const HolderContract = artifacts.require("CollectibleHolder.sol");
const Registry = artifacts.require("MetadataRegistry.sol");

const zeroAddress = "0x0000000000000000000000000000000000000000";
const burnerAddress = "0x0000000000000000000000000000000000000001";

const toBN = (x) => web3.utils.toBN(x);

const amount = 5;
const id = 0;

contract("Collectible2", (addresses) => {
  const user1 = addresses[0];
  const deploy = async (
    original = zeroAddress,
    baseUri = "",
    registry = zeroAddress
  ) => {
    return Collectible.new(original, baseUri, registry);
  };
  describe("Deployment", () => {
    it("deploys", async () => {
      const C = await deploy();
      const original = await C.originalToken();
      assert.equal(original, zeroAddress);
      // sanity check
      assert.notEqual(await C.owner(), zeroAddress);
    });
  });
  describe("Validators", () => {
    let C, T;
    before(async () => {
      C = await deploy();
      T = await BoolValidator.new(true);
    });
    it("can add a validator", async () => {
      const receipt = await C.addValidator(T.address);
      expectEvent(receipt, "Validator", { validator: T.address, active: true });
      assert.equal(await C.isValidator(T.address), true);
    });
    it("can remove a validator", async () => {
      assert.equal(await C.isValidator(T.address), true);
      const receipt = await C.removeValidator(T.address);
      expectEvent(receipt, "Validator", {
        validator: T.address,
        active: false,
      });
      assert.equal(await C.isValidator(T.address), false);
    });
    describe("modular mint", () => {
      const amount = 5;
      const id = 0;
      it("reverts if passed an inactive Validator Address", async () => {
        await expectRevert(
          C.modularMint(id, user1, amount, 0x0, zeroAddress, ""),
          "BAD_VALIDATOR"
        );
      });
      it("reverts if the validator doesn't succeed", async () => {
        const F = await BoolValidator.new(false);
        await C.addValidator(F.address);
        await expectRevert(
          C.modularMint(id, user1, amount, 0x0, F.address, ""),
          "INVALID_MINT"
        );
      });
      it("mints tokens to a contract", async () => {
        const H = await HolderContract.new();
        await C.addValidator(T.address);
        const initialMintedQuantity = await C.quantityMinted(id);
        const receipt = await C.modularMint(
          id,
          H.address,
          amount,
          0x0,
          T.address,
          ""
        );
        const balance = await C.balanceOf(H.address, id);
        expectEvent(receipt, "TransferSingle", {
          from: zeroAddress,
          to: H.address,
          id: toBN(0),
          value: toBN(amount),
        });
        assert.equal(balance, amount);
        const updatedMintedQuantity = await C.quantityMinted(id);
        const newlyMintedQuantity =
          updatedMintedQuantity - initialMintedQuantity;
        assert.equal(newlyMintedQuantity, amount);
      });
      it("mints tokens to an EOA", async () => {
        const initialMintedQuantity = await C.quantityMinted(id);
        const receipt = await C.modularMint(
          id,
          user1,
          amount,
          0x0,
          T.address,
          ""
        );
        const balance = await C.balanceOf(user1, id);
        expectEvent(receipt, "TransferSingle", {
          from: zeroAddress,
          to: user1,
          id: toBN(0), //new BN(id),
          value: toBN(amount),
        });
        assert.equal(balance, amount);
        const updatedMintedQuantity = await C.quantityMinted(id);
        const newlyMintedQuantity =
          updatedMintedQuantity - initialMintedQuantity;
        assert.equal(newlyMintedQuantity, amount);
      });
    });
  });
  describe("migrate", () => {
    it("accepts migrated tokens", async () => {
      const oldToken = await deploy();
      const T = await BoolValidator.new(true);
      await oldToken.addValidator(T.address);
      const newToken = await deploy(oldToken.address, "");
      const receipt = await oldToken.modularMint(
        id,
        user1,
        amount,
        0x0,
        T.address,
        ""
      );
      const balance = await oldToken.balanceOf(user1, id);
      expectEvent(receipt, "TransferSingle", {
        from: zeroAddress,
        to: user1,
        id: toBN(0), //new BN(id),
        value: toBN(amount),
      });
      assert.equal(balance, amount);
      const receipt1 = await oldToken.setApprovalForAll(
        newToken.address,
        true,
        {
          from: user1,
        }
      );
      expectEvent(receipt1, "ApprovalForAll", {
        account: user1,
        operator: newToken.address,
        approved: true,
      });
      const initialMintedQuantity = await newToken.quantityMinted(id);
      const receipt2 = await newToken.migrate([id], [amount], { from: user1 });
      expectEvent(receipt2, "TransferBatch", {
        operator: newToken.address,
        from: user1,
        to: burnerAddress,
        ids: [toBN(id)],
        values: [toBN(amount)],
      });
      expectEvent(receipt2, "TransferBatch", {
        operator: user1,
        from: zeroAddress,
        to: user1,
        ids: [toBN(id)],
        values: [toBN(amount)],
      });
      assert.equal(await oldToken.balanceOf(burnerAddress, id), amount);
      const updatedMintedQuantity = await newToken.quantityMinted(id);
      const newlyMintedQuantity = updatedMintedQuantity - initialMintedQuantity;
      assert.equal(newlyMintedQuantity, amount);
    });
  });
  describe("batch minting", () => {
    it("can mint batches of tokens", async () => {
      const C = await deploy();
      const receipt = await C.mintBatch(user1, [id], [amount], 0);
      expectEvent(receipt, "TransferBatch", {
        from: zeroAddress,
        to: user1,
        ids: [toBN(id)],
        values: [toBN(amount)],
      });
      assert.equal(await C.balanceOf(user1, id), 5);
    });
    it("can only be utilized by owners", async () => {
      const C = await deploy();
      await expectRevert(
        C.mintBatch(user1, [id], [amount], 0, { from: user1 }),
        "Ownable: caller is not the owner"
      );
    });
  });
  describe("uri", () => {
    it("reverts without a valid registry", async () => {
      const C = await deploy();
      await expectRevert.unspecified(C.uri(0));
    });
    it("reverts if metadata is not set", async () => {
      const registry = await Registry.new();
      const C = await deploy(
        zeroAddress,
        "https://pillz.club/",
        registry.address
      );
      await expectRevert(registry.get(0), "MISSING_URI");
    });
    it("can get a valid URI entry", async () => {
      const base = "https://pillz.club/";
      const metadata = "abc123";
      const registry = await Registry.new();
      await registry.set(0, metadata);
      const C = await deploy(zeroAddress, base, registry.address);
      const uri = await C.uri(0);
      assert.equal(uri, base + metadata);
    });
  });
});
