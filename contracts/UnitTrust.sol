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
        s.transferFee = 10000000 gwei;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}


    function getTotalUnits() public view returns(uint256) {
       return s.totalUnits;
    }

    function getRemainingUnits() public view returns(uint256) {
       return s.remainingUnits;
    }

    function getInvestor(address _investor) public view returns(Investor memory) {
        return s.investor[_investor];
    }

    function purchaseUnit(uint16 _amount) public payable {
        require(s.remainingUnits >= _amount, "No enough units");
        require(msg.value == _amount * 1 ether + s.transferFee, "Incorrect amount sent");
        s.investor[msg.sender].ownedUnits = _amount;
        s.remainingUnits -= _amount;
        s.balance += s.transferFee;
    }

    function postUnit(uint16 _amount, uint256 _salePrice) public {
        require(s.investor[msg.sender].ownedUnits >= _amount, "Not enough units");
        require(s.remainingUnits >= _amount, "No enough units");
        s.investor[msg.sender].ownedUnits -= _amount;
        s.investor[msg.sender].saleUnits += _amount;
        s.investor[msg.sender].salePrice = _salePrice;
    }

    function transferUnit(address _seller, uint16 _amount) public payable {
        require(msg.value == (_amount * s.investor[_seller].salePrice) + s.transferFee , "Incorrect amount sent");
        require(s.investor[_seller].saleUnits >= _amount, "Not enough units for sale");
        s.investor[_seller].balance += msg.value;
        s.investor[_seller].saleUnits -= _amount;
        s.investor[msg.sender].ownedUnits += _amount;
        s.balance += s.transferFee;
    }

    function fundWithdraw(uint256 _amount) public payable onlyOwner {
        require(s.balance >= _amount, "Not enough funds");
        console.log(s.balance);
        s.balance -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    function closeUnitTrust(uint256 _amount) public payable onlyOwner {
        uint256 remUnits = s.remainingUnits;
        s.remainingUnits = 0;
        payable(msg.sender).transfer(_amount * (s.totalUnits - remUnits));
    }

    function investorWithdraw(uint256 _amount) public payable {
        require(s.investor[msg.sender].balance >= _amount, "Not enough funds");
        s.investor[msg.sender].balance -= _amount;
        payable(msg.sender).transfer(_amount);
    }
}