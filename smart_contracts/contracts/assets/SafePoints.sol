// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ISafePoints} from "../interfaces/ISafePoints.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SafePoints is ERC20, ISafePoints {
    uint256 internal constant INITIAL_SUPPLY = 1_000_000_000 * 1e18;
    uint256 internal constant MULTIPLIER = 19_387_448_000_000;

    constructor() ERC20("SafePoints", "SAFE") {
        mintInitSupply();
    }

    function mint() external payable {
        require(msg.value > 0, "NON ZERO AMOUNT");
        _mint(msg.sender, msg.value * MULTIPLIER);
    }

    function mintInitSupply() internal {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
