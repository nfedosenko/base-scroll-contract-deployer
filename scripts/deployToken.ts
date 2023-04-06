import {ethers} from "hardhat";

async function main() {
    const name = 'DegenToken';
    const symbol = 'DGN';
    const initialSupply = ethers.utils.parseUnits('1000000000', 18);

    const DegenToken = await ethers.getContractFactory("DegenToken");
    const degenToken = await DegenToken.deploy(name, symbol, initialSupply);

    await degenToken.deployed();

    console.log(`${name} has been successfully deployed to address: ${degenToken.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
