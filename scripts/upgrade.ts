import { ethers, upgrades } from "hardhat"

import { UnitTrust } from "../src/types/index"

(async () => {

    const UnitTrust = await ethers.getContractFactory("UnitTrust")
    const upgrade = await upgrades.upgradeProxy('0xfcfEd6F6494db7975Dd7D744f33Dad73175b4BaB', UnitTrust) as UnitTrust;
    await upgrade.deployed();

    console.log('Contract deployed at: ', upgrade.address)

})().catch((err: any) => console.log(err))