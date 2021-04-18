/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
const { artifacts, web3, contract } = require("hardhat");
import { assert } from "chai";
console.log(artifacts.require);
const Collectible = artifacts.require("Collectible2.sol");

let zeroAddress = "0x0000000000000000000000000000000000000000";

contract("Collectible2", () => {
  describe("Deployment", () => {
    it("should pass", () => {
      assert.isTrue(true);
    });
    it("should Deploy", async () => {
      await Collectible.new(zeroAddress, "");
    });
  });
});
