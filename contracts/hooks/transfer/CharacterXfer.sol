// SPDX-License-Identifier: MIT
import "../../interfaces/ICharacter.sol";
import "../../interfaces/IXferHook.sol";

pragma solidity ^0.8.0;

contract CharacterXfer is IXferHook {
    ICharacter private _character;

    constructor(ICharacter character_) {
        _character = character_;
    }

    function xferHook(
        address from,
        address,
        uint256 id
    ) external override {
        _character.removePlayer(id, from);
    }
}
