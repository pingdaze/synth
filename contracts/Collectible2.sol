// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IMintValidator.sol";
import "./MetadataRegistry.sol";

// write interface for
//Interface

contract Collectible2 is Context, ERC1155Burnable, Ownable {
  event Validator(IMintValidator indexed validator, bool indexed active);

  IERC1155 public originalToken;
  mapping(IMintValidator => bool) public isValidator;
  // URI base; NOT the whole uri.
  string private _uri;
  IReadMetadata private _registry;

  /**
   * @dev intializes the core ERC1155 logic, and sets the original address
   */
  constructor(
    IERC1155 _original,
    string memory baseUri_,
    IReadMetadata registry_
  ) ERC1155(baseUri_) {
    _registry = registry_;
    originalToken = _original;
    _uri = baseUri_;
  }

  function uri(uint256 _id) public view override returns (string memory) {
    return string(abi.encodePacked(_uri, _registry.get(_id)));
  }

  function setBaseURI(string calldata _newBaseUri) external onlyOwner {
    _setURI(_newBaseUri);
  }

  function addValidator(IMintValidator _validator) external virtual onlyOwner {
    bool isActive = isValidator[_validator];
    require(!isActive, "VALIDATOR_ACTIVE");
    isValidator[_validator] = true;
    emit Validator(_validator, !isActive);
  }

  function removeValidator(IMintValidator _validator)
    external
    virtual
    onlyOwner
  {
    bool isActive = isValidator[_validator];
    require(isActive, "VALIDATOR_INACTIVE");
    isValidator[_validator] = false;
    emit Validator(_validator, !isActive);
  }

  /**
   * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] variant of {mint}.
   */
  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) external virtual onlyOwner {
    _mintBatch(to, ids, amounts, data);
  }

  /**
   * @notice Seek approval from EOA to transfer its tokens before calling `migrate`
   * @dev accepts token _ids from the original Pillz token, burns them and
   * mints replacements.
   */
  function migrate(uint256[] calldata _ids, uint256[] calldata _values) public {
    address burner = address(0x1);
    bytes memory empty = "";

    // unlike ERC-20s, this call will revert if the tokens can't be transfered
    originalToken.safeBatchTransferFrom(
      _msgSender(),
      burner,
      _ids,
      _values,
      empty
    );
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
  function modularMint(
    uint256 _id,
    address _to,
    uint256 _amount,
    bytes memory _data,
    IMintValidator _validator,
    string calldata _metadata
  ) public virtual {
    require(isValidator[_validator], "BAD_VALIDATOR");
    require(
      _validator.isValid(msg.sender, _id, _amount, _metadata, _data),
      "INVALID_MINT"
    );

    _mint(_to, _id, _amount, _data);
  }
}
