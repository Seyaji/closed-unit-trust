// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./Storage.sol";

contract UnitTrust is  Initializable, UUPSUpgradeable, OwnableUpgradeable {

    AppStorage internal s;

    function initialize() public initializer {
        __Ownable_init();
        s.totalUnits = 1000;
        s.remainingUnits = 1000;
        s.unitPrice = 1 ether;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}


    function getTotalUnits() public view returns(uint256) {
       return s.totalUnits;
    }

    function purchaseUnit(uint16 _amount) public payable {
        require(msg.value == _amount * 1 ether, "insufficient amount sent");
        s.investor[msg.sender].ownedUnits = _amount;
    }

    function getInvestor(address _investor) public view returns(Investor memory) {
        return s.investor[_investor];
    }
}