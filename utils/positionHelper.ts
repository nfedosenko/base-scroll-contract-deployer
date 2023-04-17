import {ethers} from 'hardhat'
import {nearestUsableTick, Position, Pool} from '@uniswap/v3-sdk'

export async function approvePositionManager() {

}

export async function getPositionMintParams(
    positionLiquidityAmount: string,
    positionTick?: number
) {
    const poolData = await this.getPoolStateData()
    const {tick, tickSpacing, fee, liquidity, sqrtPriceX96} = poolData

    const token0Instance = await this.constructUniswapV3token(this.token0)
    const token1Instance = await this.constructUniswapV3token(this.token1)
    const tokensPool = new Pool(
        token0Instance,
        token1Instance,
        fee,
        sqrtPriceX96.toString(),
        liquidity.toString(),
        tick
    )

    const usableTick = positionTick ? positionTick : tick
    const tickLower =
        nearestUsableTick(usableTick, tickSpacing) - tickSpacing * 2
    const tickUpper =
        nearestUsableTick(usableTick, tickSpacing) + tickSpacing * 2

    const position = new Position({
        pool: tokensPool,
        liquidity: ethers.utils
            .parseEther(positionLiquidityAmount)
            .toString(), // TODO: check if auto-cast to BigintIsh works fine
        tickLower,
        tickUpper
    })

    await approvePositionManager()

    const {amount0: amount0Desired, amount1: amount1Desired} =
        position.mintAmounts

    // const { amount0: amount0Min, amount1: amount1Min } =
    //     position.mintAmountsWithSlippage(new Percent(50, 10_000))

    const params = {
        token0: this.token0,
        token1: this.token1,
        fee,
        tickLower,
        tickUpper,
        amount0Desired: amount0Desired.toString(),
        amount1Desired: amount1Desired.toString(),
        amount0Min: 0,
        amount1Min: 0,
        recipient: await this.signer.getAddress(),
        deadline: Math.floor(Date.now() / 1000) * 60
    }
    console.log('positionMintParams:', params)

    return params
}

export async function openPosition(liquidityAmount: string, priceTick?: number) {
    const mintParams = await getPositionMintParams(
        liquidityAmount,
        priceTick
    )

    const positionMintTx = await this.contracts.positionManager
        .connect(await this.signer)
        .mint(mintParams, {
            gasLimit: ethers.utils.hexlify(1000000)
        })

    await positionMintTx.wait() // expect positionManager emit event 'IncreaseLiquidity' after positionMintTx
}