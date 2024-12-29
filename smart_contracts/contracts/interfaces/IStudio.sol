// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IStudio {
    struct Studio {
        uint256 claimedPoints;
        uint256 unClaimedPoints;
    }

    event CreatedStudio(address studio);
    event CreatedContent(uint256 tokenId);
    event PointsClaimed(address studio, uint256 ponits);

    function intStudio() external payable;

    function initContent(string memory URI) external returns (uint256);

    function claim(uint256 points) external;

    function getStudio(address studio) external view returns (Studio memory);
}
