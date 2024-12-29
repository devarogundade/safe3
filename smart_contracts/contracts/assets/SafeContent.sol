// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ISafeContent} from "../interfaces/ISafeContent.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SafeContent is ERC721, ISafeContent {
    uint256 internal TokenId = 0;

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("SafeContent", "cSAFE") {}

    function mint(
        address creator,
        string memory URI
    ) external override returns (uint256) {
        beforeMint();

        _mint(creator, TokenId);
        _tokenURIs[TokenId] = URI;

        return TokenId;
    }

    function beforeMint() internal {
        TokenId = TokenId + 1;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
