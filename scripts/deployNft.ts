import {ethers} from 'hardhat';

async function main() {
    const name = "Sir Fedos NFT";
    const symbol = "FED";
    const NFT = await ethers.getContractFactory('DegenNft');
    const nft = await NFT.deploy(name, symbol);

    await nft.deployed();

    console.log('NFT Contract Deployed at ' + nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});