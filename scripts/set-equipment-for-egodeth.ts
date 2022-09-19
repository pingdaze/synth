import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import { WearablesValidator } from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"
import { BigNumber } from "ethers";


const genesisID2CID: { [key:string]: string } = {
  "57896044618658097711785492504343953926975274699741220483210613355462042583041": "bafybeigqylpzijo4mctzudsicr7mcef7kqbby6zwvfw3cbeuopxerjn72a",
  "57896044618658097711785492504343953926975274699741220483229060099535752134657": "bafybeicygd5w7syfxj4q3a4n3hutdgprnmdhzxy5nzbbs4nqyzfx5j2som",
  "57896044618658097711785492504343953926975274699741220483247506843609461686273": "bafybeib32h5xe3rhw5ic33nhs22sii3m7vllwmd5hf2bvvuazq3w5iwrxq",
  "57896044618658097711785492504343953926975274699741220483265953587683171237889":  "bafybeiez2jha3vt5437w5hop46kpsrsodeknymjauuvay45xquc5yxu6wq",
  "57896044618658097711785492504343953926975274699741220483284400331756880789505":  "bafybeibre4j76punvple4acykw5bp6q7muhvys35j5yjftns7pi7fobymq",
  "57896044618658097711785492504343953926975274699741220483302847075830590341121":  "bafybeicqqoxsfjdbh25szxcndpcuygqakjy7pcsrqedseznasgzw4sw5zm",
  "57896044618658097711785492504343953926975274699741220483321293819904299892737":  "bafybeiaxvtk73rkmw6hewq37tejg55qdmputdybtiasjhgorjltdvfehau",
  "57896044618658097711785492504343953926975274699741220483339740563978009444353":  "bafybeif7x4se4ed7mofoyyz7hsmyld4elz3c2ydh5ehgo3vyi3x56ped4a",
  "57896044618658097711785492504343953926975274699741220483358187308051718995969":  "bafybeiabw6dyoljugbiaatz3ku5qspflcd5zd5lemw4nwbvbyar5twlzf4",
  "57896044618658097711785492504343953926975274699741220483376634052125428547585":  "bafybeig5nityrmrykklj7slsi3ioxlnql5upyfrp3spozqvayj5x3nvrtu"
}



// Replace magic numbers
async function main() {
  let owner: SignerWithAddress, user1: SignerWithAddress, receipt;
  [owner, user1] = await ethers.getSigners();
  const hashmonkForm = BigNumber.from(0);
  const pepelForm = BigNumber.from(1);
  let wearablesValidator: WearablesValidator;
  console.log("Current Network: " + network.name);

  console.log("Testing deploy to " + network.name);
  //await deployToTestnet();
  [owner, user1] = await ethers.getSigners();
  console.log("Signing as " + owner.address);
  wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.ArbRinkeby.WearablesValidator) as WearablesValidator;

  for(let id in genesisID2CID) {
    receipt = await wearablesValidator.setIdtoStringPill(BigNumber.from(id), pepelForm,  genesisID2CID[id], {gasLimit: 1000000});
    await receipt.wait();

    receipt = await wearablesValidator.setIdtoStringPill(BigNumber.from(id), hashmonkForm,  genesisID2CID[id], {gasLimit: 1000000});
    await receipt.wait();

  }

  console.log("Done");
  
}


  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});