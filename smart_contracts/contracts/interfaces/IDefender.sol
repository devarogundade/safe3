// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IDefender {
    event ContentTipped(uint256 content, address from, uint256 points);

    function tip(uint256 content, uint256 points) external;
}
