/* global artifacts, it, assert */
/* eslint-disable prefer-reflect */
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { AuctionValidator, Core1155 } from "../typechain-types/";
import { expect } from "chai";
import {
  deployCore1155,
  deployMock1155,
  deployAuctionValidator,
} from "./shared/deploys";

const coreId = 1;

const id1 = 1;
const id2 = 2;
const id3 = 3;
const amount = 1;

// Replace magic numbers

describe("AuctionValidator", () => {
  let owner: SignerWithAddress, user1: SignerWithAddress;
  before(async () => {
    [owner, user1] = await ethers.getSigners();
  });
  describe("isValid", () => {
    let core: Core1155, nift, validator: AuctionValidator, receipt;
    // This is horribly inneficient, probably don't redeploy these each time?
    beforeEach(async () => {
      // We get the contract to deploy
      core = (await deployCore1155()) as Core1155;
      nift = await deployMock1155();
      await nift.mint(id1, owner.address, amount);
      await nift.mint(id2, owner.address, amount);
      await nift.mint(id3, owner.address, amount);
      // In production instances the IDs must line up correctly
      validator = (await deployAuctionValidator(core)) as AuctionValidator;
      const blockNumBefore = await ethers.provider.getBlockNumber();
      const blockBefore = await ethers.provider.getBlock(blockNumBefore);
      const timestampBefore = blockBefore.timestamp;
      receipt = await core.addValidator(validator.address, [coreId]);
      validator.createDrop(
        coreId,
        10000,
        timestampBefore,
        timestampBefore + 10000000,
        blockNumBefore + 100
      );
    });
    it("Can place a bid", async () => {
      receipt = await validator.addBid(1, owner.address, { value: 10 });
      //await network.provider.send("evm_setNextBlockTimestamp", [1636150000])
    });
    it("Can retrieve a big after it's placed", async () => {
      receipt = await validator.getBid(1, owner.address);
    });
    it("Can Set Winner", async () => {
      await ethers.provider.send("evm_increaseTime", [10000000]);
      await ethers.provider.send("evm_mine", []);
      receipt = await validator.setWinner(1, owner.address);
    });
    it("Can't bid after winner is set", async () => {});
    it("can claim winning bid", async () => {
      await ethers.provider.send("evm_increaseTime", [10000000]);
      await ethers.provider.send("evm_mine", []);
      receipt = await validator.setWinner(1, owner.address);
      await ethers.provider.send("evm_increaseTime", [1000]);
      await ethers.provider.send("evm_mine", []);
      receipt = await validator.claimAuction(1);
    });
    it("can't place a bid if there isn't enough deposit", async () => {
      await expect(validator.addBid(1, owner.address)).to.be.revertedWith(
        "Sorry, that's not enough for the deposit"
      );
    });
    it("can't declare a winner if the end time hasn't passed", async () => {
      await ethers.provider.send("evm_increaseTime", [1000]);
      await ethers.provider.send("evm_mine", []);
      await expect(validator.setWinner(1, owner.address)).to.be.revertedWith(
        "SEQ_DROP_TIME_EARLY"
      );
    });

    it("can't claim the winning bid if you arn't a winner", async () => {
      receipt = await validator.addBid(1, owner.address, { value: 10 });
      await ethers.provider.send("evm_increaseTime", [10000000]);
      await ethers.provider.send("evm_mine", []);
      receipt = await validator.setWinner(1, owner.address);
      await ethers.provider.send("evm_increaseTime", [1000]);
      await ethers.provider.send("evm_mine", []);
      await expect(validator.connect(user1).claimAuction(1)).to.be.revertedWith(
        "Sorry your bid is not a winner bb, get ur weight up"
      );
    });
    /*
    it("can claim winning bid (5 players)", async () => {
      receipt = await validator.setWinner(1, owner.address);      
      await ethers.provider.send('evm_increaseTime', [1000]);
      await ethers.provider.send('evm_mine');   
      receipt = await validator.claimAuction(1);
    });
    it("can't claim the winning bid if you arn't a winner (5 players)", async () => {
      receipt = await validator.setWinner(1, owner.address);      
      await ethers.provider.send('evm_increaseTime', [1000]);
      await ethers.provider.send('evm_mine');   
      receipt = await validator.claimAuction(1);
    });*/
  });
});
