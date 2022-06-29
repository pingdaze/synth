// SPDX-License-Identifier: AGPL-3.0


pragma solidity ^0.8.0;

import "../IMintValidator.sol";

// A validator that always returns true
// For Testing only
contract BoolValidator is IMintValidator {
  bool private _valid;

  constructor(bool valid_) {
    _valid = valid_;
  }

  function isValid(
    address, /*_operator*/
    uint256, /*_id*/
    uint256, /*_qty*/
    string calldata, /*_metadata*/
    bytes memory /*_data */
  ) external view override returns (bool valid) {
    return _valid;
  }
}
