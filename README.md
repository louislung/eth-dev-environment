# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

Note:
- this project is created by doing `npx hardhat init` -> option 2 Create a TypeScript project  
  follow [tutorial](https://hardhat.org/tutorial) for some basic stuff
- set environment variable `ALCHEMY_API_KEY` & `SEPOLIA_PRIVATE_KEY` if needed
- to start a node from command line: `npx hardhat node --fork https://eth-mainnet.g.alchemy.com/v2/$ALCHEMY_API_KEY`  
  Or simply run `npx hardhat node` since it is defined in `hardhard.config.ts` already



Learning:
- some libraries (e.g. ethers) is made available in hardhat runtime env (hre), hence running `npx hardhat test` will work, even in the test script, ethers library is not imported