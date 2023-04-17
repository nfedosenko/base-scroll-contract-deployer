import {ethers} from "hardhat";
import {initializeUniswapContracts} from "../utils/initializeUniswapContracts";
import {encodePriceSqrt} from "../utils/encodePriceSqrt";
import Erc20TokenAbi from '../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json'
const {TOKEN_ADDRESS, WETH_ADDRESS} = process.env;
const FEE = 3000;

async function approvePositionManager(signer, positionManager) {
    const approvalAmount = ethers.utils.parseUnits('1000', 18).toString()
    const token0approveTx = await new ethers.Contract(WETH_ADDRESS, Erc20TokenAbi.abi)
        .connect(signer)
        .approve(positionManager.address, approvalAmount)
    const token1approveTx = await new ethers.Contract(TOKEN_ADDRESS, Erc20TokenAbi.abi)
        .connect(signer)
        .approve(positionManager.address, approvalAmount)
    await Promise.all([token0approveTx.wait(), token1approveTx.wait()])
}

async function main() {
    const [deployer] = await ethers.getSigners();
    const {factory, positionManager} = await initializeUniswapContracts(deployer);

    // Firstly, let's check if such pool exists already
    let existingPoolAddress;
    existingPoolAddress = await factory.connect(deployer).getPool(WETH_ADDRESS, TOKEN_ADDRESS, FEE);

    console.log(`Existing Pool Address: ${existingPoolAddress}`);

    // Create and Initialize Pool if it doesn't exist yet
    if (existingPoolAddress === ethers.constants.AddressZero) {
        const sqrtPrice = encodePriceSqrt(1, 1);

        console.log(`Sqrt Price: ${sqrtPrice}`)

        await approvePositionManager(deployer, positionManager);

        console.log('Position Manager spending approved')

        const tx = await positionManager
            .connect(deployer)
            .createAndInitializePoolIfNecessary(TOKEN_ADDRESS,WETH_ADDRESS, FEE, sqrtPrice, {
                gasLimit: ethers.utils.hexlify(6326145)
            });

        await tx.wait();

        const createdPoolAddress = await factory
            .connect(deployer)
            .getPool(WETH_ADDRESS, TOKEN_ADDRESS, FEE);

        console.log(`Created ${WETH_ADDRESS}-${TOKEN_ADDRESS} Pool on Address: ${createdPoolAddress}`)
    } else {

    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
