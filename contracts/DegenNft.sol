// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DegenNft is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    constructor(string memory name,
        string memory symbol) ERC721(name, symbol) {}

    function mint(address recipient)
    public
    returns (uint256)
    {
        currentTokenId.increment();
        uint256 tokenId = currentTokenId.current();
        _safeMint(recipient, tokenId);
        return tokenId;
    }
}