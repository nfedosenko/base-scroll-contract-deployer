# Base, Scroll Contract Deployer

This code allows you to easily deploy ERC-20 and ERC-721 smart contracts on Scroll and Base blockchains

Don't forget to follow me on Twitter: https://twitter.com/sir_fedos

### Setup:

```shell
yarn install
npx hardhat compile
```

Then, create ```.env``` file under root folder, copy content from ```.env.example``` and set value for ```PRIVATE_KEY```

### Deploy ERC-20 on Scroll:

```shell
npm run deploy-token[scroll]
```

### Deploy ERC-721 on Scroll:

```shell
npm run deploy-nft[scroll]
```

### Deploy ERC-20 on Base:

```shell
npm run deploy-token[base]
```

### Deploy ERC-721 on Base:

```shell
npm run deploy-nft[base]
```
