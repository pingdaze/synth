// SPDX-License-Identifier: AGPL-3.0


pragma solidity ^0.8.0;

import "../characters/SelectableOptionsV2.sol";
import "../interfaces/IWearables.sol";
import "../interfaces/ICharacterV2.sol";
import "../interfaces/ICore.sol";
import "../interfaces/IERC1155.sol";
import "../interfaces/ICore1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

// TODO: Put these in a single place, these are also located in the Characters contract


//Slot to ID mapping
// SKELETON
// Head = 1
// Torso = 2
// larm = 3
// rarm = 4
// lleg = 5
// rleg = 6
// mouth = 7
// eyes = 8
// color = 9
// marking = 10
// crown = 11
// OUTFIT
// Head = 33
// Torso = 34
// larm = 35
// rarm = 36
// lleg = 37
// rleg = 38
// floating = 39
contract CharacterValidatorV2 is Ownable {
  uint256 public constant MAX_INT = 2**256 - 1;
  address private _zeroAddress = 0x0000000000000000000000000000000000000000;
  // Instance of core
  ICore public core;
  ICore1155 public _boosters;
  IWearables public wearables;
  SelectableOptionsV2 public selectableOptions;
  IWearables public wearableOptions;
  ICharacter public character;
  IERC1155 private _collabPills;
  IERC1155 private _legacyPills;
  IERC1155 private _portalPill;
  uint256 public nextId = 0;

  uint256[] private _charIdQueue;
  uint32 private _charPerCall;
  uint256 private _qOffset;
  mapping(uint256 => uint256) private _request2Offset;
  Skeleton public defaultSkeleton = Skeleton(
    1,2,3,4,5,6,7,8,9,10,11
  );
  Outfit public defaultOutfit = Outfit(
    33,34,35,36,37,38,39
  );

  event CharacterCreated(address indexed _owner, uint indexed _id);

  /**
   * @dev
   */
  constructor(
    ICore _core,
    SelectableOptionsV2 _selectableOptions,
    IWearables _wearableOptions,
    ICharacter _character,
    uint32 charPerCall_,
    IERC1155 portalPill_
  ) {
    // TODO: create setter for this, otherwise we could have some #BadVibes with the gassage
    _portalPill = portalPill_;
    core = _core;
    _charPerCall = charPerCall_;
    selectableOptions = _selectableOptions;
    wearableOptions = _wearableOptions;
    character = _character;
  }

  /**
      Things we're setting in the character generation process: Form, Class, origin, traits, and name 

      // String Array Taxonomy?

      For the time being I'm collapsing all of the strings that this function consumes into a single array for the sake of not
      getting fucked by the compiler. When I have a better solution I'll implement it. For now this is the format:

      [0] = form
      [1-X] = traits
      [Y-Z] = character selectable options

      For Launch this looks something like...

      [0] = form
      [1] = origin
      [2] = upbringing
      [3] = gift
      [4] = faction
      [5] = mask[hashmonk] or mouth[pepel]
      [6] = water type[hashmonk] or eyes[pepel]
      [7] = frog type[pepel]
      [8] = marking type[pepel]

      Need a "termination" string for the traits?

      We may need to further encode the traits slots to clarify backgrounds etc.
    /// @notice generate a character for PACE
    /// @param traitsPlus Every character option selected during character creation
  */
  function createCharacter(
    string[] calldata traitsPlus
  ) external payable {
    if(_portalPill.balanceOf(msg.sender, 1) > 0) {
      _portalPill.safeTransferFrom(msg.sender, address(_zeroAddress), 1, 1, "");
    } else if (_portalPill.balanceOf(msg.sender, 2) > 0) {
      _portalPill.safeTransferFrom(msg.sender, address(_zeroAddress), 1, 1, "");
    } else {
      revert("You need a portal pill to create a character");
    }
    _createCharacter(
      traitsPlus,
      ++nextId,
      msg.sender
    );
  }

  function createCharacterL1(
    string[] calldata traitsPlus,
    address target
  ) external payable {
    _createCharacter(traitsPlus, ++nextId, target);
  }

  // This is the part that needs to be converted to make the skeletons extensible
  function _createCharacter(
    string[] calldata traitsPlus,
    uint256 characterId,
    address target
  ) internal {
    Skeleton memory newSkeleton;
    uint8 form = _compareMem(traitsPlus[0], "Pepel") ? 1 : 2;
    if (form == 1) {
      newSkeleton = defaultSkeleton;
      newSkeleton.mouth = selectableOptions.validateOption(
        traitsPlus,
        5,
        msg.value,
        target
      );
      newSkeleton.eyes = selectableOptions.validateOption(
        traitsPlus,
        6,
        msg.value,
        target
      );
      newSkeleton.color = selectableOptions.validateOption(
        traitsPlus,
        7,
        msg.value,
        target
      );
      newSkeleton.marking = selectableOptions.validateOption(
        traitsPlus,
        8,
        msg.value,
        target
      );
    } else if (form == 2) {
      newSkeleton.head = selectableOptions.validateOption(
        traitsPlus,
        5,
        msg.value,
        target
      );
      newSkeleton.torso = selectableOptions.validateOption(
        traitsPlus,
        6,
        msg.value,
        target
      );
      newSkeleton.lArm = selectableOptions.validateOption(
        traitsPlus,
        7,
        msg.value,
        target
      );
      newSkeleton.rArm = selectableOptions.validateOption(
        traitsPlus,
        8,
        msg.value,
        target
      );
      newSkeleton.lLeg = selectableOptions.validateOption(
        traitsPlus,
        9,
        msg.value,
        target
      );
      newSkeleton.rLeg = selectableOptions.validateOption(
        traitsPlus,
        10,
        msg.value,
        target
      );
      newSkeleton.color = selectableOptions.validateOption(
        traitsPlus,
        11,
        msg.value,
        target
      );
      newSkeleton.crown = selectableOptions.validateOption(
        traitsPlus,
        12,
        msg.value,
        target
      );
      
    } else {
      revert("Invalid form");
    }
    core.modularMintCallback(msg.sender, characterId, "");
    // Start by adding the player into the characters contract
    character.addPlayer(
      characterId,
      traitsPlus
    );
    if (_compareMem(traitsPlus[0], "Hashmonk")){
      character.setOutfitSlot(characterId, 0, uint32(selectableOptions.getOptionId(traitsPlus[13])));
    }
    character.setSkeleton(characterId, newSkeleton);
    emit CharacterCreated(msg.sender, characterId);
  }

  function settings(    
    ICore _core,
    SelectableOptionsV2 _selectableOptions,
    IWearables _wearableOptions,
    ICharacter _character,
    uint32 charPerCall_,
    IERC1155 collabPills_,
    IERC1155 legacyPills_,
    IERC1155 portalPill_
  ) external onlyOwner{
    // TODO: create setter for this, otherwise we could have some #BadVibes with the gassage
    _portalPill = portalPill_;
    core = _core;
    _charPerCall = charPerCall_;
    selectableOptions = _selectableOptions;
    wearableOptions = _wearableOptions;
    character = _character;
    _collabPills = collabPills_;
    _legacyPills = legacyPills_;
  }

  function _compareMem(string memory a, string memory b)
    internal
    pure
    returns (bool)
  {
    if (bytes(a).length != bytes(b).length) {
      return false;
    } else {
      return keccak256(bytes(a)) == keccak256(bytes(b));
    }
  }

  function _getSubRandom(uint256 index, uint256 source)
    internal
    pure
    returns (uint8)
  {
    if (index == 0) {
      return uint8(source);
    }
    return uint8(source / (256 * index));
  }

  /// @notice Collects and sends an amount of ETH to the selected target from this validator
  /// @param target Address to send requested ETH to
  /// @param value Amount of ETH (in wei) to transfer
  function collectEth(address target, uint256 value) external onlyOwner {
    _sendEth(target, value);
  }

  /// @notice Collects all ETH to the selected target from this validator
  /// @param target Address to send requested ETH to
  function collectAllEth(address target) external onlyOwner {
    _sendEth(target, address(this).balance);
  }

  function _sendEth(address target, uint256 value) internal {
    (bool success, ) = target.call{value: value}("");
    require(success, "Transfer failed.");
  }

  function getEquipment(uint256 characterId) public view returns (string[] memory equipment){
      Character memory characterInstance = character.getCharacter(characterId);
      uint8 form = _compareMem(characterInstance.form, "Pepel") ? 1 : 2;
      equipment = _processEquipment(characterInstance.legacyPills, characterInstance.collabPills, form);
  }

  function _processEquipment(uint256[] memory legacyPills, uint256[] memory collabPills, uint8 form) internal view returns (string[] memory equipment){
      equipment = new string[](10);
      string[] memory equipmentArray;
      uint8 equipmentIndex = 0;
      for(uint32 i = 0; i < 5; i++){
        equipmentArray = new string[](0);
        if(legacyPills[i] != 0){
          console.log(legacyPills[i], "legacyPills[i]");
          equipmentArray =  wearableOptions.getEquipmentFromPill(legacyPills[i], form);
        }
        if(collabPills[i] != 0){
          console.log(collabPills[i], "collabPills[i]");
          equipmentArray =  wearableOptions.getEquipmentFromPill(collabPills[i], form);
        }
        for(uint32 j = 0; j < equipmentArray.length; j++){
          console.log(equipmentArray[j], equipmentIndex);
          equipment[equipmentIndex++] = equipmentArray[j];
        }
      }
  }



  function _getTraitFromIndex(uint256 index, Character memory char)
    internal
    pure
    returns (string memory)
  {
    if (index == 0) {
      return char.origin;
    }
    if (index == 1) {
      return char.upbringing;
    }
    if (index == 2) {
      return char.gift;
    }
    if (index == 3) {
      return char.faction;
    }
    return "";
  }

  function _getRarityFromRoll(uint8 roll) internal pure returns (uint8 rarity) {
    if (roll > 230) {
      rarity = 3;
    } else if (roll > 153) {
      rarity = 2;
    } else {
      rarity = 1;
    }
  }
}
