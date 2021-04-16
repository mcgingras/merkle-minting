import MerkleTree  from '../src/merkle-tree';
import { BigNumber, utils } from 'ethers'


// converts array into Buffer consumable by the Merkle Tree
const toNode = (index: number | BigNumber, account: string, amount: BigNumber): Buffer => {
  return Buffer.from(
    utils.solidityKeccak256(['uint256', 'address', 'uint256'], [index, account, amount]).substr(2),
    'hex'
  )
}

let leaves = [toNode(0, "0x65A3870F48B5237f27f674Ec42eA1E017E111D63", BigNumber.from(1)), toNode(1, "0x65A3870F48B5237f27f674Ec42eA1E017E111D63", BigNumber.from(2))]
let m = new MerkleTree(leaves);

console.log(m);