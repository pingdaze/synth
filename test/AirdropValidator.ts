import { ethers } from "hardhat";
import { expect } from "chai";

import { Basic1155, Core1155, AirdropValidator } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  deployAirdropValidator,
  deployCore1155,
  deployMock1155,
} from "./shared/deploys";

const coreId = 1;

const id1 = 1;
const id2 = 2;
const id3 = 3;
const id4 = 4;
const amount = 1;

describe.only("AirdropValidator", () => {
  describe("isValid", () => {
    let owner: SignerWithAddress, user1: SignerWithAddress;
    let core: Core1155, nift: Basic1155, validator: AirdropValidator, receipt;
    before(async () => {
      [owner, user1] = await ethers.getSigners();
    });
    // This is horribly inneficient, probably don't redeploy these each time?
    beforeEach(async () => {
      // We get the contract to deploy
      core = (await deployCore1155()) as Core1155;

      // In production instances the IDs must line up correctly
      validator = (await deployAirdropValidator(
        core
      )) as AirdropValidator;
      const tx = await core.addValidator(validator.address, [coreId]);

      receipt = await tx.wait();
    });
    it("ensure the current validator is valid in core", async () => {
      const newValidator = await deployAirdropValidator(core);

      await expect(core.addValidator(newValidator.address, [2])).to.emit(
        core,
        "Validator"
      );
      //expect(tx).to.emit(core, "Validator")
      expect(await core.isValidator(validator.address)).to.equal(true);
    });
    it("can airdrop 1155", async () => {
      receipt = await validator.drop([owner.address], [1], id1);
      expect(await core.balanceOf(owner.address, coreId)).to.equal(1);
    });
  });
});
