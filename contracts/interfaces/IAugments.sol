// Dev Note: collapse these down into composable interfaces?
interface IAugments {
    function getAugmentIDByOption(
        string memory option,
        uint8 form,
        uint8 rarity,
        uint8 slot
    ) external view returns (uint256);

    function getAugmentIDBySeries(
        uint32 series,
        uint8 form,
        uint8 rarity,
        uint8 slot
    ) external view returns (uint256);

    function optionStringToSeries(string calldata option)
        external
        view
        returns (uint32);

    function formToSlotCount(uint8 form) external view returns (uint8);
}
