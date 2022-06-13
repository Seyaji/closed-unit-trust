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

// Utils
const pairKeys = (keys: string[], result: any[]) => {
    return keys.reduce((acc:any , curr: any, index: number) => ({...acc, [curr]: result[index]}), {})
}

const investorKeys = [ 
    "ownedUnits",
    "saleUnits"
]



describe("UnitTrust tests", function() {

    let unitTrust: UnitTrust;
    let unitTrustV2: UnitTrustV2;
    let owner: SignerWithAddress;
    let inv1: SignerWithAddress;
    let inv2: SignerWithAddress;
    let inv3: SignerWithAddress;

    it("should deploy", async function() {
        const UnitTrust = await ethers.getContractFactory("UnitTrust")
        unitTrust = await upgrades.deployProxy(UnitTrust, { kind: "uups" }) as UnitTrust;

        expect(await unitTrust.getTotalUnits()).to.equal(1000)
    })

    it("should be upgradeable", async function() {
        const UnitTrust = await ethers.getContractFactory("UnitTrust")
        const UnitTrustV2 = await ethers.getContractFactory("UnitTrustV2")

        const instance = await upgrades.deployProxy(UnitTrust, { kind: "uups" });
        const upgraded = await upgrades.upgradeProxy(instance.address, UnitTrustV2);
        
        expect(await instance.getTotalUnits()).to.equal(1000)
        expect(await upgraded.getTotalUnits()).to.equal(1000)

    })

    beforeEach(async function() {
        [ owner, inv1, inv2, inv3 ] = await ethers.getSigners()
        const UnitTrust = await ethers.getContractFactory("UnitTrust")
        unitTrust = await upgrades.deployProxy(UnitTrust, { kind: "uups" }) as UnitTrust;
    })

    it("should allow investors to purchase units", async function() {
        await unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("10")
        })
        const getInvestor = await unitTrust.getInvestor(inv1.address)
        const investor = pairKeys(investorKeys, getInvestor)

        expect(investor.ownedUnits).to.equal(10)
    })
})