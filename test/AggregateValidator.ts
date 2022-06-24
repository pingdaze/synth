import { ethers } from "hardhat";
import { expect } from "chai";

import {
  PaymentValidator,
  AggregateValidator,
  MultiRolesAuthority,
  CheckerValidator,
  Core1155,
  Basic1155,
} from "../typechain-types/";
import AggregateValidatorABI from "../artifacts/contracts/validators/AggregateValidator.sol/AggregateValidator.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  deployPaymentValidatorV2,
  deployMultiAuth,
  deployCheckerValidatorV2,
  deployMock1155,
  deployCore1155,
  deployAggregateValidator,
} from "./shared/deploys";

const coreId = 1;
// TODO: Use Ethers utils instead of web3
const cost = ethers.utils.parseEther("1");
const supply = 10000;
const id1 = 1;
const id2 = 2;
const id3 = 3;
const amount = 1;
const mintRole = 1;

describe("AggregateValidator", () => {
  describe("isValid", () => {
    let owner: SignerWithAddress,
      user1: SignerWithAddress,
      checker: CheckerValidator,
      payments: PaymentValidator,
      authority: MultiRolesAuthority;
    let core: Core1155, validator: AggregateValidator, nift: Basic1155, receipt;
    before(async () => {
      [owner, user1] = await ethers.getSigners();
    });
    // This is horribly inneficient, probably don't redeploy these each time?
    beforeEach(async () => {
      // We get the contract to deploy; setting up core and authority
      core = (await deployCore1155()) as Core1155;
      authority = (await deployMultiAuth(owner.address)) as MultiRolesAuthority;
      validator = (await deployAggregateValidator(
        core,
        coreId,
        supply,
        authority
      )) as AggregateValidator;
      // Deploy the checkers that we're going to aggregate
      payments = (await deployPaymentValidatorV2(
        validator,
        coreId,
        cost
      )) as PaymentValidator;
      // Deploy Checker Validator
      nift = (await deployMock1155()) as Basic1155;
      await nift.mint(id1, owner.address, amount);
      await nift.mint(id2, owner.address, amount);
      await nift.mint(id3, owner.address, amount);
      // In production instances the IDs must line up correctly
      checker = (await deployCheckerValidatorV2(
        validator,
        nift,
        coreId
      )) as CheckerValidator;
      // Setup all of the authorities for the aggregator
      const AggregateInterface = new ethers.utils.Interface(
        AggregateValidatorABI.abi
      );
      const aggregateSig = AggregateInterface.getSighash(
        AggregateInterface.getFunction("modularMintCallback")
      );

      authority.setUserRole(payments.address, mintRole, true);
      authority.setUserRole(checker.address, mintRole, true);
      authority.setRoleCapability(mintRole, aggregateSig, true);
      validator.setAuthority(authority.address);
      // Finally we deploy the main aggregate validator and attach it to core
      const tx = await core.addValidator(validator.address, [coreId]);
      receipt = await tx.wait();
    });

    it("ensure the current validator is valid in core", async () => {
      const newValidator = (await deployAggregateValidator(
        core,
        coreId,
        supply,
        authority
      )) as AggregateValidator;

      await expect(core.addValidator(newValidator.address, [2])).to.emit(
        core,
        "Validator"
      );
      expect(await core.isValidator(validator.address)).to.equal(true);
    });
    it("can purchase NFT", async () => {
      receipt = await payments.directSale(owner.address, 1, { value: cost });
      expect(await core.balanceOf(owner.address, coreId)).to.equal(1);
    });
    it("can redeem mocked 1155", async () => {
      receipt = await checker.redeemAll([id1]);
      expect(await core.balanceOf(owner.address, coreId)).to.equal(1);
    });
  });
});
