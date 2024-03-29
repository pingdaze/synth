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


const collabPillToId: { [key:string]: number} = {

"runnerpill":  0x1,
"0xpill":  0x2,
"toadzpill":  0x3,
"blitpill":  0x4,
"wassiepill":  0x5,
"tubbypill":  0x6,
}
const projectToId: { [key:string]: number} = {
  "chainrunners": 0x1,
  "0xmons": 0x2,
  "cryptoadz": 0x3,
  "blitmap": 0x4,
  "blitnauts": 0x4,
  "wassies": 0x5,
  "tubbycats": 0x6,
}

const legacyPillToId: { [key:string]: string} = {
  "genesis": "0x80000000000000000000000000000001000000000000000d0000000000000001",
  "payback pill": "0x80000000000000000000000000000002000000000000000c0000000000000001",
  "prodpill": "0x8000000000000000000000000000000300000000000000000000000000000003",
  "unipill": "0x80000000000000000000000000000004000000000000000c0000000000000001",
  "hypepill":  "0x8000000000000000000000000000000500000000000000040000000000000001",
  "rektpill":  "0x80000000000000000000000000000006000000000000002a0000000000000001",
  "memfruit":  "0x80000000000000000000000000000007000000000000000d0000000000000001",
  "synth_memwraith":  "0x80000000000000000000000000000008000000000000000d0000000000000001",
  "memricorn": "0x80000000000000000000000000000009000000000000000d0000000000000001",
  "memsnake":  "0x8000000000000000000000000000000a000000000000000d0000000000000001",
  "ratspill": "0x8000000000000000000000000000000b00000000000000110000000000000001",
  "egodeth_ratspill": "0x8000000000000000000000000000000b00000000000000030000000000000001",
  "kirbonite": "0x8000000000000000000000000000000c000000000000000d0000000000000001",
  "shadowpak": "0x8000000000000000000000000000000d000000000000000d0000000000000001",
  "mirrorpill":  "0x8000000000000000000000000000000e000000000000000d0000000000000001"
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
  "ratspill": ["bafybeieqwibeyolnfu7ro3hyin2aedt7otg7c3abtthl3uwg52ep57uxti", "bafybeihchrjnf24itjfkwlwaroidsc7mlhumsdb5ixfjj3ntngowvocpku"],
  "egodeth_ratspill": ["bafybeibks2lzm4zxkfpt2fkmqtrsjh5gr7p5ytptrq34k4c5oakvirvxcm", "bafybeign7jdkteis3rni6guemkzqmlrvp6wxiju4kuxc6jajq4b543srre"],
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
  wearablesValidator = await ethers.getContractAt('WearablesValidator', charDeploymant.ArbGorli.WearablesValidator) as WearablesValidator;
  // receipt = await wearablesValidator.removeIdfromStringPill(BigNumber.from(6), BigNumber.from(2), BigNumber.from(1));
  await adjustWearables(wearablesValidator, hashmonkForm);
  await adjustWearables(wearablesValidator, pepelForm);
    
  // receipt = await wearablesValidator.setIdtoStringPill(BigNumber.from(0x6), pepelForm,  "bafybeidqmvrkq2ovb7zmlqqdpf6xgwupkwfrjz64njx42oae4r7y5y6jmy", {gasLimit: 1000000});
  // receipt = await wearablesValidator.setIdtoStringPill(BigNumber.from(0xB), pepelForm, "bafybeibks2lzm4zxkfpt2fkmqtrsjh5gr7p5ytptrq34k4c5oakvirvxcm");
  // receipt = await wearablesValidator.removeIdfromStringPill(BigNumber.from(0x6), pepelForm, BigNumber.from(1));

  console.log("Done");
  
}

async function adjustWearables( wearablesValidator: WearablesValidator, form: BigNumber)  {
  let receipt;
  for(let i = 1; i < pillIDs.length; i++) {
    const pillName = pillNames[i-1];
    const legacyPillId = legacyPillToId[pillName];
  
    let cid = await wearablesValidator.getEquipmentFromPill(BigNumber.from(legacyPillId), form);
    console.log(`Pills ID ${legacyPillId} ${pillName}  CIDs: ${cid}`);
    const newCIDs = form.eq(1) ? pepelCIDs[pillName] : hashmonkCIDs[pillName];
    if(cid.length < newCIDs.length) {
      console.log(`Pills ID ${legacyPillId} ${pillName}  CIDs: ${newCIDs}`);
      for(let j = 0; j < newCIDs.length; j++) {
        receipt = await wearablesValidator.setIdtoStringPill(BigNumber.from(legacyPillId), form,  newCIDs[j], {gasLimit: 1000000});
        await receipt.wait();
      }
    }
    let cidIndex = cid.length - 1;
    while(cidIndex + 1 > newCIDs.length) {
      receipt = await wearablesValidator.removeIdfromStringPill(BigNumber.from(legacyPillId), form, BigNumber.from(cidIndex));
      console.log(`Removing ${cidIndex} from ${legacyPillId} ${pillName}  CIDs: ${cid}`);
      cidIndex--;
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