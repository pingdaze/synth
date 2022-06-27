import Airtable from "airtable";
import type { Attachment } from "airtable/lib/attachment";
import type { FieldSet } from "airtable/lib/field_set";
import type { Records } from "airtable/lib/records";
import _, { snakeCase } from "lodash";
import { writeFile } from "node:fs/promises";
import type { Replace } from "type-fest";
import * as dotenv from "dotenv";
dotenv.config();

function isPresent<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

const BASE_ID = "app8uieQgz940fFXZ";

const TABLE_SKELETON = "Skeleton";
const TABLE_SKELETON_VIEW = "[DO NOT EDIT] Script View";

const TABLE_TRAITS = "Traits";
const VIEW_DEFAULT = "Default";

const TABLE_PILLBOOST_WEARABLES = "Pillboost Wearables";
const TABLE_PILLBOOST_WEARABLES_VIEW = "Default";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });

const base = airtable.base(BASE_ID);

async function generatePillboostWearablesData() {
  console.log(`Generating: pillboost-wearables.json`);

  const raw = await base(TABLE_PILLBOOST_WEARABLES)
    .select({ view: TABLE_PILLBOOST_WEARABLES_VIEW })
    .all();

  const records = buildObjectFromRecords(raw, [
    "Name",
    "Category",
    "Linked Item",
    "Form",
    "Locations",
    "Pill Type",
  ]);

  const filtered = records.filter((record) => isPresent(record.name));

  const data = await Promise.all(
    filtered.map(async (record) => {
      if (Array.isArray(record.linked_item)) {
        const items = await Promise.all(
          record.linked_item.map(async (id: string) => {
            const item = await base(TABLE_PILLBOOST_WEARABLES).find(id);

            if (item.get("Image")) {
              const fileName = (item.get("Image") as Attachment[])[0].filename;
              const image = (item.get("Image") as Attachment[])[0].url;

              return {
                name: item.get("Name"),
                location: item.get("Location"),
                fileName,
                image,
              };
            }

            return {
              name: item.get("Name"),
              location: item.get("Location"),
              fileName: null,
              image: null,
            };
          })
        );

        return {
          ...record,
          items,
        };
      }

      return record;
    })
  );

  console.log(`Writing: pillboost-wearables.json`);

  await writeFile(
    "data/pillboost-wearables.json",
    JSON.stringify(data, null, 2)
  );
}

async function generateSkeletonOptionsData() {
  console.log(`Generating: skeleton-options.json`);

  const raw = await base(TABLE_SKELETON)
    .select({ view: TABLE_SKELETON_VIEW })
    .all();

  const data = buildObjectFromRecords(raw, [
    "Name",
    "UUID",
    "Image",
    "Description",
    "Form",
    "Skeleton",
    "Location",
    "Category",
    "Color",
    "Position",
    "Conflict",
    "Rarity",
    "Prerequisite Type",
    "Prerequisite Value",
    "Linked Groups",
  ])
    .filter((record) => isPresent(record.name))
    .filter((record) => isPresent(record.form))
    .filter((record) => isPresent(record.location))
    .map((record) => {
      if (record.image instanceof Object && !Array.isArray(record.image)) {
        return {
          ...record,
          image: record.image.url,
          fileName: record.image.filename,
        };
      }

      return record;
    });
    const linkResolvedData  = data;
    console.log(data[0]["linked_groups"]);
    /*
  const linkResolvedData = await Promise.all(
    data.map(async (record) => {
      if (Array.isArray(record["linked_groups"])) {
        const linkedGroup = await base(TABLE_SKELETON).find(
          record["linked_groups"][0]
        );

        const cid = linkedGroup.get("CID") as string;

        return {
          ...record,
          cid,
        };
      }

      return record;
    })
  );*/

  console.log(`Writing: skeleton-options.json`);

  await writeFile(
    "data/skeleton-options.json",
    JSON.stringify(linkResolvedData, null, 2)
  );
}

