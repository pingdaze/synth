// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "../lib/LegacyPills.sol";
import "hardhat/console.sol";
//Interface
interface IToken {
  function balanceOf(address account, uint256 id)
    external
    view
    returns (uint256);
}

contract SelectableOptions {
  string constant _HASHMONK_FORM = "Hashmonk";
  string constant _PEPEL_FORM = "Pepel";
  string constant _MOUTH = "Mouth";
  string constant _EYES = "Eyes";
  string constant _TYPE = "Type";
  string constant _MARKINGS = "Markings";
  string constant _MASK = "Mask";

  enum Requirement {
    None,
    HasEth,
    HasLegacyPill,
    HasCollabPill,
    HasTrait,
    HasNotTrait
  }
  // Extremely unwieldly struct; do better?
  struct Option {
    Requirement req; // 1 = HAS ETH, 2 = HAS PILL, 3 = Has TRAIT, 4 = HAS NOT TRAIT
    uint8 form;
    string slot;
    string option;
  }

  string[] private _forms = [_HASHMONK_FORM, _PEPEL_FORM];

  // For each option what exactly are we checking?
  mapping(uint8 => uint256) private _idToEthCost;
  mapping(uint8 => uint256) private _idToLegacyPillReq;
  mapping(uint8 => uint256) private _idToCollabPillReq;

  mapping(uint8 => string) private _idToTraitReq;

  // Mapping between the string rep of the selected character option and the fully qualified option requirements
  mapping(uint8 => Option) private _options;

  mapping(string => uint8) private _optionToId;

  address private _legacyPills;
  address private _collabPills;

  constructor(address legacyPills_, address collabPills_) {
    _legacyPills = legacyPills_;
    _collabPills = collabPills_;
  }

  //
  function validateOption(
    string[] calldata options,
    uint256 index,
    uint256 ethValue,
    uint256 legacyPillId,
    address target
  ) external returns (uint8) {
    uint8 id = _optionToId[options[index]];
    Option memory op = _options[id];
    Requirement req = Requirement(op.req);
    string memory form = _forms[op.form]; // Hashmonk or Pepel
    require(_compareCall(options[0], form), "Forms don't match");
    // TODO: Is there a smarter/more efficient/more extensible version of this?
    // Can probably convert this to an ASS switch
    if (_compareMem(form, _PEPEL_FORM)) {
      if (index == 7) {
        require(_compareMem(op.slot, _MOUTH), "invalid mouth");
      } else if (index == 8) {
        require(_compareMem(op.slot, _EYES), "invlaid eyes");
      } else if (index == 9) {
        require(_compareMem(op.slot, _TYPE), "invlaid type");
      } else if (index == 10) {
        require(_compareMem(op.slot, _MARKINGS), "invlaid markings");
      } else {
        revert("invalid index");
      }
    } else if (_compareMem(form, _HASHMONK_FORM)) {
      if (index == 7) {
        require(_compareMem(op.slot, _MASK));
      } else if (index == 8) {
        require(_compareMem(op.slot, _TYPE));
      } else {
        revert("invalid index");
      }
    }

    // HAS ETH
    if (req == Requirement.HasEth) {
      _checkHasEth(id, ethValue);
    }
    // HAS LEGACY PILL
    else if (req == Requirement.HasLegacyPill) {
      _checkHasLegacyPill(id, legacyPillId, target);
    }
    // HAS COLLAB PILL
    else if (req == Requirement.HasCollabPill) {
      _checkHasCollabPill(id, target);
    }
    // HAS TRAIT
    else if (req == Requirement.HasTrait) {
      _checkHasTrait(id, options);
    }
    // HAS NOT TRAIT
    else if (req == Requirement.HasNotTrait) {
      _checkHasNotTrait(id, options);
    }
    return id;
  }

  function getOption(string calldata option)
    external
    returns (Option memory op)
  {
    op = _options[_optionToId[option]];
  }

  // TODO: Put this somewhere better plx; memory vs calldata mismatch
  function _compareCall(string calldata a, string memory b)
    internal
    returns (bool)
  {
    if (bytes(a).length != bytes(b).length) {
      return false;
    } else {
      return keccak256(bytes(a)) == keccak256(bytes(b));
    }
  }

  // TODO: Issue with overload? Potentially rename; has caused issues before
  function _compareMem(string memory a, string memory b)
    internal
    returns (bool)
  {
    if (bytes(a).length != bytes(b).length) {
      return false;
    } else {
      return keccak256(bytes(a)) == keccak256(bytes(b));
    }
  }

  // TODO: Issue with overload? Potentially rename; has caused issues before
  function _compareMem2Call(string memory a, string calldata b)
    internal
    returns (bool)
  {
    if (bytes(a).length != bytes(b).length) {
      return false;
    } else {
      return keccak256(bytes(a)) == keccak256(bytes(b));
    }
  }

  /*
        uint8 req; // 1 = HAS ETH, 2 = HAS PILL, 3 = Has TRAIT, 4 = HAS NOT TRAIT
        uint8 form;
        string slot;
        string option;
    }
    */
  function addOption(
    string calldata option,
    string calldata slot,
    uint8 id,
    uint8 form
  ) external {
    _optionToId[option] = id;
    _options[id] = Option(Requirement.None, form, slot, option);
  }

  function setEthRequirement(uint8 id, uint256 cost) external {
    _options[id].req = Requirement.HasEth;
    _idToEthCost[id] = cost;
  }

  function setLegacyPillRequirement(
    uint8 id,
    uint256 reqId
  ) external {
    _options[id].req = Requirement.HasLegacyPill;
    _idToLegacyPillReq[id] = reqId;
  }

  function setCollabPillRequirement(
    uint8 id,
    uint256 reqId
  ) external {
    _options[id].req = Requirement.HasCollabPill;
    _idToCollabPillReq[id] = reqId;
  }

  function setTraitRequirement(uint8 id, string calldata trait) external {
    _options[id].req = Requirement.HasTrait;
    _idToTraitReq[id] = trait;
  }

  function setNotTraitRequirement(uint8 id, string calldata trait) external {
    _options[id].req = Requirement.HasNotTrait;
    _idToTraitReq[id] = trait;
  }

  function getCostFromOption(string calldata option)
    external
    view
    returns (uint256)
  {
    uint8 id = _optionToId[option];
    Option memory optionStruct = _options[id];
    if (optionStruct.req != Requirement.HasEth) {
      return 0;
    }
    return _idToEthCost[id];
  }

  function _checkHasEth(uint8 id, uint256 ethValue) internal view {
    require(ethValue >= _idToEthCost[id], "not enough ETH");
  }

  function _checkHasCollabPill(uint8 id, address target) internal view {

    //Could be optimized
    require(
      IToken(_collabPills).balanceOf(
        target,
        _idToCollabPillReq[id]
      ) > 0,
      "You do not have the required collab pill"
    );
  }

  function _checkHasLegacyPill(uint8 id, uint256 legacyPillId, address target) internal view {
    // Could be optimized
    require(
      IToken(_legacyPills).balanceOf(
        target,
        legacyPillId
      ) > 0 && _idToLegacyPillReq[id] == LegacyPills.getTypeFromId(legacyPillId),
      "You do not have the required Legacy pill"
    );
  }

  function _checkHasTrait(uint8 id, string[] calldata options) internal {
    require(_findTrait(id, options) == true, "You don't have the correct trait");
  }

  function _checkHasNotTrait(uint8 id, string[] calldata options) internal {
    require(_findTrait(id, options) == false, "You have an incompatible trait");
  }

  function _findTrait(uint8 id, string[] calldata options)
    internal
    returns (bool traitFound)
  {
    string memory trait = _idToTraitReq[id];
    for (uint8 i = 3; i < 6 && !traitFound; i++) {
      traitFound = _compareMem2Call(trait, options[i]);
    }
  }
}
