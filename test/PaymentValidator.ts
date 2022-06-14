
import {ethers, web3} from "hardhat";
import {expect} from "chai";

import {PaymentValidator, Core1155} from "../typechain-types/";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {deployPaymentValidator, deployCore1155} from "./shared/deploys";
const zeroAddress = "0x0000000000000000000000000000000000000000";

const coreId = 1;
// TODO: Use Ethers utils instead of web3
const cost = ethers.utils.parseEther("1");
const id1 = 1;
const amount = 1;



describe.only("PaymentValidator", () => {

  describe("isValid", () => {
    let owner: SignerWithAddress, user1: SignerWithAddress;
    let core: Core1155, validator : PaymentValidator, receipt;
    before(async () => {
      [owner, user1] = await ethers.getSigners();
    });
    // This is horribly inneficient, probably don't redeploy these each time?
    beforeEach(async () => {
        // We get the contract to deploy
        core = await deployCore1155() as Core1155;
        // In production instances the IDs must line up correctly
        validator = await deployPaymentValidator(core, coreId, cost) as PaymentValidator;
        const tx = await core.addValidator(validator.address, [coreId]);

        receipt = await tx.wait();
    });

    it("ensure the current validator is valid in core", async () => {
        let newValidator = await deployPaymentValidator(core, coreId, cost) as PaymentValidator;

        await expect(core.addValidator(newValidator.address, [2])).to.emit(core, "Validator")
        //expect(tx).to.emit(core, "Validator")
         expect(await core.isValidator(validator.address)).to.equal(true);
    });

    it("can purchase NFT", async () => {
        receipt = await validator.directSale(owner.address, 1, {value: cost});
         expect(await core.balanceOf(owner.address, coreId)).to.equal(1);
    });
    it("can purchase multiple NFTs", async () => {
        receipt = await validator.directSale(owner.address, 2, {value: web3.utils.toWei("2")});
         expect(await core.balanceOf(owner.address, coreId)).to.equal(2);
    });
    it("can't purchase NFTs beyond supply", async () => {
        expect(validator.directSale(owner.address, 10001, {value: web3.utils.toWei("10001")})).to.be.revertedWith("Not enough supply");
    });
    it("can't purchase if enough value isn't provided", async () => {
        expect(validator.connect(user1).directSale(user1.address, 1)).to.be.revertedWith("Sorry not enough ETH provided");
    });
  });
});
