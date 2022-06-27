const fs = require("fs");
const path = require("path");

import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-watcher";
import "solidity-coverage";

dotenv.config();

import {node_url, accounts} from './utils/network';

for (const f of fs.readdirSync(path.join(__dirname, "hardhat"))) {
  require(path.join(__dirname, "hardhat", f));
}

const enableGasReport = !!process.env.ENABLE_GAS_REPORT;
const enableProduction = process.env.COMPILE_MODE === "production";

 const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.4"
      },
      {
        version: "0.8.10"
      },
      {
        version: "0.5.5"
      },
      {
        version: "0.6.11"
      }
    ],
    settings: {
      optimizer: {
        enabled: enableGasReport || enableProduction || true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/" + process.env.ALCHEMY_API_KEY,
        blockNumber: 15015151
      },
      accounts: accounts('hardhat'),
    },rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },gorli: {
      url: node_url('gorli'),
      accounts: accounts('gorli'),
    },
    ropsten: {
      url: node_url('ropsten'),
      accounts: accounts('ropsten'),
    },
    mainnet: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    arbrinkeby: {
      url: node_url('arbrinkeby'),
      accounts: accounts('arbrinkeby'),
    }
  },
  gasReporter: {
    enabled: enableGasReport,
    currency: "USD",
    gasPrice: 60,
    coinmarketcap: process.env.COINTMARKETCAP_API_KEY,
    outputFile: process.env.CI ? "gas-report.txt" : undefined,
  },
  etherscan: {
    apiKey:  {
      arbitrumTestnet: process.env.ARBSCAN_API
    }
  },
  mocha: {
    timeout: 100000000
  },
  watcher: {
    compilation: {
      tasks: ["compile"],
    },
    testing: {
      tasks: [
        {
          command: "test",
          params: {
            noCompile: false,
            testFiles: [
              "test/Core.ts",
              "test/MetadataRegistry.ts",
              "test/SequenceValidator.ts",
            ],
          },
        },
      ],
      files: ["./contracts", "./test"],
      verbose: true,
    },
  },
};

export default config;

