// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "../interfaces/ICharacter.sol";
import "../interfaces/ICore.sol";
import "@rari-capital/solmate/src/auth/Auth.sol";

// Note: try to minimize the contract depth that mutative actions have to take
contract AugmentsValidator is Context, Auth {
  ICore public core;
  ICharacter public character;
  mapping(string => uint32) public optionStringToSeries;
  mapping(uint8 => uint16) public formToSlotCount;
  mapping(uint256 => bool) public augmentExists;
  uint16 public slotCount;
  mapping(uint256 => string) public cid;

  // Change to initialize call
  constructor(
    ICharacter _character,
    ICore _core,
    Authority auth
  ) Auth(msg.sender, auth) {
    core = _core;
    character = _character;
  }

  function equipSkeleton(uint256 id, uint16 slotID) external {
    require(uint8(id) == uint8(slotID), "This doesn't fit in this slot");
    character.equipSkeleton(slotID, id, msg.sender);
  }

  function unequipSkeleton(uint16 slotID) external {
    character.unequipSkeleton(slotID, msg.sender);
  }

  function getAugmentIDByOption(
    string memory option,
    uint16 slot,
    uint8 form,
    uint8 rarity
  ) external view returns (uint256 id) {
    uint32 series = optionStringToSeries[option];
    require(series != 0, "Sorry the requested option does not exist");
    id = convertToAugmentUUID(series, slot, form, rarity);
    require(augmentExists[id], "Sorry the requested augment doesn't exist");
  }

  function getAugmentIDBySeries(
    uint32 series,
    uint16 slot,
    uint8 form,
    uint8 rarity
  ) external view returns (uint256 id) {
    id = convertToAugmentUUID(series, slot, form, rarity);
    require(augmentExists[id], "Sorry the requested augment doesn't exist");
  }

  function addAugment(
    uint32 series,
    uint16 slot,
    uint8 form,
    uint8 rarity
  ) external requiresAuth {
    augmentExists[convertToAugmentUUID(series, slot, form, rarity)] = true;
  }

  function removeAugment(
    uint32 series,
    uint16 slot,
    uint8 form,
    uint8 rarity
  ) external requiresAuth {
    augmentExists[convertToAugmentUUID(series, slot, form, rarity )] = false;
  }

  function _setOption(string calldata optionString, uint32 series)
    internal
    requiresAuth
  {
    optionStringToSeries[optionString] = series;
  }

  function addOption(string calldata optionString, uint32 series) external {
    _setOption(optionString, series);
  }

  function removeOption(string calldata optionString) external {
    _setOption(optionString, 0);
  }

  // Unclear if slot should be at the top, or the bottom of this config?
  function convertToAugmentUUID(
    uint32 series,
    uint16 slot,
    uint8 form,
    uint8 rarity
  ) public pure returns (uint256 id) {
    //solhint-disable-next-line
    assembly {
      // Bitshift and Pack series, rarity, and slot into ID -- [series][rarity][slot]
      id := add(
        add(add(slot, mul(rarity, 0x10000)), mul(form, 0x1000000)),
        mul(series, 0x100000000)
      )
    }
  }

  function setCID(uint256 id, string calldata _cid) external {
    cid[id] = _cid;
  }

  function uri(uint256 id) external view returns (string memory) {
    return core.uri(id);
  }
}
