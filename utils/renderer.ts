import {
    SkeletonOption,
    SkeletonOptionColor,
    SkeletonOptionLocation,
    SkeletonOptionSkeleton,
  } from "@/data/airtable";
  import { CharacterModel, Form } from "./avatar-preview";
  
  const TRIBE_COLOR_MAP = {
    Tyo: "lime",
    Hijka: "blue",
    Skia: "orange",
    "Cu’Rr’Al": "dark",
    Skro: "yellow",
    Mekt: "pale",
    Quanian: "deepgreen",
  };
  
  /**
   * @note Needed due to the mapping of Pepel Tribe to internal color names
   */
  export const getColor = (
    model: CharacterModel,
    preview: Partial<CharacterModel> = {}
  ) => {
    if (model.form === Form.Pepel) {
      if (preview["tribe"]) {
        return TRIBE_COLOR_MAP[preview["tribe"] as keyof typeof TRIBE_COLOR_MAP];
      }
      if (model["tribe"]) {
        return TRIBE_COLOR_MAP[model["tribe"] as keyof typeof TRIBE_COLOR_MAP];
      }
      return TRIBE_COLOR_MAP.Tyo;
    }
  
    if (preview["water type"]) {
      return preview["water type"].toLowerCase();
    }
    if (model["water type"]) {
      return model["water type"].toLowerCase();
    }
    return SkeletonOptionColor.Coral;
  };
  
  export const ORDERED_SLOTS = {
    wearable_floating: undefined,
    wearable_torso_back: undefined,
    "wearable_left-arm_back": undefined,
    "base_left-arm": undefined,
    "marking_left-arm": undefined,
    "wearable_left-arm": undefined,
    "wearable_left-leg_back": undefined,
    "base_left-leg": undefined,
    "marking_left-leg": undefined,
    "wearable_left-leg": undefined,
    "wearable_right-leg_back": undefined,
    base_torso: undefined,
    marking_torso: undefined,
    "base_right-leg": undefined,
    "marking_right-leg": undefined,
    "wearable_right-leg": undefined,
    wearable_torso: undefined,
    "wearable_right-arm_back": undefined,
    "base_right-arm": undefined,
    "marking_right-arm": undefined,
    "wearable_right-arm": undefined,
    wearable_head_back: undefined,
    base_head: undefined,
    marking_head: undefined,
    base_eyes: undefined,
    base_mouth: undefined,
    base_crown: undefined,
    wearable_head: undefined,
  };
  
  export type CharacterModelSubset = Pick<
    CharacterModel,
    | "eyes"
    | "mouth"
    | "head"
    | "right arm"
    | "left arm"
    | "torso"
    | "left leg"
    | "right leg"
    | "marking"
    | "crown"
    | "wearable_floating"
    | "wearable_head"
    | "wearable_right-arm"
    | "wearable_left-arm"
    | "wearable_torso"
    | "wearable_left-leg"
    | "wearable_right-leg"
  >;
  
  export const filterMap: Record<
    keyof CharacterModelSubset,
    (skeletonOption: SkeletonOption) => boolean
  > = {
    eyes: ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Base &&
      location.includes(SkeletonOptionLocation.Eyes),
  
    mouth: ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Base &&
      location.includes(SkeletonOptionLocation.Mouth),
  
    head: ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Base &&
      location.includes(SkeletonOptionLocation.Head),
  
    "right arm": ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Base &&
      location.includes(SkeletonOptionLocation.RightArm),
  
    "left arm": ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Base &&
      location.includes(SkeletonOptionLocation.LeftArm),
  
    torso: ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Base &&
      location.includes(SkeletonOptionLocation.Torso),
  
    "left leg": ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Base &&
      location.includes(SkeletonOptionLocation.LeftLeg),
  
    "right leg": ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Base &&
      location.includes(SkeletonOptionLocation.RightLeg),
  
    marking: ({ skeleton }) => skeleton === SkeletonOptionSkeleton.Marking,
  
    crown: ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Base &&
      location.includes(SkeletonOptionLocation.Crown),
  
    wearable_floating: ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Wearable &&
      location.includes(SkeletonOptionLocation.Floating),
  
    wearable_head: ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Wearable &&
      location.includes(SkeletonOptionLocation.Head),
  
    "wearable_right-arm": ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Wearable &&
      location.includes(SkeletonOptionLocation.RightArm),
  
    "wearable_left-arm": ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Wearable &&
      location.includes(SkeletonOptionLocation.LeftArm),
  
    wearable_torso: ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Wearable &&
      location.includes(SkeletonOptionLocation.Torso),
  
    "wearable_left-leg": ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Wearable &&
      location.includes(SkeletonOptionLocation.LeftLeg),
  
    "wearable_right-leg": ({ skeleton, location }) =>
      skeleton === SkeletonOptionSkeleton.Wearable &&
      location.includes(SkeletonOptionLocation.RightLeg),
  };
  