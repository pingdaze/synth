// SPDX-License-Identifier: AGPL-3.0


pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IMintValidator.sol";
import "./Collectible2.sol";

contract SequenceValidator is Ownable, IMintValidator {
  struct Drop {
    uint256 collectibleId;
    uint128 quantityAvailable;
    uint64 startTime;
    uint64 endTime;
    // do we want a start block?
    uint64 endBlock;
  }

  mapping(uint256 => Drop) public drops;
  // initialize with token and track state there
  //mapping(uint256 => bool) public claimed;

  Collectible2 public token;

  constructor(Collectible2 _address) {
    token = _address;
  }

  function isValid(
    address, /* _operator*/
    uint256 _collectibleId, /* _dropId*/
    uint256 _quantity, /* _qty*/
    string calldata, /* _metadata*/
    bytes memory /* _data*/
  ) external view override returns (bool valid) {
    Drop memory drop = drops[_collectibleId];
    // 0. validate that blocknumber or timestamp have not passed
    require(block.timestamp > drop.startTime, "SEQ_DROP_TIME_EARLY");
    require(block.timestamp <= drop.endTime, "SEQ_DROP_TIME_EXPIRED");
    require(block.number <= drop.endBlock, "SEQ_DROP_BLOCK_PASSED");
    // 2. validate that the indicated quantity is available
    require(
      token.quantityMinted(_collectibleId) + _quantity <=
        drop.quantityAvailable,
      "SEQ_DROP_MAX_QUANTITY"
    );
    // possibly hardcode to 1
    require(_quantity == 1, "SEQ_DROP_LIMIT_ONE");
    // 3. return result
    return true;
  }

  function createDrop(
    uint256 _collectibleId,
    uint16 _quantityAvailable,
    uint64 _startTime,
    uint64 _endTime,
    uint16 _endBlock
  ) external onlyOwner {
    /*
     1. ?split startId in type and index
     2.
     */
    require(
      drops[_collectibleId].collectibleId == 0,
      "SEQ_DROP_DUPLICATE_DROP"
    );
    drops[_collectibleId] = Drop(
      _collectibleId,
      _quantityAvailable,
      _startTime,
      _endTime,
      _endBlock
    );
  }
}
