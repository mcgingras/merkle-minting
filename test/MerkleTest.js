const { expect } = require("chai")
const { BalanceTree } = require('../src/balance-tree.js')
const { BigNumber } = require('ethers')


const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000'

describe("Merkle", () => {

    let Merkle;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let tree;

    beforeEach(async () => {
        Merkle = await ethers.getContractFactory("MerkleDistributor");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    });

    // No proof passed in to claim function
    // No root hash even passed in
    describe("Sanity check...", () => {
        it("should fail on empty merkle proof.", async () => {
            merkleContract = await Merkle.deploy(ZERO_BYTES32);
            await merkleContract.deployed();

            await expect(merkleContract.claim(0, addr1.address, 10, []))
            .to.be.revertedWith('MerkleDistributor: Invalid proof.');
        });
    });

    describe("Two account tree", () => {

      beforeEach('deploy', async () => {
        tree = new BalanceTree([
          { account: addr1.address, amount: BigNumber.from(100) },
          { account: addr2.address, amount: BigNumber.from(101) },
        ])

        merkleContract = await Merkle.deploy(tree.getHexRoot())
        await merkleContract.deployed();
      })

      it("should claim", async () => {
        const proof0 = tree.getProof(0, addr1.address, BigNumber.from(100))
        await expect(merkleContract.claim(0, addr1.address, BigNumber.from(100), proof0)).to.emit(merkleContract, 'Claimed')
      })

      it("should set claimed", async () => {
        const proof0 = tree.getProof(0, addr1.address, BigNumber.from(100))
        expect(await merkleContract.isClaimed(0)).to.eq(false)
        await merkleContract.claim(0, addr1.address, BigNumber.from(100), proof0)
        expect(await merkleContract.isClaimed(0)).to.eq(true)
      })
    })
});
