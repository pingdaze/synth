// SPDX-License-Identifier: AGPL-3.0


pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

// lift up this zeppelin util for use in our tests
contract CollectibleHolder is ERC1155Holder {

}
