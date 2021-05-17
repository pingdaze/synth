const fs = require("fs");
const path = require("path");

require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-solhint");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-watcher");

for (const f of fs.readdirSync(path.join(__dirname, "hardhat"))) {
  require(path.join(__dirname, "hardhat", f));
}

const enableGasReport = !!process.env.ENABLE_GAS_REPORT;
const enableProduction = process.env.COMPILE_MODE === "production";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.3",
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
    },
  },
  gasReporter: {
    enable: enableGasReport,
    currency: "USD",
    outputFile: process.env.CI ? "gas-report.txt" : undefined,
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
              "test/Collectible2.ts",
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
