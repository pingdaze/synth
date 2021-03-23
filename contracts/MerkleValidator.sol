// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "@openzeppelin/contracts/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IMintValidator.sol";

contract MerkleValidator is Ownable, IMintValidator {
  struct Drop {
    bytes32 _merkleRoot;
    uint16 _blocks;
    uint64 _endTime;
  }

  mapping(uint256 => Drop) public drops;
  mapping(uint256 => bool) public claimed;

  function isValid(
    address _operator,
    uint256 _dropId,
    string calldata _metadata,
    bytes memory _data
  ) external override returns (bool valid) {
    // 0: validate that blocknumber or timestamp have not passed
    // 1. lookup merkle root and ensure drop is valid
    // 2. generate hash using input params
    // 3. verify hash
    // 4. mark as claimed? probably better to check this on the token contract
    // 4. return result
    return false;
  }

  function seedAllocations(
    uint256 _dropKey,
    bytes32 _merkleRoot,
    uint16 _blocks,
    uint64 _endTime
  ) external onlyOwner {
    require(drops[_dropKey]._merkleRoot == bytes32(0), "cannot rewrite a drop");
    drops[_dropKey] = Drop(_merkleRoot, _blocks, _endTime);
  }
}
