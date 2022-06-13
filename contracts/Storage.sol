// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

struct AppStorage {
    uint256 totalUnits;
    uint256 unitPrice;
    uint256 remainingUnits;
    mapping(address => Investor) investor;
}

struct Investor {
    uint16 ownedUnits;
    uint16 saleUnits;
}