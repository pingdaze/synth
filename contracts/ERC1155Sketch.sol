// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Pausable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "./IMintValidator.sol";

/**
 * @dev {ERC1155} token, including:
 *
 *  -
 *  -
 *  -
 *
 */
contract ERC1155Sketch is Context, ERC1155Burnable {

    IERC1155 private original;
    mapping (IMintValidator => bool) isValidator;
    /**
     * @dev intializes the core ERC1155 logic, and sets the original address
     */
    constructor(address _original, string memory _uri) ERC1155(_uri) {
        original = IERC1155(_original);
    }

    /**
     * @notice Seek approval from EOA to transfer its tokens before calling `migrate`
     * @dev accepts token _ids from te original Pillz token, burns them and
     * mints replacements.
     */
     function migrate(uint256[] calldata _ids, uint256[] calldata _values) public  {
        address burner = address(0x1);
        bytes memory empty = "";

        // unlike ERC-20s, this call will throw if the tokens can't be transfered
        original.safeBatchTransferFrom(_msgSender(), burner, _ids, _values, empty);
        _mintBatch(_msgSender(), _ids, _values, empty);
     }



    /**
     * @dev Creates `amount` new tokens for `to`, of token type `id`.
     *
     * See {ERC1155-_mint}.
     *
     * Requirements:
     *
     */
    function modularMint(uint256 _drop, address _to, uint256 _id, bytes memory _data, IMintValidator validator, string calldata _metadata) public virtual {
        require(isValidator[validator], "BAD_VALIDATOR");
        require(validator.isValid(msg.sender, _drop, _metadata, _data));

        _mint(_to, _id, 1, _data);
    }

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] variant of {mint}.
     */
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public virtual {

        _mintBatch(to, ids, amounts, data);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        internal virtual override(ERC1155)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
