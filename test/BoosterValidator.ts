import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { web3, ethers } from "hardhat";
import { expect } from "chai";
import {
  BoosterValidator,
  Core1155,
  LinkMock,
  VRFCoordinatorMock,
} from "../typechain-types";
import {
  deployCore1155,
  deployLink,
  deployCoordinator,
  deployBoosterValidator,
} from "./shared/deploys";
const zeroAddress = "0x0000000000000000000000000000000000000000";

const id = 1;
const amount = 5;
const startTime = 0;
const endTime = Math.floor(Date.now() / 1000 + 100000000000);
const getEndBlock = async () => (await web3.eth.getBlockNumber()) + 100;

describe("BoosterValidator", () => {
  let owner: SignerWithAddress, user1: SignerWithAddress;
  let validator: BoosterValidator;
  before(async () => {
    [owner, user1] = await ethers.getSigners();
  });

  describe("createDrop", () => {
    let core: Core1155;
    let link: LinkMock;
    let coordinator: VRFCoordinatorMock;
    let endBlock: number;
    before(async () => {
      endBlock = await getEndBlock();
      core = (await deployCore1155()) as Core1155;
      link = (await deployLink()) as LinkMock;
      coordinator = (await deployCoordinator(link)) as VRFCoordinatorMock;
      validator = (await deployBoosterValidator(
        core,
        coordinator,
        link
      )) as BoosterValidator;
      await validator.createDrop(
        [id],
        [100],
        zeroAddress,
        0,
        startTime,
        endTime,
        endBlock
      );
    });
    it("can create a drop", async () => {
      const drop = await validator.drops(0);
      // Splitting these out into seperate getters was the cleanest way I could
      // find of pulling arrays out of the struct - research better approach?
      const ids = await validator.getDropIds(0);
      const odds = await validator.getDropOdds(0);
      expect(ids[0]).to.equal(id);
      expect(odds[0]).to.equal(100);
      expect(drop.paymentToken).to.equal(zeroAddress);
      expect(drop.packCost).to.equal(0);
      expect(drop.startTime).to.equal(startTime);
      expect(drop.endTime).to.equal(endTime);
      expect(drop.endBlock).to.equal(endBlock);
    });
    it("fails if drop exists", async () => {
      await expect(
        validator.createDrop(
          [id],
          [100],
          zeroAddress,
          0,
          startTime,
          endTime,
          endBlock
        )
      ).to.revertedWith("BOOST_DROP_DUPLICATE_DROP");
    });
  });
  describe("isValid", () => {
    let core: Core1155;
    let link: LinkMock;
    let coordinator: VRFCoordinatorMock;
    let endBlock: number;
    beforeEach(async () => {
      endBlock = await getEndBlock();
      core = (await deployCore1155()) as Core1155;
      link = (await deployLink()) as LinkMock;
      coordinator = (await deployCoordinator(link)) as VRFCoordinatorMock;
      validator = (await deployBoosterValidator(
        core,
        coordinator,
        link
      )) as BoosterValidator;
      await core.addValidator(core.address, [id]);
      link
        .mint(validator.address, web3.utils.toWei("100"))
        .catch((error) => console.error(error));
      coordinator.setConsumer(validator.address);
    });
    it("returns true if a mint request is valid", async () => {
      await validator.createDrop(
        [id],
        [100],
        zeroAddress,
        0,
        startTime,
        endTime,
        endBlock
      );
      await validator.validate(user1.address, 0, [1], "", []);
    });
    it("fails if more than one type of token is requested", async () => {
      await validator.createDrop(
        [id],
        [100],
        zeroAddress,
        0,
        startTime,
        endTime,
        endBlock
      );
      await expect(
        validator.validate(user1.address, 0, [1, 1], "", [])
      ).to.be.revertedWith("BOOST_DROP_REQUEST_AMOUNTS_LENGTH");
    });
  });
  describe("Mints Tokens", () => {
    let core: Core1155;
    let link: LinkMock;
    let coordinator: VRFCoordinatorMock;
    let endBlock: number;
    before(async () => {
      endBlock = await getEndBlock();
      core = (await deployCore1155()) as Core1155;
      link = (await deployLink()) as LinkMock;
      coordinator = (await deployCoordinator(link)) as VRFCoordinatorMock;
      validator = (await deployBoosterValidator(
        core,
        coordinator,
        link
      )) as BoosterValidator;
      await validator.createDrop(
        [id],
        [100],
        zeroAddress,
        0,
        startTime,
        endTime,
        endBlock
      );
      await core.addValidator(validator.address, [id]);
      link.mint(validator.address, web3.utils.toWei("100"));
      coordinator.setConsumer(validator.address);
    });
    it("mints tokens to a EOA with 100% odds", async () => {
      const initialMintedQuantity = await core.quantityMinted(id);

      const tx = await core.modularMintInit(
        0,
        user1.address,
        [amount],
        ethers.constants.HashZero,
        validator.address,
        ""
      );
      const receipt = await tx.wait();
      // TODO: Turn this into a helper
      /*
    let abi = [ "event RequestId(bytes32 requestId)" ];
    let iface = new ethers.utils.Interface(abi);
    console.log(iface.parseLog(receipt.logs[3]));
    */
      await coordinator.callBackWithRandomness(
        receipt.logs[3].data,
        12341234,
        validator.address
      );

      const balance = await core.balanceOf(user1.address, id);
      expect(balance).to.equal(amount);
      const updatedMintedQuantity = await core.quantityMinted(id);
      const newlyMintedQuantity = updatedMintedQuantity.sub(
        initialMintedQuantity
      );
      expect(newlyMintedQuantity).to.equal(amount);
    });
  });
});
