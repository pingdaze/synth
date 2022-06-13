// Player Information
struct Player {
    uint256 id;
}
// Character Information
// TODO: Confirm optimal struct ordering
struct Character {
    uint256 characterId;
    address player;
    uint256 faction;
    uint256 class;
    address[] pillboosts;
    // Can we get away with making this like uhhh uint8?
    // TODO: Test if gas savings from uint8, shouldn't be but still check
    // Check permutations and future numbers?? I think we're good tbh
    uint256[] attributes;
    // Traits format
    // [0] = form
    // [1] = class
    // [2] = name
    // [3-X] = traits
    string[] traitsPlus;
}
// Note: We probably wantt o abstract out/push out the character logic from the validator logic and just have the single validator reach into the other state holding contracts
// Can we create the 1155 asset the first time we _unequip_ the 1155?
// TODO: Probably need to change this from a uint8, is 256 really enough?
// TODO: This should just be a fucking array? Am I crazy? That's more flexible
struct Skeleton {
    uint256 head;
    uint256 mouth;
    uint256 eyes;
    uint256 torso;
    uint256 lArm;
    uint256 rArm;
    uint256 rLeg;
    uint256 lLeg;
    uint256 color;
    uint256 marking;
    uint256 mask;
}
struct Outfit {
    uint256 head;
    uint256 torso;
    uint256 lArm;
    uint256 rArm;
    uint256 rLeg;
    uint256 lLeg;
    uint256 floating;
}

library CharacterLibrary {
    uint256 public constant MAX_INT = 2**256 - 1;

    function getSkeletonSlot(uint256 slotID, Skeleton memory skeleton)
        public
        pure
        returns (uint256)
    {
        if (slotID == 0) {
            return skeleton.head;
        } else if (slotID == 1) {
            return skeleton.mouth;
        } else if (slotID == 2) {
            return skeleton.eyes;
        } else if (slotID == 3) {
            return skeleton.torso;
        } else if (slotID == 4) {
            return skeleton.lArm;
        } else if (slotID == 5) {
            return skeleton.rArm;
        } else if (slotID == 6) {
            return skeleton.rLeg;
        } else if (slotID == 7) {
            return skeleton.lLeg;
        } else if (slotID == 8) {
            return skeleton.color;
        } else if (slotID == 9) {
            return skeleton.marking;
        } else if (slotID == 10) {
            return skeleton.mask;
        }
        return MAX_INT;
    }

    function getOutfitSlot(uint256 slotID, Outfit memory outfit)
        public
        pure
        returns (uint256)
    {
        if (slotID == 0) {
            return outfit.head;
        } else if (slotID == 1) {
            return outfit.torso;
        } else if (slotID == 2) {
            return outfit.lArm;
        } else if (slotID == 3) {
            return outfit.rArm;
        } else if (slotID == 4) {
            return outfit.rLeg;
        } else if (slotID == 5) {
            return outfit.lLeg;
        } else if (slotID == 6) {
            return outfit.floating;
        }
        return MAX_INT;
    }
}
