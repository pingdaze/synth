// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IMintValidator {
  function isValid(
    address _operator,
    uint256 _id,
    uint256 _qty,
    string calldata _metadata,
    bytes memory _data
  ) external returns (bool valid);
}
