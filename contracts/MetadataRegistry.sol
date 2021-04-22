// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IReadMetadata {
  function get(uint256 _id) external view returns (string memory metadata);
}

contract MetadataRegistry is IReadMetadata, Ownable {
  event Register(uint256 id, string metadata);
  event UnRegister(uint256 id);

  mapping(uint256 => string) public idToMetadata;

  function set(uint256 _id, string calldata _metadata) external onlyOwner {
    idToMetadata[_id] = _metadata;
    emit Register(_id, _metadata);
  }

  function get(uint256 _id)
    public
    view
    override
    returns (string memory metadata)
  {
    metadata = idToMetadata[_id];
    require(bytes(metadata).length > 0, "MISSING_URI");
  }
}
