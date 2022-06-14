// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "hardhat/console.sol";

import "./Storage.sol";

contract UnitTrust is  Initializable, UUPSUpgradeable, OwnableUpgradeable {

    AppStorage internal s;

    function initialize() public initializer {
        __Ownable_init();
        s.totalUnits = 1000;
        s.remainingUnits = 1000;
        s.unitPrice = 1 ether;
        s.transferFee = 5000000 gwei;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}


    function getTotalUnits() public view returns(uint256) {
       return s.totalUnits;
    }

    function getInvestor(address _investor) public view returns(Investor memory) {
        return s.investor[_investor];
    }

    function purchaseUnit(uint16 _amount) public payable {
        require(s.remainingUnits >= _amount, "No enough units");
        require(msg.value == _amount * 1 ether, "Incorrect amount sent");
        s.investor[msg.sender].ownedUnits = _amount;
        s.remainingUnits -= _amount;
    }

    function postUnit(uint16 _amount, uint256 _salePrice) public {
        require(s.investor[msg.sender].ownedUnits >= _amount, "Not enough units");
        require(s.remainingUnits >= _amount, "No enough units");
        s.investor[msg.sender].ownedUnits -= _amount;
        s.investor[msg.sender].saleUnits += _amount;
        s.investor[msg.sender].salePrice = _salePrice;
    }

    function transferUnit(address _seller, uint16 _amount) public payable {
        require(msg.value == _amount * s.investor[_seller].salePrice, "Incorrect amount sent");
        require(s.investor[_seller].saleUnits >= _amount, "Not enough units for sale");
        s.investor[_seller].balance += msg.value;
        s.investor[_seller].saleUnits -= _amount;
        s.investor[msg.sender].ownedUnits += _amount;
    }

}