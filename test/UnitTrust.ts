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
    "balance",
    "salePrice",
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
            value: ethers.utils.parseEther("10.01")
        })
        const getInvestor = await unitTrust.getInvestor(inv1.address)
        const investor = pairKeys(investorKeys, getInvestor)

        expect(investor.ownedUnits).to.equal(10)
    })

    it("should prevent purchase of units when wrong amount sent", async function() {
        await expect(unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("1")
        })).to.be.revertedWith("Incorrect amount sent")
    })

    it("should prevent investors purchasing more than the remaining units", async function() {
        await expect(unitTrust.connect(inv1).purchaseUnit(1001, {
            value: ethers.utils.parseEther("1001.01")
        })).to.be.revertedWith("No enough units")
    })

    it("should allow investors to mark units for sale", async function() {
        await unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("10.01")
        })
        await unitTrust.connect(inv1).postUnit(5, "1100000000000000000")

        const getInvestor = await unitTrust.getInvestor(inv1.address)
        const investor = pairKeys(investorKeys, getInvestor)

        expect(investor.ownedUnits).not.to.equal(10)
        expect(investor.ownedUnits).to.equal(5)
        expect(investor.saleUnits).to.equal(5)
    })

    it("should prevent investors selling more units that they own", async function() {
        await unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("10.01")
        })

        await expect(unitTrust.connect(inv1).postUnit(11, "1100000000000000000")).to.be.revertedWith("Not enough units")

        const getInvestor = await unitTrust.getInvestor(inv1.address)
        const investor = pairKeys(investorKeys, getInvestor)

        expect(investor.ownedUnits).to.equal(10)
    })
    
    it("should allow investors to purchase units from each other", async function() {
        await unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("10.01")
        })
        await unitTrust.connect(inv1).postUnit(5, "1100000000000000000")
        await unitTrust.connect(inv2).transferUnit(inv1.address, 5, {
            value: ethers.utils.parseEther("5.51")
        })

        const getInvestor1 = await unitTrust.getInvestor(inv1.address)
        const investor1 = pairKeys(investorKeys, getInvestor1)
        const getInvestor2 = await unitTrust.getInvestor(inv2.address)
        const investor2 = pairKeys(investorKeys, getInvestor2)

        expect(investor1.saleUnits).to.equal(0)
        expect(investor2.ownedUnits).to.equal(5)
    })

    it("should prevent investors from transferring units when incorrect amount sent", async function() {
        await unitTrust.connect(inv1).purchaseUnit(1, {
            value: ethers.utils.parseEther("1.01")
        })
        await unitTrust.connect(inv1).postUnit(1, "1100000000000000000")
        await expect(unitTrust.connect(inv2).transferUnit(inv1.address, 1, {
            value: ethers.utils.parseEther("0.5")
        })).to.be.revertedWith("Incorrect amount sent")
    })
})