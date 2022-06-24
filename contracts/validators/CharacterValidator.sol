// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../chainlink/VRFRequester.sol";
import "../characters/SelectableOptions.sol";
import "../interfaces/IWearables.sol";
import "../interfaces/IAugments.sol";
import "../interfaces/ICharacter.sol";
import "../interfaces/ICore.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// TODO: Put these in a single place, these are also located in the Characters contract

contract CharacterValidator is Ownable {
  uint256 public constant MAX_INT = 2**256 - 1;

  VRFRequester _requester;
  // Instance of core
  ICore public core;
  IWearables public wearables;
  SelectableOptions public selectableOptions;
  IWearables public wearableOptions;
  IAugments public augmentOptions;
  ICharacter public character;
  uint256 public nextId = 0;

  uint256[] private _charIdQueue;
  uint32 private _charPerCall;
  uint256 private _qOffset;
  mapping(uint256 => uint256) private _request2Offset;

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
    address requester_
  ) {
    // TODO: create setter for this, otherwise we could have some #BadVibes with the gassage
    core = _core;
    _charPerCall = charPerCall_;
    selectableOptions = _selectableOptions;
    wearableOptions = _wearableOptions;
    augmentOptions = _augmentOptions;
    character = _character;
    _requester = VRFRequester(requester_);
  }

  /**
      Things we're setting in the character generation process: Form, Class, origin, traits, pillboosts and name 
      param pillboosts - An addresses prescence in this array is indicitive of the user _using_ the pillboost. Still check if it's held!

      // String Array Taxonomy?

      For the time being I'm collapsing all of the strings that this function consumes into a single array for the sake of not
      getting fucked by the compiler. When I have a better solution I'll implement it. For now this is the format:

      [0] = form
      [1] = class
      [2] = name
      [3-X] = traits
      [Y-Z] = character selectable options

      For Launch this looks something like...

      [0] = form
      [1] = class
      [2] = name
      [3] = origin
      [4] = upbringing
      [5] = gift
      [6] = faction
      [7] = mask[hashmonk] or mouth[pepel]
      [8] = water type[hashmonk] or eyes[pepel]
      [9] = frog type[pepel]
      [10] = marking type[pepel]

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
  ) external payable {
    // Confirm address holds all the pills they claim to hold
    _createCharacter(legacyPills, collabPills, traitsPlus, ++nextId);
  }

  function createCharacterL1(
    uint256[] calldata legacyPills,
    uint256[] calldata collabPills,
    string[] calldata traitsPlus
  ) external payable {
    // Confirm address holds all the COLLAB pills they claim to hold
    _createCharacter(legacyPills, collabPills, traitsPlus, ++nextId);
  }

  // This is the part that needs to be converted to make the skeletons extensible
  function _createCharacter(
    uint256[] calldata legacyPills,
    uint256[] calldata collabPills,
    string[] calldata traitsPlus,
    uint256 characterId
  ) internal {
    Skeleton memory newSkeleton;
    if (_compareMem(traitsPlus[0], "Pepel")) {
      newSkeleton.mouth = selectableOptions.validateOption(
        traitsPlus,
        7,
        msg.value,
        legacyPills[0]
      );
      newSkeleton.eyes = selectableOptions.validateOption(
        traitsPlus,
        8,
        msg.value,
        legacyPills[1]
      );
      newSkeleton.color = selectableOptions.validateOption(
        traitsPlus,
        9,
        msg.value,
        legacyPills[2]
      );
      newSkeleton.marking = selectableOptions.validateOption(
        traitsPlus,
        10,
        msg.value,
        legacyPills[3]
      );
    } else if (_compareMem(traitsPlus[0], "Hashmonk")) {
      newSkeleton.mask = selectableOptions.validateOption(
        traitsPlus,
        7,
        msg.value,
        legacyPills[0]
      );
      newSkeleton.color = selectableOptions.validateOption(
        traitsPlus,
        8,
        msg.value,
        legacyPills[1]
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
    character.setSkeleton(characterId, newSkeleton);
    // Comment out the "booster pack" so that randomness is not requested
    /* _charIdQueue.push(characterId);
    if (_charIdQueue.length == ((_qOffset + 1) * _charPerCall)) {
      uint256 requestId = _requester.requestRandomness(_charPerCall);
      // TODO: condense logic; here for clarity
      _charIdQueue[requestId] = _qOffset * _charPerCall;
      _qOffset += 1;
    }*/
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
