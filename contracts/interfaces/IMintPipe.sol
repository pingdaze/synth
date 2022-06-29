// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IMintPipe {
  function modularMintCallback(
    address recipient,
    uint256[] memory _ids,
    uint256[] memory _requestedAmounts,
    bytes memory _data
  ) external;
}
