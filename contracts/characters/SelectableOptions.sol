// write interface for
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

    // Extremely unwieldly struct; do better?
    struct Option {
        uint8 id;
        uint8 req; // 1 = HAS ETH, 2 = HAS PILL, 3 = Has TRAIT, 4 = HAS NOT TRAIT
        uint8 form;
        string slot;
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
    mapping(string => Option) private _options;

    //
    function validateOption(
        string[] calldata options,
        uint256 index
    ) external payable returns (uint8) {
        Option memory op = _options[options[index]];
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
        if (op.req == 1) {
            _checkHasEth(op.id);
        }
        // HAS PILL
        if (op.req == 2) {
            _checkHasPill(op.id);
        }
        // HAS TRAIT
        if (op.req == 3) {
            _checkHasTrait(op.id, options);
        }
        // HAS NOT TRAIT
        if (op.req == 4) {
            _checkHasNotTrait(op.id, options);
        }
        return op.id;
    }

    function getOption(string calldata option)
        external
        returns (Option memory op)
    {
        op = _options[option];
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
        string form;
        string slot;
        uint256 req; // 1 = paid, 2 = 721 gated, 3 = 1155 gated, 4 = pill gated
        address gate;
        uint256 cost;
        uint8 id;
    }
    */
    function addOption(
        string calldata option,
        string calldata slot,
        uint8 id,
        uint8 req,
        uint8 form
    ) external {
        _options[option] = Option(id, req, form, slot);
    }

    function _checkHasEth(uint8 id) internal {
        require(msg.value >= _idToEthCost[id]);
    }

    function _checkHasPill(uint8 id) internal view {
        require(IToken(_idToPillReq[id].account).balanceOf(msg.sender, _idToPillReq[id].id) > 0, "You do not have the required pill");
    }

    function _checkHasTrait(uint8 id, string[] calldata options) internal {
        require(_findTrait(id, options) == false, "You already have this trait");
    }

    function _checkHasNotTrait(uint8 id, string[] calldata options) internal {
        require(!_findTrait(id, options) == false, "You already have this trait");
    }

    function _findTrait(uint8 id, string[] calldata options) internal returns(bool traitFound) {
        string memory trait = _idToTraitReq[id];
        for(uint8 i = 3; i< 6 && !traitFound; i++) {
            traitFound = _compareMem2Call(trait, options[i]);
        }
    }

}
