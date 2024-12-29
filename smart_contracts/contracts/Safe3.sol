// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IStudio} from "./interfaces/IStudio.sol";
import {IDefender} from "./interfaces/IDefender.sol";
import {ISafePoints} from "./interfaces/ISafePoints.sol";
import {ISafeContent} from "./interfaces/ISafeContent.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Safe3 is IStudio, IDefender, Ownable {
    mapping(address => Studio) internal _studios;

    mapping(address => bool) internal _hasStudio;
    mapping(address => bool) internal _isBlacklist;

    uint256 internal CreateStudioFees = 0;

    ISafePoints internal _safePoints;
    ISafeContent internal _safeContent;

    constructor(address safePoints, address safeContent) Ownable(msg.sender) {
        _safePoints = ISafePoints(safePoints);
        _safeContent = ISafeContent(safeContent);
    }

    ///////////////////////////////////////////////////////
    /////////////        STUDIO IMPL         //////////////
    ///////////////////////////////////////////////////////

    function intStudio() external payable override {
        require(!hasStudio(msg.sender), "ALREADY HAS STUDIO");
        require(msg.value >= CreateStudioFees, "INSUFFICIENT FEES");

        Studio memory studio = Studio({claimedPoints: 0, unClaimedPoints: 0});

        _studios[msg.sender] = studio;
        _hasStudio[msg.sender] = true;

        emit CreatedStudio(msg.sender);
    }

    function initContent(
        string memory URI
    ) external override returns (uint256) {
        require(hasStudio(msg.sender), "OPEN A STUDIO");
        require(!isBlacklist(msg.sender), "STUDIO IS BLACKLISTED");

        uint256 tokenId = _safeContent.mint(msg.sender, URI);

        emit CreatedContent(tokenId);

        return tokenId;
    }

    function claim(uint256 points) external override {
        require(hasStudio(msg.sender), "OPEN A STUDIO");
        require(!isBlacklist(msg.sender), "STUDIO IS BLACKLISTED");

        Studio storage studio = _studios[msg.sender];

        require(studio.unClaimedPoints >= points, "INSUFFICIENT POINTS");

        studio.unClaimedPoints -= points;
        studio.claimedPoints += points;

        _safePoints.transfer(msg.sender, points);

        emit PointsClaimed(msg.sender, points);
    }

    function getStudio(
        address studio
    ) external view override returns (Studio memory) {
        return _studios[studio];
    }

    ///////////////////////////////////////////////////////
    /////////////        DEFENDER IMPL       //////////////
    ///////////////////////////////////////////////////////

    function tip(uint256 content, uint256 points) external override {
        _safePoints.transferFrom(msg.sender, address(this), points);

        Studio storage studio = _studios[_safeContent.ownerOf(content)];

        studio.unClaimedPoints += points;

        emit ContentTipped(content, msg.sender, points);
    }

    ///////////////////////////////////////////////////////
    /////////////         OTHER IMPL         //////////////
    ///////////////////////////////////////////////////////

    function hasStudio(address studio) public view returns (bool) {
        return _hasStudio[studio];
    }

    function isBlacklist(address studio) public view returns (bool) {
        return _isBlacklist[studio];
    }

    ///////////////////////////////////////////////////////
    /////////////         ADMIN IMPL         //////////////
    ///////////////////////////////////////////////////////

    function updateFees(uint256 newFees) external onlyOwner {
        CreateStudioFees = newFees;
    }

    function addToBlacklist(address studio) external onlyOwner {
        _isBlacklist[studio] = true;
    }

    function removeFromBlacklist(address studio) external onlyOwner {
        _isBlacklist[studio] = false;
    }

    function updateSafeContent(address newSafeContent) external onlyOwner {
        _safeContent = ISafeContent(newSafeContent);
    }
}
