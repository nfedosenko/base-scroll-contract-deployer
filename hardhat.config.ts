import * as dotenv from "dotenv";

import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        scrollTestnet: {
            url: process.env.SCROLL_TESTNET_URL || "",
            accounts:
                !!process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        },
        baseGoerli: {
            url: 'https://goerli.base.org',
            accounts: [process.env.PRIVATE_KEY],
        },
    },
    etherscan: {
        customChains: [
            {
                network: "baseGoerli",
                chainId: 84531,
                urls: {
                    apiURL: "https://api-goerli.basescan.org/api",
                    browserURL: "https://goerli.basescan.org"
                }
            }
        ]
    },
};

export default config;
