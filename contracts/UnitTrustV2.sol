// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./Storage.sol";

contract UnitTrustV2 is  Initializable, UUPSUpgradeable, OwnableUpgradeable {

    AppStorage internal s;

    function initialize() public initializer {
        __Ownable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function initializeTotalUnits(uint256 _totalUnits) public onlyOwner {
        if (s.totalUints == 0) {
            s.totalUints = _totalUnits;
        }
    }

    function getTotalUnits() public view returns(uint256) {
        return s.totalUints;
    }

}