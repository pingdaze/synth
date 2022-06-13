// SPDX-License-Identifier: MIT

import "../lib/CharacterLibrary.sol";

interface ICharacter {
    function equipSkeleton(
        uint8 slotID,
        uint256 id,
        address _player
    ) external;

    function equipOutfit(
        uint8 slotID,
        uint256 id,
        address _player
    ) external;

    function unequipSkeleton(uint8 slotID, address _player) external;

    function unequipOutfit(uint8 slotID, address _player) external;

    function addPlayer(
        uint256 _id,
        address _player,
        address[] calldata pillboosts,
        string[] calldata traitsPlus
    ) external;

    function removePlayer(uint256 _id, address _player) external;

    function getSkeleton(uint256 tokenID)
        external
        view
        returns (Skeleton memory);

    function getOutfit(uint256 tokenID) external view returns (Outfit memory);

    function getCharacter(uint256 tokenID)
        external
        view
        returns (Character memory);

    function setSkeleton(uint256 tokenID, Skeleton calldata skeleton) external;

    function setOutfit(uint256 tokenID, Outfit calldata outfit) external;
}