async function generateStepOptionsData() {
  console.log(`Generating: step-options.json`);

  const rawSkeletonRecords = await base(TABLE_SKELETON)
    .select({ view: TABLE_SKELETON_VIEW })
    .all();

  const rawTraitsRecords = await base(TABLE_TRAITS)
    .select({ view: VIEW_DEFAULT })
    .all();

  const traitsRecords = buildObjectFromRecords(rawTraitsRecords, [
    "Name",
    "Type",
    "Rarity",
    "Prerequisite Type",
    "Prerequisite Value",
    "Description",
  ]).filter((record) => isPresent(record.name));

  const skeletonRecords = buildObjectFromRecords(rawSkeletonRecords, [
    "Name",
    "Rarity",
    "Prerequisite Type",
    "Prerequisite Value",
    "Description",
    "Skeleton",
    "Location",
    "Category",
    "Selectable",
    "Form",
  ])
    .filter((record) => isPresent(record.name))
    .filter((record) => isPresent(record.form))
    .filter((record) => isPresent(record.skeleton))
    .filter((record) => isPresent(record.location));

  const cleanedSkeletonRecords = skeletonRecords
    .map((record) => {
      switch (true) {
        case record.selectable &&
          record.form === "pepel" &&
          record.skeleton === "marking":
          return { ...record, type: "Marking" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "wearable" &&
          record.category === "mask":
          return { ...record, type: "Hashmonk Mask" };

        case record.selectable &&
          record.form === "pepel" &&
          Array.isArray(record.location) &&
          record.location.includes("mouth"):
          return { ...record, type: "Mouth" };

        case record.selectable &&
          record.form === "pepel" &&
          Array.isArray(record.location) &&
          record.location.includes("eyes"):
          return { ...record, type: "Eyes" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          Array.isArray(record.location) &&
          record.location.includes("torso"):
          return { ...record, type: "Hashmonk Torso" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          Array.isArray(record.location) &&
          record.location.includes("head"):
          return { ...record, type: "Hashmonk Head" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          Array.isArray(record.location) &&
          record.location.includes("crown"):
          return { ...record, type: "Hashmonk Crown" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          Array.isArray(record.location) &&
          record.location.includes("right-arm"):
          return { ...record, type: "Hashmonk Right Arm" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          Array.isArray(record.location) &&
          record.location.includes("left-arm"):
          return { ...record, type: "Hashmonk Left Arm" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          Array.isArray(record.location) &&
          record.location.includes("right-leg"):
          return { ...record, type: "Hashmonk Right Leg" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          Array.isArray(record.location) &&
          record.location.includes("left-leg"):
          return { ...record, type: "Hashmonk Left Leg" };

        default:
          return undefined;
      }
    })
    .filter(isPresent)
    .map(({ category, location, skeleton, form, selectable, ...rest }) => rest);

  const groupedData = _.groupBy(
    [...traitsRecords, ...cleanedSkeletonRecords],
    "type"
  );

  const dedupedEntries = Object.entries(groupedData).map(([key, value]) => [
    key,
    _.uniqBy(value, "name"),
  ]);

  const data = Object.fromEntries(dedupedEntries);

  console.log(`Writing: step-options.json`);

  await writeFile("data/step-options.json", JSON.stringify(data, null, 2));
}

async function main() {
  await generateStepOptionsData();

  await generatePillboostWearablesData();

  await generateSkeletonOptionsData();
}

main();

interface AttachmentObject {
  url: string;
  filename: string;
}

const buildObjectFromRecords = <T extends string>(
  records: Records<FieldSet>,
  columns: T[]
): Record<
  Replace<Lowercase<T>, " ", "_", { all: true }>,
  string | string[] | AttachmentObject
>[] => {
  return records.map((record) => {
    const entries = columns.map((columnName) => {
      const key = snakeCase(columnName);

      const valueForField = record.get(columnName) ?? null;

      if (
        Array.isArray(valueForField) &&
        valueForField.some((elem: Attachment) => typeof elem.url === "string")
      ) {
        return [
          key,
          {
            url: valueForField[0].url,
            filename: valueForField[0].filename,
          },
        ];
      }

      if (typeof valueForField === "string") {
        return [key, valueForField.trim()];
      }

      return [key, valueForField];
    });

    return Object.fromEntries(entries);
  });
};
