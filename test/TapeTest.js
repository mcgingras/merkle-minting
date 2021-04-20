const { expect } = require("chai")
const { TapeTree } = require('../src/tape-tree.js')
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
        Merkle = await ethers.getContractFactory("MerkleVerifier");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    });

    describe("Two account tree", () => {

      beforeEach('deploy', async () => {
        tree = new TapeTree([
          { capacity: BigNumber.from(10), quality: BigNumber.from(10), style: BigNumber.from(10) },
          { capacity: BigNumber.from(10), quality: BigNumber.from(10), style: BigNumber.from(10) },
        ])

        merkleContract = await Merkle.deploy(tree.getHexRoot())
        await merkleContract.deployed();
      })

      it("should claim", async () => {
        const proof0 = tree.getProof(0, BigNumber.from(10), BigNumber.from(10), BigNumber.from(10))
        await expect(merkleContract.claim(0, BigNumber.from(10), BigNumber.from(10), BigNumber.from(10), proof0)).to.emit(merkleContract, 'Claimed')
      })

      it("should set claimed", async () => {
        const proof0 = tree.getProof(0, BigNumber.from(10), BigNumber.from(10), BigNumber.from(10))
        expect(await merkleContract.isClaimed(0)).to.eq(false)
        await merkleContract.claim(0, BigNumber.from(10), BigNumber.from(10), BigNumber.from(10), proof0)
        expect(await merkleContract.isClaimed(0)).to.eq(true)
      })
    })
});
