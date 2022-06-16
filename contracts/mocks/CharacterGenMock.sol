pragma solidity ^0.8.0;

// Mocked endpoint for all of the basic distro flows
// In production this will be three seperate contracts, so build accordingly.
// This contract is simply meant to provide a clean mocked version of the primary endpointss
// needed for the basic distribution apps. Some functions _may_ change slightly, but generally
// integrating based on these mocks should allow us to integrate the completed contracts with little to no friction
// and provide a more stable, modular and accesible testing option for front-end testing.

contract CharacterGenMock {
  address[] _pillboosts;
  string[] _traitsPlug;
  uint256 _characterId;

  /**
      Things we're setting in the character generation process: Form, Class, origin, attributes, traits, pillboosts and name 
      param pillboosts - An addresses prescence in this array is indicitive of the user _using_ the pillboost. Still check if it's held!

      // String Array Taxonomy?

      For the time being I'm collapsing all of the strings that this function consumes into a single array for the sake of not
      getting fucked by the compiler. When I have a better solution I'll implement it. For now this is the format:

      [0] = form
      [1] = class
      [2] = name
      [3-X] = traits

      We may need to further encode the traits slots to clarify backgrounds etc.
        @dev Only memory for the mock, may be more efficient as calldata in prod if so the mock should be modified.      
  */
  function createCharacter(
    address[] memory pillboosts,
    string[] memory traitsPlus
  ) external returns (string memory) {
    _characterId += 1;
    _pillboosts = pillboosts;
    _traitsPlug = traitsPlus;
    return _uint2str(_characterId);
  }

  function _uint2str(uint256 _i) internal pure returns (string memory str) {
    if (_i == 0) {
      return "0";
    }
    uint256 j = _i;
    uint256 length;
    while (j != 0) {
      length++;
      j /= 10;
    }
    bytes memory bstr = new bytes(length);
    uint256 k = length;
    j = _i;
    while (j != 0) {
      bstr[--k] = bytes1(uint8(48 + (j % 10)));
      j /= 10;
    }
    str = string(bstr);
  }
}
