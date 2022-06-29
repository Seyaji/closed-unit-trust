// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

struct AppStorage {
    uint256 totalUnits;
    uint256 unitPrice;
    uint256 remainingUnits;
    uint256 transferFee;
    uint256 balance;
    mapping(address => Investor) investor;
}

struct Investor {
    uint256 balance;
    uint256 salePrice;
    uint16 ownedUnits;
    uint16 saleUnits;
    bool authorized;
}