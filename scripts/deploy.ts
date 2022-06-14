import { ethers, upgrades } from "hardhat"

import { UnitTrust } from "../src/types/index"
import { UnitTrustV2 } from "../src/types/index"
import UnitTrustArtifact from "../artifacts/contracts/UnitTrust.sol/UnitTrust.json"

(async () => {

    const UnitTrust = await ethers.getContractFactory("UnitTrust")
    const unitTrust = await upgrades.deployProxy(UnitTrust, { kind: "uups" }) as UnitTrust;
    await unitTrust.deployed();

    console.log('Contract deployed at: ', unitTrust.address)

})().catch((err: any) => console.log(err))