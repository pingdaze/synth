const STEP_OPTIONS_JSON = require("./step-options.json");
const SKELETON_OPTIONS_JSON = require("./skeleton-options.json");
const PILLBOOST_WEARABLES_JSON = require("./pillboost-wearables.json");

/**
 * SHARED
 */

export enum PrerequisiteType {
  HasEth = "HAS ETH",
  HasPill = "HAS PILL",
  HasTrait = "HAS TRAIT",
  HasNft = "HAS NFT",
  HasNotTrait = "HAS NOT TRAIT",
}

export enum Rarity {
  Pillboost = "Pillboost",
  Special = "Special",
  Standard = "Standard",
}

/**
 * STEP OPTIONS
 */

export interface StepOptionsByType {
  Form: StepOption[];
  Tribe: StepOption[];
  Origin: StepOption[];
  Upbringing: StepOption[];
  Gift: StepOption[];
  Faction: StepOption[];
  "Water Type": StepOption[];
  Mouth: StepOption[];
  Eyes: StepOption[];
  Marking: StepOption[];
  "Hashmonk Crown": StepOption[];
  "Hashmonk Mask": StepOption[];
  "Hashmonk Head": StepOption[];
  "Hashmonk Torso": StepOption[];
  "Hashmonk Right Arm": StepOption[];
  "Hashmonk Left Arm": StepOption[];
  "Hashmonk Right Leg": StepOption[];
  "Hashmonk Left Leg": StepOption[];
}

export interface StepOption {
  name: string;
  type: StepOptionType;
  rarity: Rarity | null;
  prerequisite_type: PrerequisiteType | null;
  prerequisite_value: null | string;
  description: null | string;
}

export enum StepOptionType {
  Form = "Form",
  Eyes = "Eyes",
  Faction = "Faction",
  Tribe = "Tribe",
  Gift = "Gift",
  Marking = "Marking",
  HashmonkMask = "Hashmonk Mask",
  HashmonkCrown = "Hashmonk Crown",
  Mouth = "Mouth",
  Origin = "Origin",
  Upbringing = "Upbringing",
  WaterType = "Water Type",
  HashmonkHead = "Hashmonk Head",
  HashmonkTorso = "Hashmonk Torso",
  HashmonkRightArm = "Hashmonk Right Arm",
  HashmonkLeftArm = "Hashmonk Left Arm",
  HashmonkRightLeg = "Hashmonk Right Leg",
  HashmonkLeftLeg = "Hashmonk Left Leg",
}

export const STEP_OPTIONS_BY_TYPE = STEP_OPTIONS_JSON as StepOptionsByType;

export const STEP_OPTIONS = Object.values(STEP_OPTIONS_BY_TYPE).flat(Infinity);

/**
 * SKELETON OPTIONS
 */
export interface SkeletonOption {
  name: string;
  form: Form;
  skeleton: Skeleton;
  location: Location[];
  category: string;
  color: Color | null;
  rarity: Rarity | null;
  prerequisite_type: PrerequisiteType | null;
  prerequisite_value: null | string;
  cid?: string;
}

export enum Color {
  Arctic = "arctic",
  Blue = "blue",
  Coral = "coral",
  Dark = "dark",
  Deepgreen = "deepgreen",
  Lime = "lime",
  Null = "null",
  Orange = "orange",
  Pale = "pale",
  Shadowmarked = "shadowmarked",
  Sunstrider = "sunstrider",
  Tropical = "tropical",
  Yellow = "yellow",
}

export enum Conflict {
  BaseEyes = "base_eyes",
  BaseHead = "base_head",
  BaseLeftArm = "base_left-arm",
  BaseLeftLeg = "base_left-leg",
  BaseMouth = "base_mouth",
  BaseRightArm = "base_right-arm",
  BaseRightLeg = "base_right-leg",
  BaseTorso = "base_torso",
  MarkingHead = "marking_head",
  MarkingLeftArm = "marking_left-arm",
  MarkingLeftLeg = "marking_left-leg",
  MarkingRightArm = "marking_right-arm",
  MarkingRightLeg = "marking_right-leg",
  MarkingTorso = "marking_torso",
  WearableHead = "wearable_head",
  BaseCrown = "base_crown",
}

export enum Form {
  Hashmonk = "hashmonk",
  Pepel = "pepel",
  Universal = "universal",
}

export enum Location {
  Eyes = "eyes",
  Floating = "floating",
  Crown = "crown",
  Head = "head",
  LeftArm = "left-arm",
  LeftLeg = "left-leg",
  Mouth = "mouth",
  RightArm = "right-arm",
  RightLeg = "right-leg",
  Torso = "torso",
}

export enum Position {
  Back = "back",
  Front = "front",
}

export enum Skeleton {
  Base = "base",
  Marking = "marking",
  Wearable = "wearable",
}

export const SKELETON_OPTIONS = SKELETON_OPTIONS_JSON as SkeletonOption[];

export interface PillboostWearable {
  name: string;
  form: Form[];
  category: string[];
  locations: Location[];
  pill_type: string[];
  linked_item: string[];
  items: {
    name: string;
    location: Location[];
    image: null | string;
    fileName: null | string;
  }[];
}

export const PILLBOOST_WEARABLES =
  PILLBOOST_WEARABLES_JSON as PillboostWearable[];
