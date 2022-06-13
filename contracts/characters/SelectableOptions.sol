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
        uint256 req; // 1 = paid, 2 = 721 gated, 3 = 1155 gated, 4 = pill gated
        uint256 cost;
        address gate;
        string form;
        string slot;
    }

    mapping(string => Option) private _options;

    //
    function validateOption(
        string calldata option,
        uint256 index,
        string calldata form
    ) external payable returns (uint8) {
        Option memory op = _options[option];
        require(_compareCall(form, op.form));
        // TODO: Is there a smarter/more efficient/more extensible version of this?
        // Can probably convert this to an ASS switch
        if (_compareCall(form, _PEPEL_FORM)) {
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
        } else if (_compareCall(form, _HASHMONK_FORM)) {
            if (index == 7) {
                require(_compareMem(op.slot, _MASK));
            }
            if (index == 8) {
                require(_compareMem(op.slot, _TYPE));
            } else {
                revert("invalid index");
            }
        }
        if (op.req == 1) {
            require(msg.value > op.cost);
        }
        if (op.req == 2) {
            IToken token = IToken(op.gate);
            require(token.balanceOf(msg.sender, op.id) > 0);
        }
        if (op.req == 3) {
            // Double Check
            IToken token = IToken(op.gate);
            require(token.balanceOf(msg.sender, op.id) > 0);
        }
        if (op.req == 4) {
            // Double Check
            // There are two types of pills that we need to check for here
            IToken token = IToken(op.gate);
            require(token.balanceOf(msg.sender, op.id) > 0);
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
        string calldata form,
        string calldata slot,
        uint256 req,
        address gate,
        uint256 cost,
        uint8 id
    ) external {
        _options[option] = Option(id, req, cost, gate, form, slot );
    }
}
