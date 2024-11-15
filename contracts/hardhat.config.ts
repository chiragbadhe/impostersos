import { HardhatUserConfig } from "hardhat/config";
// import "hardhat-abi-exporter";
// import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-deploy";
// import "hardhat-tracer";
// import "hardhat-contract-sizer";
// import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
// import "@nomiclabs/hardhat-web3";
// import "hardhat-gui"
import * as dotenv from "dotenv";
import "hardhat-docgen";

dotenv.config({ path: __dirname + "/.env" });
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    goerli: {
      chainId: 5,
      url: "https://eth-goerli.g.alchemy.com/v2/Lqi-_lwH8mlKdYiB23flLulXxchmOzpl",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    hederaTestnet: {
      chainId: 296,
      url: "https://testnet.hashio.io/api",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    morphTestnet: {
      chainId: 2810,
      url: "https://rpc-holesky.morphl2.io",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    flowTestnet: {
      chainId: 545,
      url: "https://testnet.evm.nodes.onflow.org",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    mainnet: {
      chainId: 1,
      url: "https://eth-mainnet.g.alchemy.com/v2/cz4JcV3d4nIRcZSSR71Zrcalh1PDyxcj",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    polygon: {
      chainId: 137,
      url: "https://rpc.ankr.com/polygon/",
      accounts: [process.env.PRIVATE_KEY || ""],
      saveDeployments: true,
    },
    polygonMumbai: {
      chainId: 80001,
      url: "https://rpc.ankr.com/polygon_mumbai/",
      accounts: [process.env.PRIVATE_KEY || ""],
      saveDeployments: true,
    },
    zkEVMTest: {
      chainId: 1442,
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    mantleTestnet: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    sepolia: {
      url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    "base-goerli": {
      url: "https://goerli.base.org",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGON_MUMBAI_KEY!,
      polygon: process.env.POLYGON_KEY!,
      flowtestnet: process.env.FLOWTESTNET_KEY!,
      goerli: process.env.GOERLI_KEY!,
      mainnet: process.env.MAINNET_KEY!,
      zkEVMTest: process.env.ZKEVM_TEST_KEY!,
      scrollSepolia: process.env.SCROLL_SEPOLIA_KEY!,
      sepolia: process.env.SEPOLIA_KEY!,
      baseGoerli: process.env.BASE_GOERLI_KEY!,
    },
    customChains: [
      {
        network: "zkEVMTest",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com/",
        },
      },
      {
        network: "flowtestnet",
        chainId: 545,
        urls: {
          apiURL: "https://testnet.evm.nodes.onflow.org",
          browserURL: "https://evm-testnet.flowscan.io",
        },
      },
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia-blockscout.scroll.io/",
        },
      },
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org/",
        },
      },
    ],
  },
  gasReporter: {
    gasPrice: 200,
    enabled: true,
    outputFile: "gas-report.txt",
    currency: "USD",
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "MATIC",
    rst: true,
  },
};
export default config;
