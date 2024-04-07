# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

After starting dev container, run
```
hardhat-completion install
```

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
- by default, running hardhat uses the "hardhat" network, unless one specify --network, or set `defaultNetwork` in `hardhat.config.js`
- [for general network config](https://hardhat.org/hardhat-runner/docs/config#networks-configuration)  
  [for hardhat network config](https://hardhat.org/hardhat-network/docs/reference#config) e.g. forking is only available in hardhat
- `npx hardhat console` / `npx hardhat console --network localhost`, some useful object: `process`, `config`, `ethers`, `console.log(await ethers.getSigners()).`, [Object.keys(require.cache);](https://stackoverflow.com/questions/9791925/list-of-currently-loaded-node-js-modules)
- if start a hardhat node using `npx hardhat node`, can deploy contract by `hh ignition deploy ./ignition/modules/Token.ts --network localhost`  
  if `npx hardhat node --port 12345`, then need to set `networks: {abc: {url: http://0.0.0.0:12345}}` in `hardhat.config.ts` and deploy by `hh ignition deploy ./ignition/modules/Token.ts --network abc`  
  this is because `localhost` is defaulted to `http://127.0.0.1:8545` only
- for deployment using hardhat ignition module check `ignition/modules/Token.ts`  
  for deployment using ethers check `scripts/deploy.ts`, deploy by `hh run --network localhost scripts/deploy.ts`
- `create2` contract deployment may fail (result in empty address) if sth wrong when running constructor, e.g.  
  ```
  contract DummyTransfer {
      constructor() {
        // this code will fail if msg.sender doesnt has a fallback function
        payable(msg.sender).transfer(address(this).balance);
      }
  }
  ```
- `hh test --config hardhat-nofork.config.ts` allow to use different hardhat config file
- To debug:
  1. run `hh node`
  2. run `hh console --network locathost`
  3. set breakpoint in e.g. `test/SpaceBank.ts` and debug `hh test test/SpaceBank.ts --network localhost`
  4. start debugging in console at #2, e.g. `const token=await (await hre.ethers.getContractFactory("SpaceToken")).attach("0x5fbdb2315678afecb367f032d93f642f64180aa3");`
- Flatten contract by `hh flatten contracts/SpaceBank.sol > contracts/SpaceBank_flatten.sol`
- In `hardhat.config.tf`, define `networks: {hardhat: {forking: {url: ``https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}``,blockNumber:<X>}}}`  
  Set blockNumber = 5646103, then run `hh node`, `hh console --network localhost` and run below code
  ```
  const [owner, addr1, addr2] = await hre.ethers.getSigners();
  const counter=await (await hre.ethers.getContractFactory("Counter")).attach("0x3146C05647dD5c67b55336183b41e393D097f2E8");
  await counter.getCurrent();
  ```
  Output will be 0n
  Now set blockNumber = 5646657, then run the same commands, output will be 1n
  Because there is a [transaction](https://sepolia.etherscan.io/tx/0xce8e033907a09e85cc6da790514fa1304a63168b34d644993c27ed85ff2d18ea) increased the counter