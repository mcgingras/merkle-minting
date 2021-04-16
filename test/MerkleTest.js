const { expect } = require("chai")

// input: "austin", "michael", "meg", "jenna"
// -------------------------------------------------------------------------------
// tree - visualized
// - 0x658ec29ecc2f785a416a12b6ae9244f3d02bcadc1037c937f2274429b9b144ca
// ----- 0xb3011dd8886ddc1cbc786f2fbfa3d0d75b26d8d191ebd7a9ba3d3a9a6944180a
// ---------- '0x357e8ea1fefb357db68588579634b75f57d66ec252b111dc4cfdb8c0a6f3e680'
// ---------- '0x93a1ddf66f95712b2a36e465c39fac5e1d9b86701c55ae2460b00f5e6d1f8d82'
// ----- 0x0ed431f1a91143d8b1ae0fe5a2f9b5c1ecbbd15f17101c23f13ac3c1c718450d
// ---------- '0xdcd7983d09dd8904153ff95e5cc07ecbdeb6ca3439a8c5f9089d97fde10d1cc7'
// ---------- '0x4b7c0f6b94a23cba376d88d23832b0fa5df063e1563edd94a2141e16786afa15'

const tree = {
  root: "0x658ec29ecc2f785a416a12b6ae9244f3d02bcadc1037c937f2274429b9b144ca",
  claims: {
    "0x357e8ea1fefb357db68588579634b75f57d66ec252b111dc4cfdb8c0a6f3e680": {
      "proof": [
        "0x93a1ddf66f95712b2a36e465c39fac5e1d9b86701c55ae2460b00f5e6d1f8d82",
        "0x0ed431f1a91143d8b1ae0fe5a2f9b5c1ecbbd15f17101c23f13ac3c1c718450d"
      ]
    },
    "0x93a1ddf66f95712b2a36e465c39fac5e1d9b86701c55ae2460b00f5e6d1f8d82": {
      "proof": [
        "0x357e8ea1fefb357db68588579634b75f57d66ec252b111dc4cfdb8c0a6f3e680",
        "0x0ed431f1a91143d8b1ae0fe5a2f9b5c1ecbbd15f17101c23f13ac3c1c718450d"
      ]
    },
    "0xdcd7983d09dd8904153ff95e5cc07ecbdeb6ca3439a8c5f9089d97fde10d1cc7": {
      "proof": [
        "0x4b7c0f6b94a23cba376d88d23832b0fa5df063e1563edd94a2141e16786afa15",
        "0xb3011dd8886ddc1cbc786f2fbfa3d0d75b26d8d191ebd7a9ba3d3a9a6944180a"
      ]
    },
    "0x4b7c0f6b94a23cba376d88d23832b0fa5df063e1563edd94a2141e16786afa15": {
      "proof": [
        "0xdcd7983d09dd8904153ff95e5cc07ecbdeb6ca3439a8c5f9089d97fde10d1cc7",
        "0xb3011dd8886ddc1cbc786f2fbfa3d0d75b26d8d191ebd7a9ba3d3a9a6944180a"
      ]
    }
  }
}

describe("Merkle Minting Tests", () => {

  let Merkle;
  let merkleContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let contractAddr;

  beforeEach(async () => {
    Merkle = await ethers.getContractFactory("MerkleDistributor");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    merkleContract = await Merkle.deploy("0x658ec29ecc2f785a416a12b6ae9244f3d02bcadc1037c937f2274429b9b144ca");
    await merkleContract.deployed();

    contractAddr = merkleContract.address;
  });

  describe("Sanity Check...", () => {
    it("merkle root is set correctly", async () => {
      expect(await merkleContract.merkleRoot === "0x658ec29ecc2f785a416a12b6ae9244f3d02bcadc1037c937f2274429b9b144ca");
    })
  })

  describe("Claiming an unclaimed drop...", () => {
    it("claims correctly", async () => {
      const tx = await merkleContract.claim(0, addr1.address, "0x357e8ea1fefb357db68588579634b75f57d66ec252b111dc4cfdb8c0a6f3e680", [
        "0x93a1ddf66f95712b2a36e465c39fac5e1d9b86701c55ae2460b00f5e6d1f8d82",
        "0x0ed431f1a91143d8b1ae0fe5a2f9b5c1ecbbd15f17101c23f13ac3c1c718450d"
      ])

      console.log(tx);
    })
  })
})