import { ethers, upgrades } from "hardhat"

(async () => {

    const UnitTrust = await ethers.getContractFactory("UnitTrust")
    const upgrade = await upgrades.upgradeProxy('0x2582B38c522D776b4a68726e941617eCc3259241', UnitTrust);
    await upgrade.deployed();

    console.log('Contract deployed at: ', upgrade.address)

})().catch((err: any) => console.log(err))