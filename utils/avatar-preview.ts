

  import { pick } from "./pick";
  import {
    CharacterModelSubset,
    filterMap,
    getColor,
    ORDERED_SLOTS,
  } from "./renderer";
  import { uniqBy } from "./uniqBy";
  import {
    SkeletonOption,
    SkeletonOptionColor,
    SkeletonOptionForm,
    SkeletonOptionPosition,
    SKELETON_OPTIONS,
  } from "data/airtable";
  import { objectEntries, objectKeys } from "ts-extras";

  
  export enum Form {
    Pepel = "Pepel",
    Hashmonk = "Hashmonk",
  }
  
  export type CharacterModel = {
    form: Form;
    origin?: string;
    upbringing?: string;
    gift?: string;
    faction?: string;
    name?: string;
    tribe?: string;
    eyes?: string;
    mouth?: string;
    marking?: string;
    "water type"?: string;
    crown?: string;
    head?: string;
    torso?: string;
    "right arm"?: string;
    "left arm"?: string;
    "right leg"?: string;
    "left leg"?: string;
    wearable_floating?: string;
    wearable_head?: string;
    wearable_torso?: string;
    "wearable_right-arm"?: string;
    "wearable_left-arm"?: string;
    "wearable_right-leg"?: string;
    "wearable_left-leg"?: string;
  };
  

  const getDefaults = (form: Form): Partial<CharacterModel> => {
    if (form === Form.Pepel) {
      return {
        head: "default",
        "left arm": "default",
        "right arm": "default",
        torso: "default",
        "left leg": "default",
        "right leg": "default",
        mouth: "Smiling",
      };
    }
  
    return {
      head: "Rockpool",
      "left arm": "Rockpool",
      "right arm": "Rockpool",
      torso: "Rockpool",
      "left leg": "Rockpool",
      "right leg": "Rockpool",
      wearable_head: "Hashmask",
    };
  };
  
  const getConflictAwareSlots = (
    model: CharacterModel
  ): Record<keyof typeof ORDERED_SLOTS, string | undefined> => {
    /**
     * Get Default Body Parts By Form
     */
    const defaults = getDefaults(model.form);
  
    /**
     * Get Color From Model & Preview
     */
    const color = getColor(model);
  
    const characterToBuild: CharacterModelSubset = pick<CharacterModel>(
      { ...defaults, ...model },
      [
        "eyes",
        "mouth",
        "crown",
        "head",
        "right arm",
        "left arm",
        "torso",
        "left leg",
        "right leg",
        "marking",
        "wearable_floating",
        "wearable_head",
        "wearable_right-arm",
        "wearable_left-arm",
        "wearable_torso",
        "wearable_left-leg",
        "wearable_right-leg",
      ]
    );
  
    /**
     * Define Filters
     */
    const universalOrForm = ({ form }: SkeletonOption) =>
      form === SkeletonOptionForm.Universal || form === model.form.toLowerCase();
  
    const nullOrColor = ({ color: _color }: SkeletonOption) =>
      _color === SkeletonOptionColor.Null || _color === color;
  
    const applyFilterMap = (opt: SkeletonOption) => {
      return objectEntries(characterToBuild).some(([key, value]) => {
        return filterMap[key](opt) && opt.name === value;
      });
    };
  
    /**
     * Apply Filters & Filter All SKELETON_OPTIONS
     */
    const filtered = SKELETON_OPTIONS.filter(universalOrForm)
      .filter(nullOrColor)
      .filter(applyFilterMap);
  
    /**
     * Build Conflicting Slots From Filtered Items
     */
    const conflictingSlots = filtered
      .filter((option) => !!option.conflict)
      // @ts-ignore
      .flatMap(({ conflict }) => conflict.map((c) => [c, undefined]));
  
    /**
     * Build Filtered Items Entries
     */
    const slots = filtered.flatMap((option) =>
      option.location.map((location) => {
        const value = option?.fileName ?? undefined;
  
        if (option.position === SkeletonOptionPosition.Back) {
          return [`${option.skeleton}_${location}_back`, value];
        }
  
        return [`${option.skeleton}_${location}`, value];
      })
    );
  
    /**
     * Return Object From Spread Of Valid And Conflicting Slots
     */
    return Object.fromEntries([...slots, ...conflictingSlots]);
  };

  const Avatar = ( model : CharacterModel) => {
  
    
    const slots = pick(
    getConflictAwareSlots(model),
    objectKeys(ORDERED_SLOTS)
    );

    /**
     * Return Only Unique Values By The First Position (The Value) In The Entries Array
     * This Fixes Issues With Whole Body Pieces Being Rendered More Than Once
     */
    const entries = uniqBy(objectEntries(slots), "1");
    console.log(entries);
    return entries
  };
  
  export default Avatar;
  