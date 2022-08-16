import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { network, ethers } from "hardhat";
import { WearablesValidator } from "../typechain-types";
import charDeploymant from "./deploy-args/char-mock-deployment.json"
import { BigNumber } from "ethers";


const pillIDs =  Array.from({length: 15}, (v, k) => k);
const pillNames = [
  "genesis",
  "payback pill",
  "prodpill",
  "unipill",
  "hypepill",
  "rektpill",
  "memfruit",
  "synth_memwraith",
  "memricorn",
  "memsnake",
  "ratspill",
  "kirbonite",
  "shadowpak",
  "mirrorpill"
]

const legacyPillToId: { [key:string]: number} = {
  "genesis": 0x1,
  "payback pill": 0x2,
  "prodpill": 0x3,
  "unipill":  0x4,
  "hypepill":  0x5,
  "rektpill":  0x6,
  "memfruit":  0x7,
  "synth_memwraith":  0x8,
  "memricorn":  0x9,
  "memsnake":  0xA,
  "ratspill": 0xB,
  "kirbonite": 0xC,
  "shadowpak": 0xD,
  "mirrorpill":  0xE
}

const pepelCIDs: { [key:string]: string[] } = {
  "genesis": ["bafybeibfjlyibyafhrnjrx7bweluws5uefbvupatwx5vxgvpt6quxhfkoq"],
  "payback pill": [],
  "prodpill": ["bafybeidwnw43hvgat2ay32z44x7umjmhozjnpx3fiiybmmzux4rkh26foa"],
  "unipill":  ["bafybeicmx5opdhkaqvez4fu2us3mppmxlpijf7r565ciwl7mj4qmuuxxla"],
  "hypepill":  ["bafybeidoijj7uswvor6ldja2gadcmpwesgfkkfso3qxrr2zh7cf3djdkqy"],
  "rektpill":  [],
  "memfruit":  ["bafybeicchlrwxc5mixcx33forg5wxigd4l5ejminwzbb2ifuhksgl7psky"],
  "synth_memwraith":  ["bafybeiazjnlqqzdtvgldraz4braapf3ztm6azu3ty2eggmgsgzvrqwcl2e"],
  "memricorn":  ["bafybeifqs6s6l7mhxnsdzbnsjrru2xnipruyhlt64yilvjzxapvyf5fawe"],
  "memsnake":  ["bafybeiga7et2ixto7uvfi6yawpz56seoi5rxk3ytijjats7lotn2nehtvi"],
  "ratspill": ["bafybeign7jdkteis3rni6guemkzqmlrvp6wxiju4kuxc6jajq4b543srre"],
  "kirbonite": ["bafybeifckzrhfjvn43i5tg7fmj4i4gxsq23didycjb5rqp7mnsit66bolu","bafybeiajpeg6pudygrpzrj2sdpv7oxn2ft5kae5kdk5aozmzexcqiuvg5i"],
  "shadowpak": ["bafybeie4amx642ryrag5twlztpy4kw5hdheo75hbtkxjilqciypgrbobma","bafybeidiob6m4kol32m3j3czf3n7sudsfsvguwj7yjncr2woz2oumyki3q"],
  "mirrorpill":  ["bafybeibn52d2otv24in2oc5nzn4zlobbvu23aflwcqsw77dtvo6yj7viba"]
}
const hashmonkCIDs: { [key:string]: string[] } = {
  "genesis": ["bafybeibfjlyibyafhrnjrx7bweluws5uefbvupatwx5vxgvpt6quxhfkoq"],
  "payback pill": [],
  "prodpill": ["bafybeifvuz36hy2tdbtcoyjufm74askc3bnsat4cjj2lkfliu5wnmejjmu"],
  "unipill":  ["bafybeigzremws4dyhmgc4b5rj3hbgp6b7cf5ccwb2cnueoq4xrtw5r6lnq"],
  "hypepill":  ["bafybeiafutv2lc2v43inmci7zh4to4c2rtgoqws57uamwkflzmzdrmoktu"],
  "rektpill":  ["bafybeicnsti5gvzgovpnmfe66rwc6rby5ycyccnb3snzvagsq2rrm2dl6i"],
  "memfruit":  ["bafybeidrzmoypqqgldwyku2uanmo6alngr6v6nm3sy2jc2oyqmm5xn62n4"],
  "synth_memwraith":  ["bafybeiazjnlqqzdtvgldraz4braapf3ztm6azu3ty2eggmgsgzvrqwcl2e"],
  "memricorn":  ["bafybeieqaagaya5mq5rfneccgeaz7cwcagwehy3zcrxec37zotgu5v3zym"],
  "memsnake":  ["bafybeibvk34zxe46xklq5w5mpxqo4kfnylg7pmrmk4nkryzfjb4hz3m5ai"],
  "ratspill": [],
  "kirbonite": ["bafybeigyqkhzaoc7t63gjvjvwnri5ewq2afaeas2gxdolwtjndbbe4v3ry", "bafybeihpfhto4p2fcthilvnz76zmgohp67cit6siwygiohr443cajcj34m"],
  "shadowpak": [],
  "mirrorpill":  ["bafybeigzujm5qz6re5r7g3ndnbtcgugwip5xre3e5baiypgviwohuqhp5i"]
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
  // receipt = await wearablesValidator.removeIdfromStringPill(BigNumber.from(6), BigNumber.from(2), BigNumber.from(1));
  // await receipt.wait();
  await adjustWearables(wearablesValidator, hashmonkForm);
  // await adjustWearables(wearablesValidator, pepelForm);
    
}

async function adjustWearables( wearablesValidator: WearablesValidator, form: BigNumber)  {
  let receipt;
  for(let i = 1; i < pillIDs.length; i++) {
    const pillName = pillNames[i-1];
    const legacyPillId = legacyPillToId[pillName];
  
    const cid = await wearablesValidator.getEquipmentFromPill(BigNumber.from(pillIDs[i]), form);
    console.log(`Pills ID ${legacyPillId} ${pillName}  CIDs: ${cid}`);
    const newCIDs = form.eq(1) ? pepelCIDs[pillName] : hashmonkCIDs[pillName];
    if(cid.length < newCIDs.length) {
      console.log(`Pills ID ${legacyPillId} ${pillName}  CIDs: ${newCIDs}`);
      for(let j = 0; j < newCIDs.length; j++) {
        receipt = await wearablesValidator.setIdtoStringPill(BigNumber.from(legacyPillId), form,  newCIDs[j], {gasLimit: 1000000});
        await receipt.wait();
      }
    }
    while(cid.length > newCIDs.length) {
      receipt = await wearablesValidator.removeIdfromStringPill(BigNumber.from(legacyPillId), form, BigNumber.from(cid.length - 1));
      await receipt.wait();

    }
  }
}

  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});