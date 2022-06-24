// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
// Note: This is a really heavy contract to implement directly. We want more of a centralized approach here
import "../interfaces/ICore.sol";
import "../interfaces/IEXP.sol";
import "../interfaces/IREP.sol";
import "../interfaces/IWearables.sol";

import "../MetadataRegistry.sol";
import "./SelectableOptions.sol";
import "../lib/CharacterLibrary.sol";
import "@rari-capital/solmate/src/auth/Auth.sol";

// Note: try to minimize the contract depth that mutative actions have to take

contract Characters is Context, Auth {
  // Instance of core
  ICore public core;
  IWearables public wearables;
  SelectableOptions public selectableOptions;
  uint256 private _nextId = 0;
  address private _validator;
  string private _defaultDescription;
  string private _defaultName;
  IEXP public exp;
  IREP public rep;

  // Need to replace with the solmate access control
  modifier onlyWearables() {
    require(address(wearables) == msg.sender, "WEARABLES");
    _;
  }
  modifier onlyValidator() {
    require(address(_validator) == msg.sender, "VALIDATOR");
    _;
  }

  // Note: For these two structs, we could also setup the data as a series of mappings, or as a combination between a struct and a bunch of mappings; worth exploring tradeoffs re:gas optimization

  // Looking players up can happen one of two ways;
  // 1. We use address lookup (as is being done here)
  // 2. We use token id lookup (not done here)
  // If we want _both_ mappings this is an option but we need to consider gas
  mapping(address => uint256) public playerAddr2Id;
  // Once we lookup a player, we start to index into character elements
  // These rough structs could be broken down into smaller objects and mappings if needed.
  mapping(uint256 => Character) public characters;
  mapping(uint256 => Skeleton) public skeletons;
  mapping(uint256 => Outfit) public outfits;

  /**
   * @dev
   */
  constructor(
    ICore _core,
    SelectableOptions _selectableOptions,
    Authority auth
  ) Auth(_msgSender(), auth) {
    core = _core;
    selectableOptions = _selectableOptions;
  }

  /*
   *   _    _      _
   *  | |  | |    | |
   *  | |__| | ___| |_ __   ___ _ __ ___
   *  |  __  |/ _ \ | '_ \ / _ \ '__/ __|
   *  | |  | |  __/ | |_) |  __/ |  \__ \
   *  |_|  |_|\___|_| .__/ \___|_|  |___/
   *                | |
   */

  /**
   *   _____      _   _
   *  / ____|    | | | |
   * | (___   ___| |_| |_ ___ _ __ ___
   *  \___ \ / _ \ __| __/ _ \ '__/ __|
   *  ____) |  __/ |_| ||  __/ |  \__ \
   * |_____/ \___|\__|\__\___|_|  |___/
   */

  /**
   * @dev Do we want to make this validator protected? onlyValidator
   */
  // [0] = form
  // [1] = class
  // [2] = name
  // [3] = origin
  // [4] = upbringing
  // [5] = gift
  // [6] = faction
  function addPlayer(
    uint256 _id,
    address _player,
    uint256[] calldata legacyPills,
    uint256[] calldata collabPills,
    string[] calldata traitsPlus
  ) public {
    // TODO: better checks here, probably don't want to fuck with like collisions or w/e here
    require(core.ownerOf(_id) == _player, "Player must be holding character");
    playerAddr2Id[_player] = _id;
    characters[_id] = Character(
      _id,
      _player,
      CharacterLibrary.MAX_INT,
      "",
      "",
      "",
      traitsPlus[0],
      traitsPlus[3],
      traitsPlus[4],
      traitsPlus[5],
      legacyPills,
      collabPills
    );
  }

  function removePlayer(uint256 _id, address _player) public {
    // Give removing player XP
    // Reset the removed players XP
    playerAddr2Id[_player] = CharacterLibrary.MAX_INT;
  }

  function setDefaultDescription(string memory _description)
    public
    requiresAuth
  {
    _defaultDescription = _description;
  }

  function setDefaultName(string memory _name) public requiresAuth {
    _defaultName = _name;
  }

  /**
   * @dev
   */
  function setPlayer(uint256 _id, address _player) external {
    require(core.ownerOf(_id) == _player, "Player must be holding character");
    require(
      playerAddr2Id[_player] != CharacterLibrary.MAX_INT,
      "Player must not have a character already"
    );
    playerAddr2Id[_player] = _id;
  }

  function equipSkeleton(
    uint32 id,
    uint16 slotID,
    address _player
  ) external onlyWearables {
    _setSkeletonSlot(slotID, skeletons[getIdFromAddress(_player)], id);
  }

  function equipOutfit(
    uint32 id,
    uint16 slotID,
    address _player
  ) external onlyWearables {
    _setOutfitSlot(slotID, outfits[getIdFromAddress(_player)], id);
  }

  function unequipSkeleton(uint16 slotID, address _player)
    external
    onlyWearables
    returns (uint256 returnID)
  {
    Skeleton storage skeleton = skeletons[getIdFromAddress(_player)];
    returnID = CharacterLibrary.getSkeletonSlot(slotID, skeleton);
    _setSkeletonSlot(slotID, skeleton, 0);
  }

  function unequipOutfit(uint16 slotID, address _player)
    external
    onlyWearables
    returns (uint256 returnID)
  {
    Outfit storage outfit = outfits[getIdFromAddress(_player)];
    returnID = CharacterLibrary.getOutfitSlot(slotID, outfit);
    _setOutfitSlot(slotID, outfit, 0);
  }

  function _setSkeletonSlot(
    uint16 slotID,
    Skeleton storage skeleton,
    uint32 value
  ) internal {
    if (slotID == 0) {
      require(skeleton.head == 0, "Slot must be empty to equip into");
      skeleton.head = value;
    } else if (slotID == 1) {
      require(skeleton.mouth == 0, "Slot must be empty to equip into");
      skeleton.mouth = value;
    } else if (slotID == 2) {
      require(skeleton.eyes == 0, "Slot must be empty to equip into");
      skeleton.eyes = value;
    } else if (slotID == 3) {
      require(skeleton.torso == 0, "Slot must be empty to equip into");
      skeleton.torso = value;
    } else if (slotID == 4) {
      require(skeleton.lArm == 0, "Slot must be empty to equip into");
      skeleton.lArm = value;
    } else if (slotID == 5) {
      require(skeleton.rArm == 0, "Slot must be empty to equip into");
      skeleton.rArm = value;
    } else if (slotID == 6) {
      require(skeleton.rLeg == 0, "Slot must be empty to equip into");
      skeleton.rLeg = value;
    } else if (slotID == 7) {
      require(skeleton.lLeg == 0, "Slot must be empty to equip into");
      skeleton.lLeg = value;
    } else if (slotID == 8) {
      require(skeleton.color == 0, "Slot must be empty to equip into");
      skeleton.color = value;
    } else if (slotID == 9) {
      require(skeleton.marking == 0, "Slot must be empty to equip into");
      skeleton.marking = value;
    } else if (slotID == 10) {
      require(skeleton.mask == 0, "Slot must be empty to equip into");
      skeleton.mask = value;
    }
  }

  function _setOutfitSlot(
    uint16 slotID,
    Outfit storage outfit,
    uint32 value
  ) internal {
    if (slotID == 0) {
      require(outfit.head == 0, "Slot must be empty to equip into");
      outfit.head = value;
    } else if (slotID == 1) {
      require(outfit.torso == 0, "Slot must be empty to equip into");
      outfit.torso = value;
    } else if (slotID == 2) {
      require(outfit.lArm == 0, "Slot must be empty to equip into");
      outfit.lArm = value;
    } else if (slotID == 3) {
      require(outfit.rArm == 0, "Slot must be empty to equip into");
      outfit.rArm = value;
    } else if (slotID == 4) {
      require(outfit.rLeg == 0, "Slot must be empty to equip into");
      outfit.rLeg = value;
    } else if (slotID == 5) {
      require(outfit.lLeg == 0, "Slot must be empty to equip into");
      outfit.lLeg = value;
    } else if (slotID == 6) {
      require(outfit.floating == 0, "Slot must be empty to equip into");
      outfit.floating = value;
    }
  }

  function setOutfit(uint256 _characterID, Outfit calldata outfit)
    external
    onlyValidator
  {
    outfits[_characterID] = outfit;
  }

  function setSkeleton(uint256 _characterID, Skeleton calldata skeleton)
    external
    onlyValidator
  {
    skeletons[_characterID] = skeleton;
  }

  function setValidator(address validator_) public {
    _validator = validator_;
  }

  function setXP(IEXP _exp) public {
    exp = _exp;
  }

  function setREP(IREP _rep) public {
    rep = _rep;
  }

  /**
   *   _____      _   _
   *  / ____|    | | | |
   * | |  __  ___| |_| |_ ___ _ __ ___
   * | | |_ |/ _ \ __| __/ _ \ '__/ __|
   * | |__| |  __/ |_| ||  __/ |  \__ \
   *  \_____|\___|\__|\__\___|_|  |___/
   */

  function getSkeleton(uint256 tokenID)
    external
    view
    returns (Skeleton memory)
  {
    return skeletons[tokenID];
  }

  function getOutfit(uint256 tokenID) external view returns (Outfit memory) {
    return outfits[tokenID];
  }

  function getOptions(uint256 tokenID)
    external
    view
    returns (
      string memory form,
      string memory name,
      string memory origin,
      string memory upbringing,
      string memory gift,
      string memory faction
    )
  {
    Character memory char = characters[tokenID];
    form = char.form;
    name = getName(tokenID);
    origin = char.origin;
    upbringing = char.upbringing;
    gift = char.gift;
    faction = char.faction;
  }

  function getDescription(uint256 tokenID)
    external
    view
    returns (string memory)
  {
    return
      _compareMem(characters[tokenID].description, "")
        ? _defaultDescription
        : characters[tokenID].description;
  }

  function getName(uint256 tokenID) public view returns (string memory) {
    return
      _compareMem(characters[tokenID].name, "")
        ? _defaultName
        : characters[tokenID].name;
  }

  function getCharacter(uint256 tokenID)
    external
    view
    returns (Character memory)
  {
    return characters[tokenID];
  }

  function getIdFromAddress(address _addr) public view returns (uint256) {
    return playerAddr2Id[_addr];
  }

  // TODO: Put this somewhere better plx; memory vs calldata mismatch
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
}
