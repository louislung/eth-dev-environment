import hre from "hardhat";

// scripts/deploy.js
async function main() {
    // We get the contract to deploy
    const Box = await hre.ethers.getContractFactory('Token');
    console.log('Deploying Token...');
    const box = await Box.deploy();
    await box.waitForDeployment();
    console.log('Token deployed to:', await box.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });