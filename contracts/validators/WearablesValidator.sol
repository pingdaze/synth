// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "../interfaces/ICharacter.sol";
import "../interfaces/ICore.sol";
import "@rari-capital/solmate/src/auth/Auth.sol";

// Note: try to minimize the contract depth that mutative actions have to take
contract WearablesValidator is Context, Auth {
    ICore public core;
    ICharacter public character;
    mapping(string => uint32) public optionStringToSeries;
    mapping(uint8 => uint8) public formToSlotCount;
    mapping(uint256 => bool) public wearableExists;
    uint8 public slotCount;

    // Change to initialize call
    constructor(
        ICharacter _character,
        ICore _core,
        Authority auth
    ) Auth(msg.sender, auth) {
        core = _core;
        character = _character;
    }

    function equipSkeleton(uint256 id, uint8 slotID) external {
        require(uint8(id) == uint8(slotID), "This doesn't fit in this slot");
        character.equipSkeleton(slotID, id, msg.sender);
    }

    function unequipSkeleton(uint8 slotID) external {
        character.unequipSkeleton(slotID, msg.sender);
    }

    function getWearableIDByOption(
        string memory option,
        uint8 form,
        uint8 rarity,
        uint8 slot
    ) external view returns (uint256 id) {
        uint32 series = optionStringToSeries[option];
        require(series != 0, "Sorry the requested option does not exist");
        id = convertToWearableUUID(series, form, rarity, slot);
        require(
            wearableExists[id],
            "Sorry the requested wearable doesn't exist"
        );
    }

    function getWearableIDBySeries(
        uint32 series,
        uint8 form,
        uint8 rarity,
        uint8 slot
    ) external view returns (uint256 id) {
        id = convertToWearableUUID(series, form, rarity, slot);
        require(
            wearableExists[id],
            "Sorry the requested wearable doesn't exist"
        );
    }

    function addWearable(
        uint32 series,
        uint8 form,
        uint8 rarity,
        uint8 slot
    ) external requiresAuth {
        wearableExists[
            convertToWearableUUID(series, form, rarity, slot)
        ] = true;
    }

    function removeWearable(
        uint32 series,
        uint8 form,
        uint8 rarity,
        uint8 slot
    ) external requiresAuth {
        wearableExists[
            convertToWearableUUID(series, form, rarity, slot)
        ] = false;
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
    function convertToWearableUUID(
        uint32 series,
        uint8 form,
        uint8 rarity,
        uint8 slot
    ) public pure returns (uint256 id) {
        //solhint-disable-next-line
        assembly {
            // Bitshift and Pack series, rarity, and slot into ID -- [series][rarity][slot]
            id := add(
                add(add(slot, mul(rarity, 0x100)), mul(form, 0x10000)),
                mul(series, 0x1000000)
            )
        }
    }
}
