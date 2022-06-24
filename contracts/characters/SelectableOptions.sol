// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "../lib/LegacyPills.sol";

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
    HasPillEgo,
    HasPillSynth,
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
  struct PillReq {
    address account;
    uint256 id;
  }
  string[] forms = [_HASHMONK_FORM, _PEPEL_FORM];

  // For each option what exactly are we checking?
  mapping(uint8 => uint256) private _idToEthCost;
  // This is probably a little more complicated, we additionally need the ID no
  mapping(uint8 => PillReq) private _idToPillReq;

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
    uint256 ethValue
  ) external returns (uint8) {
    uint8 id = _optionToId[options[index]];
    Option memory op = _options[id];
    Requirement req = Requirement(op.req);
    string memory form = forms[op.form]; // Hashmonk or Pepel
    require(_compareCall(options[0], form));
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
    // HAS PILL SYNTH
    else if (req == Requirement.HasPillSynth) {
      _checkHasPill(id);
    }
    // HAS PILL EGODEATH
    else if (req == Requirement.HasPillEgo) {
      _checkHasPill(id);
    }
    // HAS PILL
    else if (req == Requirement.HasCollabPill) {
      _checkHasPill(id);
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

  function setLegacyPillRequirementSynth(
    uint8 id,
    address account,
    uint256 reqId
  ) external {
    _options[id].req = Requirement.HasPillSynth;
    _idToPillReq[id] = PillReq(account, reqId);
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

  function _checkHasPill(uint8 id) internal view {
    require(
      IToken(_idToPillReq[id].account).balanceOf(
        msg.sender,
        _idToPillReq[id].id
      ) > 0,
      "You do not have the required pill"
    );
  }

  function _checkHasTrait(uint8 id, string[] calldata options) internal {
    require(_findTrait(id, options) == false, "You already have this trait");
  }

  function _checkHasNotTrait(uint8 id, string[] calldata options) internal {
    require(!_findTrait(id, options) == false, "You already have this trait");
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
