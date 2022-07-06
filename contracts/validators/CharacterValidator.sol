// SPDX-License-Identifier: AGPL-3.0


pragma solidity ^0.8.0;

import "../chainlink/VRFRequester.sol";
import "../characters/SelectableOptions.sol";
import "../interfaces/IWearables.sol";
import "../interfaces/IAugments.sol";
import "../interfaces/ICharacter.sol";
import "../interfaces/ICore.sol";
import "../interfaces/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../lib/LegacyPills.sol";
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
contract CharacterValidator is Ownable {
  uint256 public constant MAX_INT = 2**256 - 1;
  address private _zeroAddress = 0x0000000000000000000000000000000000000000;
  VRFRequester _requester;
  // Instance of core
  ICore public core;
  IWearables public wearables;
  SelectableOptions public selectableOptions;
  IWearables public wearableOptions;
  IAugments public augmentOptions;
  ICharacter public character;
  IERC1155 private _collabPills;
  IERC1155 private _legacyPills;
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
  /**
   * @dev
   */
  constructor(
    ICore _core,
    SelectableOptions _selectableOptions,
    IWearables _wearableOptions,
    IAugments _augmentOptions,
    ICharacter _character,
    uint32 charPerCall_,
    address requester_,
    IERC1155 collabPills_,
    IERC1155 legacyPills_
  ) {
    // TODO: create setter for this, otherwise we could have some #BadVibes with the gassage
    core = _core;
    _charPerCall = charPerCall_;
    selectableOptions = _selectableOptions;
    wearableOptions = _wearableOptions;
    augmentOptions = _augmentOptions;
    character = _character;
    _requester = VRFRequester(requester_);
    _collabPills = collabPills_;
    _legacyPills = legacyPills_;
  }

  /**
      Things we're setting in the character generation process: Form, Class, origin, traits, pillboosts and name 
      param pillboosts - An addresses prescence in this array is indicitive of the user _using_ the pillboost. Still check if it's held!

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
    /// @param legacyPills Array of the ID of all legacy pills being used
    /// @param collabPills Array of the ID of all collab pills being used
    /// @param traitsPlus Every character option selected during character creation
  */
  function createCharacter(
    uint256[] calldata legacyPills,
    uint256[] calldata collabPills,
    string[] calldata traitsPlus
  ) external payable returns(uint256) {
    // Confirm address holds all the pills they claim to hold
    return _createCharacter(
      legacyPills,
      collabPills,
      traitsPlus,
      ++nextId,
      msg.sender
    );
  }

  function createCharacterL1(
    uint256[] calldata legacyPills,
    uint256[] calldata collabPills,
    string[] calldata traitsPlus,
    address target
  ) external payable {
    // Confirm address holds all the COLLAB pills they claim to hold
    _createCharacter(legacyPills, collabPills, traitsPlus, ++nextId, target);
  }

  // This is the part that needs to be converted to make the skeletons extensible
  function _createCharacter(
    uint256[] calldata legacyPills,
    uint256[] calldata collabPills,
    string[] calldata traitsPlus,
    uint256 characterId,
    address target
  ) internal returns (uint256){
    Skeleton memory newSkeleton;
    selectableOptions.validateFaction(traitsPlus[4], legacyPills[0], target);
    if (_compareMem(traitsPlus[0], "Pepel")) {
      newSkeleton = defaultSkeleton;
      newSkeleton.mouth = selectableOptions.validateOption(
        traitsPlus,
        5,
        msg.value,
        legacyPills,
        target
      );
      newSkeleton.eyes = selectableOptions.validateOption(
        traitsPlus,
        6,
        msg.value,
        legacyPills,
        target
      );
      newSkeleton.color = selectableOptions.validateOption(
        traitsPlus,
        7,
        msg.value,
        legacyPills,
        target
      );
      newSkeleton.marking = selectableOptions.validateOption(
        traitsPlus,
        8,
        msg.value,
        legacyPills,
        target
      );
    } else if (_compareMem(traitsPlus[0], "Hashmonk")) {
      newSkeleton.head = selectableOptions.validateOption(
        traitsPlus,
        5,
        msg.value,
        legacyPills,
        target
      );
      newSkeleton.torso = selectableOptions.validateOption(
        traitsPlus,
        6,
        msg.value,
        legacyPills,
        target
      );
      newSkeleton.lArm = selectableOptions.validateOption(
        traitsPlus,
        7,
        msg.value,
        legacyPills,
        target
      );
      newSkeleton.rArm = selectableOptions.validateOption(
        traitsPlus,
        8,
        msg.value,
        legacyPills,
        target
      );
      newSkeleton.lLeg = selectableOptions.validateOption(
        traitsPlus,
        9,
        msg.value,
        legacyPills,
        target
      );
      newSkeleton.rLeg = selectableOptions.validateOption(
        traitsPlus,
        10,
        msg.value,
        legacyPills,
        target
      );
      newSkeleton.color = selectableOptions.validateOption(
        traitsPlus,
        11,
        msg.value,
        legacyPills,
        target
      );
      newSkeleton.crown = selectableOptions.validateOption(
        traitsPlus,
        12,
        msg.value,
        legacyPills,
        target
      );
      
    } else {
      revert("Invalid form");
    }
    core.modularMintCallback(msg.sender, characterId, "");
    // Start by adding the player into the characters contract
    character.addPlayer(
      characterId,
      msg.sender,
      legacyPills,
      collabPills,
      traitsPlus
    );
    if (_compareMem(traitsPlus[0], "Hashmonk")){
      character.setOutfitSlot(characterId, 0, uint32(selectableOptions.getOptionId(traitsPlus[13])));
    }
    character.setSkeleton(characterId, newSkeleton);
    for (uint256 index = 0; index < legacyPills.length; index++) {
      if(legacyPills[index] != 0){
        console.log(legacyPills[index]);
        console.log(msg.sender);
        _legacyPills.safeTransferFrom(msg.sender, _zeroAddress, legacyPills[index], 1, "");
      }
      if(collabPills[index] != 0) {
        console.log(collabPills[index]);
        console.log(msg.sender);
        _collabPills.safeTransferFrom(msg.sender, _zeroAddress, collabPills[index], 1, "");
      }
    }
    return characterId;
  }

  // solhint-disable-next-line
  function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)
    internal
  {
    uint256 length = randomWords.length;
    require(length == _charPerCall);
    uint256 characterId;
    for (uint32 i = 0; i < length; i++) {
      uint256 shiftedIndex = _charIdQueue[requestId] + i;
      characterId = _charIdQueue[shiftedIndex];
      _generateDrops(characterId, randomWords[shiftedIndex]);
    }
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

  function _generateDrops(uint256 characterId, uint256 seed) internal {
    Character memory characterInstance = character.getCharacter(characterId);
    uint8 chance;
    uint8 roll;
    uint8 characterOptionNum;
    string memory optionString;
    uint8 rarity;
    uint8 form = _compareMem(characterInstance.form, "Pepel") ? 1 : 2;
    uint8 augmentSlots = augmentOptions.formToSlotCount(form);
    uint8 wearableSlots = wearableOptions.formToSlotCount(form);
    // set these to the bitshifted roll just to dodge the even/odd divider
    // These get further manipulated later in the algo this is just a convenient
    // start value
    uint8 wearableSlot = (roll >> 2);
    uint8 augmentSlot = (roll >> 2);
    roll = _getSubRandom(1, seed);
    for (
      uint32 i = 5;
      i > 0 && roll >= chance;
      roll = _getSubRandom(i++, seed)
    ) {
      if (i > characterInstance.legacyPills.length) {
        chance = 0;
      } else {
        chance = uint8(256 - (2**(3 + i)));
      }
      // Shift the chance so we evade the even check in the next statement
      // then get a character option ()
      characterOptionNum = 3 + ((roll >> 1) % 3);
      optionString = _getTraitFromIndex(characterOptionNum, characterInstance);
      rarity = _getRarityFromRoll(roll);
      if (roll % 2 == 0) {
        //You get an AUGMENT!
        augmentSlot = augmentSlot++ % augmentSlots;
        character.equipSkeleton(
          augmentSlot,
          augmentOptions.getAugmentIDByOption(
            optionString,
            form,
            rarity,
            augmentSlot
          ),
          characterInstance.player
        );
      } else {
        //You get an WEARABLE!
        wearableSlot = wearableSlot++ % wearableSlots;
        character.equipOutfit(
          wearableSlot,
          wearableOptions.getWearableIDByOption(
            optionString,
            form,
            rarity,
            wearableSlot
          ),
          characterInstance.player
        );
      }
    }
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

  function getEquipment(uint256 characterId) external view returns (string[] memory equipment){
      Character memory characterInstance = character.getCharacter(characterId);
      equipment = new string[](10);
      uint256[] memory legacyPills = characterInstance.legacyPills;
      uint256[] memory collabPills = characterInstance.collabPills;
      for(uint32 i = 0; i < 5; i++){
        if(legacyPills[i] != 0){
          equipment[i] = (wearableOptions.getEquipmentFromPill(LegacyPills.getTypeFromId(legacyPills[i])));
        }
        if(collabPills[i] != 0){
          equipment[i+5] = (wearables.getEquipmentFromPill(collabPills[i]));
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
