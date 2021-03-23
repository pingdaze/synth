// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

interface IMintValidator {
  function isValid(
    address _operator,
    uint256 _id,
    string calldata _metadata,
    bytes memory _data
  ) external returns (bool valid);
}
