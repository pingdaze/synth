// SPDX-License-Identifier: AGPL-3.0

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
  mapping(uint256 => uint256) public quantityMinted;
  // URI base; NOT the whole uri.
  string private _uri;
  IReadMetadata private _registry;

  /**
   * @dev intializes the core ERC1155 logic, and sets the original URI base
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

  /**
   * @dev query URI for a token Id. Queries the Metadata registry on the backend
   */
  function uri(uint256 _id) public view override returns (string memory) {
    return string(abi.encodePacked(_uri, _registry.get(_id)));
  }

  /**
   * @dev change the URI base address after construction.
   */
  function setBaseURI(string calldata _newBaseUri) external onlyOwner {
    _setURI(_newBaseUri);
  }

  /**
   * @dev An active Validator is necessary to enable `modularMint`
   */
  function addValidator(IMintValidator _validator) external virtual onlyOwner {
    bool isActive = isValidator[_validator];
    require(!isActive, "VALIDATOR_ACTIVE");
    isValidator[_validator] = true;
    emit Validator(_validator, !isActive);
  }

  /**
   * @dev Remove Validators that are no longer needed to remove attack surfaces
   */
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
   * @dev Mint mulitiple tokens at different quantities. This is an onlyOwner-guareded
          function and is meant basically as a sudo-command.
   */
  function mintBatch(
    address _to,
    uint256[] memory _ids,
    uint256[] memory _amounts,
    bytes memory _data
  ) external virtual onlyOwner {
    _mintBatch(_to, _ids, _amounts, _data);
    _updateMintedQuantities(_ids, _amounts);
  }

  /**
   * @notice Seek approval from EOA to transfer its tokens before calling `migrate`
   * @dev accepts token _ids from the original Pillz token, burns them and
   * mints replacements.
   */
  function migrate(uint256[] calldata _ids, uint256[] calldata _amounts)
    public
  {
    address burnerAddress = address(0x1);
    bytes memory emptyBytes = "";

    // unlike ERC-20s, this call will revert if the tokens can't be transfered
    originalToken.safeBatchTransferFrom(
      _msgSender(),
      burnerAddress,
      _ids,
      _amounts,
      emptyBytes
    );
    _mintBatch(_msgSender(), _ids, _amounts, emptyBytes);
    _updateMintedQuantities(_ids, _amounts);
  }

  /**
   * @dev Creates `amount` new tokens for `to`, of token type `id`.
   *      At least one Validator must be active in order to utilized this interface.
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
    _updateMintedQuantity(_id, _amount);
  }

  function _updateMintedQuantities(
    uint256[] memory _ids,
    uint256[] memory _amounts
  ) internal {
    require(_ids.length == _amounts.length, "MINT_QUANTITY_MISMATCH");
    for (uint256 i = 0; i < _ids.length; i++) {
      quantityMinted[_ids[i]] += _amounts[i];
    }
  }

  function _updateMintedQuantity(uint256 _id, uint256 _amount) internal {
    uint256[] memory ids = new uint256[](1);
    uint256[] memory amounts = new uint256[](1);
    ids[0] = _id;
    amounts[0] = _amount;
    _updateMintedQuantities(ids, amounts);
  }
}
