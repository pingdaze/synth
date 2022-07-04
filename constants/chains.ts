export enum SupportedChainId {
  MAINNET = 1,
  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: "mainnet",
  [SupportedChainId.ARBITRUM_ONE]: "arbitrum",
  [SupportedChainId.ARBITRUM_RINKEBY]: "arbitrum_rinkeby",
};

export const PILLS_CONTRACT_ADDRESS: Record<SupportedChainId.MAINNET, string> =
  {
    [SupportedChainId.MAINNET]: "0x33a4cfc925ad40e5bb2b9b2462d7a1a5a5da4476",
  };

export const PORTALPILL_CONTRACT_ADDRESS: Record<
  SupportedChainId.MAINNET,
  string
> = {
  [SupportedChainId.MAINNET]: "0xA16891897378a82E9F0ad44A705B292C9753538C",
};

export const CORE721_ADDRESS: Record<
  SupportedChainId.ARBITRUM_ONE | SupportedChainId.ARBITRUM_RINKEBY,
  string
> = {
  [SupportedChainId.ARBITRUM_ONE]: "",
  [SupportedChainId.ARBITRUM_RINKEBY]:
    "0x431568cDb8E5bd5061f983aFe0daC131A4EDb19d",
};

export const CORE721_DEPLOYED_BLOCK: Record<
  SupportedChainId.ARBITRUM_RINKEBY | SupportedChainId.ARBITRUM_ONE,
  number
> = {
  [SupportedChainId.ARBITRUM_ONE]: 0,
  [SupportedChainId.ARBITRUM_RINKEBY]: 13336612,
};

export const CHARACTER_VALIDATOR_ADDRESS: Record<
  SupportedChainId.ARBITRUM_ONE | SupportedChainId.ARBITRUM_RINKEBY,
  string
> = {
  [SupportedChainId.ARBITRUM_ONE]: "",
  [SupportedChainId.ARBITRUM_RINKEBY]:
    "0x35900eeF38dA1c5392915F8B354c54bB4d9B27Bc",
};

export const INFURA_ID = "45f1d10d80bd45e8888e254086e7a964";

export const RPC_URLS: { [chainId in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  [SupportedChainId.ARBITRUM_ONE]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_ID}`,
  [SupportedChainId.ARBITRUM_RINKEBY]: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_ID}`,
};
