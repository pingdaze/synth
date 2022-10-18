// SPDX-License-Identifier: AGPL-3.0


pragma solidity ^0.8.0;

// Note: This is a really heavy contract to implement directly. We want more of a centralized approach here
import "../interfaces/ICore.sol";
import "../interfaces/IWearables.sol";
import "./SelectableOptions.sol";
import "@rari-capital/solmate/src/auth/Auth.sol";
import "../lib/CharacterLibraryV2.sol";

// Note: try to minimize the contract depth that mutative actions have to take

contract CharactersV2 is Auth {
  // Instance of core
  ICore public core;
  IWearables public wearables;
  SelectableOptions public selectableOptions;
  address private _validator;
  string private _defaultDescription;
  string private _defaultName;

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
  // mapping(address => uint256) public playerAddr2Id;
  // // Once we lookup a player, we start to index into character elements
  // // These rough structs could be broken down into smaller objects and mappings if needed.
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
  ) Auth(msg.sender, auth) {
    core = _core;
    selectableOptions = _selectableOptions;
  }

  function setWearables(IWearables _wearables) external requiresAuth {
    wearables = _wearables;
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


  function setCharacter(Character memory character, uint256 _id) public requiresAuth {
    characters[_id] = character;
  }

  
  function _setSkeletonSlot(
    uint16 slotID,
    Skeleton storage skeleton,
    uint32 value
  ) internal {
    if (slotID == 0) {
      // TODO: This needs to mint the collision not error
      skeleton.head = value;
    } else if (slotID == 1) {
      // require(skeleton.mouth == 0, "Slot must be empty to equip into");
      skeleton.mouth = value;
    } else if (slotID == 2) {
      // require(skeleton.eyes == 0, "Slot must be empty to equip into");
      skeleton.eyes = value;
    } else if (slotID == 3) {
      // require(skeleton.torso == 0, "Slot must be empty to equip into");
      skeleton.torso = value;
    } else if (slotID == 4) {
      // require(skeleton.lArm == 0, "Slot must be empty to equip into");
      skeleton.lArm = value;
    } else if (slotID == 5) {
      // require(skeleton.rArm == 0, "Slot must be empty to equip into");
      skeleton.rArm = value;
    } else if (slotID == 6) {
      // require(skeleton.rLeg == 0, "Slot must be empty to equip into");
      skeleton.rLeg = value;
    } else if (slotID == 7) {
      // require(skeleton.lLeg == 0, "Slot must be empty to equip into");
      skeleton.lLeg = value;
    } else if (slotID == 8) {
      // require(skeleton.color == 0, "Slot must be empty to equip into");
      skeleton.color = value;
    } else if (slotID == 9) {
      // require(skeleton.marking == 0, "Slot must be empty to equip into");
      skeleton.marking = value;
    } else if (slotID == 10) {
      // require(skeleton.crown == 0, "Slot must be empty to equip into");
      skeleton.crown = value;
    }
  }

  function _setOutfitSlot(
    uint16 slotID,
    Outfit storage outfit,
    uint32 value,
    address player
  ) internal {
    if (slotID == 0) {
      // TODO: This needs to mint the collision not error
      if(outfit.head != 0) {
        wearables.mintEquipment(player, outfit.head);
      }
      outfit.head = value;
    } else if (slotID == 1) {
      if(outfit.torso != 0) {
        wearables.mintEquipment(player, outfit.torso);
      }
      outfit.torso = value;
    } else if (slotID == 2) {
      if(outfit.lArm != 0) {
        wearables.mintEquipment(player, outfit.lArm);
      }
      outfit.lArm = value;
    } else if (slotID == 3) {
      if(outfit.rArm != 0) {
        wearables.mintEquipment(player, outfit.rArm);
      }
      outfit.rArm = value;
    } else if (slotID == 4) {
      if(outfit.rLeg != 0) {
        wearables.mintEquipment(player, outfit.rLeg);
      }
      outfit.rLeg = value;
    } else if (slotID == 5) {
      if(outfit.lLeg != 0) {
        wearables.mintEquipment(player, outfit.lLeg);
      }
      outfit.lLeg = value;
    } else if (slotID == 6) {
      if(outfit.floating != 0) {
        wearables.mintEquipment(player, outfit.floating);
      }
      outfit.floating = value;
    }
  }

  function setOutfitSlot(
    uint256 _characterID,
    uint16 slotID,
    uint32 value
  ) external onlyValidator {
    _setOutfitSlot(slotID, outfits[_characterID], value, characters[_characterID].player);
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

  // Todo: set auth
  function setValidator(address validator_) public requiresAuth {
    _validator = validator_;
  }

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
      string memory faction,
      string memory color
    )
  {
    Character memory char = characters[tokenID];
    Skeleton memory skeleton = skeletons[tokenID];
    form = char.form;
    name = getName(tokenID);
    origin = char.origin;
    upbringing = char.upbringing;
    gift = char.gift;
    faction = char.faction;
    color = selectableOptions.getOptionStringFromId(skeleton.color);
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


  function setName(uint256 tokenID, string calldata name) public {
    require(core.ownerOf(tokenID) == msg.sender, "Player must be holding character");
    characters[tokenID].name = name;
  }

  function getCharacter(uint256 tokenID)
    external
    view
    returns (Character memory)
  {
    return characters[tokenID];
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

    /**
   * @dev Do we want to make this validator protected? onlyValidator
   */
  // [0] = form
  // [1] = origin
  // [2] = upbringing
  // [3] = gift
  // [4] = faction
  function addPlayer(
    uint256 _id,
    string[] calldata traitsPlus
  ) external onlyValidator {
    // TODO: better checks here, probably don't want to fuck with like collisions or w/e here
    characters[_id] = Character(
      _id,
      msg.sender,
      CharacterLibraryV2.MAX_INT,
      "",
      "",
      traitsPlus[0],
      traitsPlus[1],
      traitsPlus[2],
      traitsPlus[3],
      traitsPlus[4]
    );
  }
}