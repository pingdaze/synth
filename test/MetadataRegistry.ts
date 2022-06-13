export {};
/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
import {ethers} from "hardhat";
import {expect, assert} from "chai";
import {MetadataRegistry} from "../typechain-types/contracts/MetadataRegistry.sol";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {deployRegistry} from "./shared/deploys"


describe("MetadataRegistry", async () => {

  let user2: SignerWithAddress, user1: SignerWithAddress;
  const registry = await deployRegistry() as MetadataRegistry;
  [user1, user2] = await ethers.getSigners();

  const metadata = "hello world";
  const id = 0;
  const badId = 1;
  it("deploys", async () => {
    const testRegistry = await deployRegistry();
  });
  it("can set metadata", async () => {

    await expect(registry.set(0, "hello world"))
    .to.emit(registry, "Register")
    .withArgs(id, metadata);
    
  });
  it("can get metadata", async () => {
    const md = await registry.get(id);
    assert.equal(md, metadata);
  });
  it("reverts if metadata doesn't exist", async () => {
    expect(registry.get(badId)).to.be.revertedWith( "MISSING_URI");
  });
  it("only allows owner to set metadata", async () => {
    expect(
    registry.connect(user2).set(id, "hello Mars")).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });
  describe("setMultiple", () => {
    it("accepts multiple entries", async () => {
      const keys = [1, 2, 3, 4];
      const values = ["Hi", "mom", "from", "space"];
      await registry.setMultiple(keys, values);
      keys.forEach(async (k, i) => {
        expect(await registry.get(k)).to.equal(
          values[i]
        );
      });
    });
  });
});
