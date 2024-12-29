// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface ISafeContent is IERC721 {
    function mint(
        address creator,
        string memory URI
    ) external returns (uint256);
}
