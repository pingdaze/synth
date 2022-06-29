// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Basic1155 is ERC1155 {
  constructor() ERC1155("") {}

  function mint(
    uint256 id,
    address target,
    uint256 amount
  ) public {
    _mint(target, id, amount, "");
  }
}
