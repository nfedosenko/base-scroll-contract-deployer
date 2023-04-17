import {ethers} from 'ethers'

const UniswapContractArtifacts: { [name: string]: any } = {
    Factory: require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'),
    NonfungiblePositionManager: require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json')
}

export type TUniswapContracts = {
    factory: ethers.Contract
    positionManager: ethers.Contract
}

export const initializeUniswapContracts = (
    deployer: ethers.Signer
): TUniswapContracts => ({
    factory: new ethers.Contract(
        String(process.env.UNISWAP_FACTORY_ADDRESS),
        UniswapContractArtifacts.Factory.abi,
        deployer
    ),
    positionManager: new ethers.Contract(
        String(process.env.UNISWAP_POSITION_MANAGER_ADDRESS),
        UniswapContractArtifacts.NonfungiblePositionManager.abi,
        deployer
    )
})