// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
//pragma abicoder v2;

import "@rari-capital/solmate/src/auth/Auth.sol";

interface IReadMetadata {
  function get(uint256 _id) external view returns (string memory metadata);
}

contract MetadataRegistry is IReadMetadata, Auth {
  event Register(uint256 id, string metadata);
  event UnRegister(uint256 id);

  mapping(uint256 => string) public idToMetadata;

  constructor(Authority auth) Auth(msg.sender, auth) {}

  function set(uint256 _id, string calldata _metadata) public requiresAuth {
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

  function setMultiple(uint256[] calldata _ids, string[] calldata _metadatas)
    external
    requiresAuth
  {
    require(_ids.length == _metadatas.length, "SET_MULTIPLE_LENGTH_MISMATCH");
    for (uint256 i = 0; i < _ids.length; i++) {
      set(_ids[i], _metadatas[i]);
    }
  }
}
