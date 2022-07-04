import {
  PILLS_CONTRACT_ADDRESS,
  PORTALPILL_CONTRACT_ADDRESS,
  SupportedChainId,
} from "../../constants/chains";
import { Contract } from "@ethersproject/contracts";
import { Provider } from "@ethersproject/providers";
import type { BigNumber } from "ethers";
import PILL_LIST from "./pill-list-byID.json";

const ERC1155_ABI = [
  "function balanceOf(address _owner, uint256 _id) external view returns (uint256)",
  "function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory)",
];

class ERC1155Contract extends Contract {
  balanceOf!: (account: string, ids: string) => Promise<BigNumber>;
  balanceOfBatch!: (_owners: string[], _ids: string[]) => Promise<BigNumber[]>;
}

const getERC1155Contract = (
  addressOrName: string,
  signerOrProvider: Provider
) =>
  new Contract(addressOrName, ERC1155_ABI, signerOrProvider) as ERC1155Contract;

type PillWithBalance = {
  id: string;
  ids: string[];
  type: string;
  generation: string;
  balance: number;
};

const PILL_IDS = Object.keys(PILL_LIST);

const NEW_PILL_LIST_BY_ID = {
  "1": {
    type: "portalpill",
    generation: "synth",
  },
  "2": {
    type: "portalpill",
    generation: "egodeth",
  },
};

const PORTAL_PILL_IDS = Object.keys(NEW_PILL_LIST_BY_ID);

const getNamedGeneration = (gen: string) =>
  gen === "ap"
    ? "artistproof"
    : Number(gen) === 1
    ? "egodeth"
    : Number(gen) >= 2
    ? "synth"
    : gen;

async function getBalanceOfBatch(
  address: string,
  ids: string[],
  {
    contractAddress,
    infura,
  }: {
    contractAddress: string;
    infura: Provider;
  }
) {
  const contract = getERC1155Contract(contractAddress, infura);

  const _owners = [...new Array(ids.length).fill(address)];

  const balanceOfBatch = await contract.balanceOfBatch(_owners, ids);

  const entries = balanceOfBatch
    .map((balance, index) => [ids[index], balance.toNumber()])
    .filter(([_, balance]) => balance > 0) as [string, number][];

  return entries;
}

export async function getLegacyPillsBalances(
  address: string,
  infura: Provider
): Promise<PillWithBalance[]> {
  const balances = await getBalanceOfBatch(address, PILL_IDS, {
    contractAddress: PILLS_CONTRACT_ADDRESS[SupportedChainId.MAINNET],
    infura,
  });

  const entries = balances.map(([id, balance]) => {
    const { generation, type } = PILL_LIST[id as keyof typeof PILL_LIST];

    const formatted: PillWithBalance = {
      id,
      ids: [id],
      type: type,
      generation: getNamedGeneration(generation),
      balance,
    };

    return formatted;
  });

  return [
    ...entries
      .reduce((collection, pill) => {
        const key = pill.type + "-" + pill.generation;

        let item: PillWithBalance;

        if (collection.has(key)) {
          item = collection.get(key)!;
          item.balance += pill.balance;
          item.ids = [...item.ids, ...pill.ids];
        } else {
          item = { ...pill, balance: 1 };
        }

        return collection.set(key, item);
      }, new Map<string, PillWithBalance>())
      .values(),
  ];
}

export async function getPortalPillBalances(
  address: string,
  infura: Provider
): Promise<PillWithBalance[]> {
  const balances = await getBalanceOfBatch(address, PORTAL_PILL_IDS, {
    contractAddress: PORTALPILL_CONTRACT_ADDRESS[SupportedChainId.MAINNET],
    infura,
  });

  return balances.map(([id, balance]) => {
    const formatted: PillWithBalance = {
      id,
      ids: [id],
      ...NEW_PILL_LIST_BY_ID[id as keyof typeof NEW_PILL_LIST_BY_ID],
      balance,
    };

    return formatted;
  });
}
