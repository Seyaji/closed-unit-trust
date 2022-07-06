import { ethers, upgrades } from "hardhat"

import { UnitTrust } from "../src/types/index"

(async () => {
    const [ owner ] = await ethers.getSigners()

    console.log("Account balance:", ethers.utils.formatEther(await owner.getBalance()).toString() + ' Ether');
    const UnitTrust = await ethers.getContractFactory("UnitTrust")
    const unitTrust = await upgrades.deployProxy(UnitTrust, { kind: "uups" }) as UnitTrust;
    await unitTrust.deployed();

    console.log('Contract deployed from: ', owner.address)
    console.log('Contract deployed at: ', unitTrust.address)

})().catch((err: any) => console.log(err))