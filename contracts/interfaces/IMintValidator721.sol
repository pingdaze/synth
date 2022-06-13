// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IMintValidator721 {
    function validate(
        address _recipient,
        uint256 _dropId,
        string calldata _metadata,
        bytes memory _data
    ) external;
}
