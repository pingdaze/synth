/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { artifacts, web3, contract } = require("hardhat");
import { assert } from "chai";
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

const Registry = artifacts.require("MetadataRegistry.sol");

const toBN = (x: string | number) => web3.utils.toBN(x);

contract("MetadataRegistry", (addresses) => {
  const user1 = addresses[0];
  let registry;
  const metadata = "hello world";
  const id = toBN(0);
  const badId = toBN(1);
  it("deploys", async () => {
    registry = await Registry.new();
  });
  it("can set metadata", async () => {
    const receipt = await registry.set(0, "hello world");
    expectEvent(receipt, "Register", { id, metadata });
  });
  it("can get metadata", async () => {
    const md = await registry.get(id);
    assert.equal(md, metadata);
  });
  it("reverts if metadata doesn't exist", async () => {
    await expectRevert(registry.get(badId), "MISSING_URI");
  });
  it("only allows owner to set metadata", async () => {
    await expectRevert(
      registry.set(id, "hello Mars", { from: user1 }),
      "Ownable: caller is not the owner"
    );
  });
});
