import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { randomBytes } from 'crypto'

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY === undefined ? "DUMMY_ALCHEMY_API_KEY" : process.env.ALCHEMY_API_KEY;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY === undefined ? randomBytes(32).toString('hex') : process.env.SEPOLIA_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    hardhat: {
      forking: {
        url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        // blockNumber: 5646103 // Counter.sol (0x3146C05647dD5c67b55336183b41e393D097f2E8) created at block 564102
        blockNumber: 5646657 // Counter.sol counter increased at 5646656        
      }
    }
  }
};

export default config;
