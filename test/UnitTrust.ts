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

        const instance = await upgrades.deployProxy(UnitTrust, { kind: "uups" }) as UnitTrust;
        const upgraded = await upgrades.upgradeProxy(instance.address, UnitTrustV2) as UnitTrustV2;
        
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

    it('should track multiple unit purchases', async function() {
        await unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("10.01")
        })
        await unitTrust.connect(inv1).purchaseUnit(5, {
            value: ethers.utils.parseEther("5.01")
        })
        await unitTrust.connect(inv1).purchaseUnit(1, {
            value: ethers.utils.parseEther("1.01")
        })
        const getInvestor = await unitTrust.getInvestor(inv1.address)
        const investor = pairKeys(investorKeys, getInvestor)

        expect(investor.ownedUnits).to.equal(16)
    })

    it("should prevent purchase of units when wrong amount sent", async function() {
        await expect(unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("1")
        })).to.be.revertedWith("Incorrect amount sent")
    })

    it('should get the remaining units', async function() {
        await unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("10.01")
        })
        expect(await unitTrust.getRemainingUnits()).to.equal(990)
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
        await unitTrust.connect(inv1).postUnit(5, ethers.utils.parseEther("1.10"))

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

        await expect(unitTrust.connect(inv1).postUnit(11, ethers.utils.parseEther("1.10"))).to.be.revertedWith("Not enough units")

        const getInvestor = await unitTrust.getInvestor(inv1.address)
        const investor = pairKeys(investorKeys, getInvestor)

        expect(investor.ownedUnits).to.equal(10)
    })
    
    it("should allow investors to purchase units from each other", async function() {
        await unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("10.01")
        })
        await unitTrust.connect(inv1).postUnit(5, ethers.utils.parseEther("1.10"))
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

    it("should track user balance correctly", async function() {
        await unitTrust.connect(inv1).purchaseUnit(1, {
            value: ethers.utils.parseEther("1.01")
        })
        await unitTrust.connect(inv1).purchaseUnit(1, {
            value: ethers.utils.parseEther("1.01")
        })
        await unitTrust.connect(inv1).purchaseUnit(2, {
            value: ethers.utils.parseEther("2.01")
        })
        await unitTrust.connect(inv1).postUnit(4, ethers.utils.parseEther("2.00"))
        await unitTrust.connect(inv2).transferUnit(inv1.address, 3, {
            value: ethers.utils.parseEther("6.01")
        })

        const getInvestor1 = await unitTrust.getInvestor(inv1.address)
        const investor1 = pairKeys(investorKeys, getInvestor1)
        const getInvestor2 = await unitTrust.getInvestor(inv2.address)
        const investor2 = pairKeys(investorKeys, getInvestor2)

        expect(investor1.saleUnits).to.equal(1)
        expect(investor2.ownedUnits).to.equal(3)
        expect(investor1.balance).to.equal(ethers.utils.parseEther("6.0"))

    })

    it("should prevent investors from transferring units when incorrect amount sent", async function() {
        await unitTrust.connect(inv1).purchaseUnit(1, {
            value: ethers.utils.parseEther("1.01")
        })
        await unitTrust.connect(inv1).postUnit(1, ethers.utils.parseEther("1.00"))
        await expect(unitTrust.connect(inv2).transferUnit(inv1.address, 1, {
            value: ethers.utils.parseEther("0.5")
        })).to.be.revertedWith("Incorrect amount sent")
    })

    it('should allow the contract \'owner\' to withdraw funds', async function() {
        await unitTrust.connect(inv1).purchaseUnit(1, {
            value: ethers.utils.parseEther("1.01")
        })

        await unitTrust.fundWithdraw(ethers.utils.parseEther("0.01"))
        expect(await unitTrust.getBalance()).to.equal(0)
    })

    it('should allow investors to withdraw cleared balance', async function() {
        await unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("10.01")
        })

        let getInvestor = await unitTrust.getInvestor(inv1.address)
        let investor = pairKeys(investorKeys, getInvestor)
        expect(investor.balance).to.equal(0)

        await unitTrust.connect(inv1).postUnit(5, ethers.utils.parseEther("2.00"))
        await unitTrust.connect(inv2).transferUnit(inv1.address, 5, {
            value: ethers.utils.parseEther("10.01")
        })

        getInvestor = await unitTrust.getInvestor(inv1.address)
        investor = pairKeys(investorKeys, getInvestor)
        expect(investor.balance).to.equal(ethers.utils.parseEther("10.00"))

        await unitTrust.connect(inv1).investorWithdraw( ethers.utils.parseEther("10.00"))

        getInvestor = await unitTrust.getInvestor(inv1.address)
        investor = pairKeys(investorKeys, getInvestor)
        expect(investor.balance).to.equal(0)
    })

    // currently for testing purposes to reclaim ether -> actions like this should be outsourced to a DAO
    it('should be able to close the unitTrust', async function() {
        await unitTrust.connect(inv1).purchaseUnit(10, {
            value: ethers.utils.parseEther("10.01")
        })

        await unitTrust.closeUnitTrust(ethers.utils.parseEther("1.00"))
        expect(await unitTrust.getRemainingUnits()).to.equal(0)
    })

})