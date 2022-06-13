import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers";

import { expect } from "chai";
import { ethers, waffle, upgrades } from "hardhat";
import { BigNumber } from "ethers";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { UnitTrust } from "../src/types/index"
import { UnitTrustV2 } from "../src/types/index"
import UnitTrustArtifact from "../artifacts/contracts/UnitTrust.sol/UnitTrust.json"
import UnitTrustV2Artifact from "../artifacts/contracts/UnitTrustV2.sol/UnitTrustV2.json"
import { deployProxyImpl } from "@openzeppelin/hardhat-upgrades/dist/utils";

describe("UnitTrust tests", function() {

    let unitTrust: UnitTrust;
    let unitTrustV2: UnitTrustV2;
    let owner: SignerWithAddress;

    it("should deploy", async function() {
        const UnitTrust = await ethers.getContractFactory("UnitTrust")
        unitTrust = await upgrades.deployProxy(UnitTrust, { kind: "uups" }) as UnitTrust;
        await unitTrust.initializeTotalUnits(100)

        expect(await unitTrust.getTotalUnits()).to.equal(100)
    })

    it("should be upgradeable", async function() {
        const UnitTrust = await ethers.getContractFactory("UnitTrust")
        const UnitTrustV2 = await ethers.getContractFactory("UnitTrustV2")

        const instance = await upgrades.deployProxy(UnitTrust, { kind: "uups" });
        await instance.initializeTotalUnits(100)
        const upgraded = await upgrades.upgradeProxy(instance.address, UnitTrustV2);
        
        expect(await instance.getTotalUnits()).to.equal(100)
        expect(await upgraded.getTotalUnits()).to.equal(100)

    })
})