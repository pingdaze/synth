// @ts-check
import Airtable from "airtable";
import _ from "lodash";
import fetch from "node-fetch";
import { existsSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { isPresent } from "ts-extras";
import 'dotenv/config';

const BASE_ID = "app8uieQgz940fFXZ";

const TABLE_SKELETON = "Skeleton";
const TABLE_SKELETON_VIEW = "[DO NOT EDIT] Script View";

const TABLE_TRAITS = "Traits";
const VIEW_DEFAULT = "Default";

const TABLE_PILLBOOST_WEARABLES = "Pillboost Wearables";
const TABLE_PILLBOOST_WEARABLES_VIEW = "Default";
console.log(process.env)
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });

const base = airtable.base(BASE_ID);

async function generatePillboostWearablesData() {
  console.log(`Generating: pillboost-wearables.json`);

  /**
   * @typedef {Object} PillboostWearable
   * @property {string} name
   * @property {string[]} category
   * @property {string[]} linked_item
   * @property {string[]} form
   * @property {string[]} locations
   * @property {string[]} pill_type
   */

  const raw = await base(TABLE_PILLBOOST_WEARABLES)
    .select({ view: TABLE_PILLBOOST_WEARABLES_VIEW })
    .all();

  /**
   * @type {PillboostWearable[]}
   */
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
      const items = await Promise.all(
        record.linked_item.map(async (id) => {
          const item = await base(TABLE_PILLBOOST_WEARABLES).find(id);

          if (item.get("Image")) {
            const fileName = item.get("Image")[0].filename;
            const image = item.get("Image")[0].url;

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
    })
  );

  console.log(`Writing: pillboost-wearables.json`);

  await writeFile(
    "data/_generated/pillboost-wearables.json",
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
    "UINT",
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
  ])
    .filter((record) => isPresent(record.name))
    .filter((record) => isPresent(record.form))
    .filter((record) => isPresent(record.location))
    .map((record) => {
      if (record.image) {
        return {
          ...record,
          image: record.image.url,
          fileName: record.image.filename,
        };
      }

      return record;
    });

  console.log(`Writing: skeleton-options.json`);

  await writeFile(
    "data/_generated/skeleton-options.json",
    JSON.stringify(data, null, 2)
  );

  if (!existsSync("public/images/_generated")) {
    console.log(
      "Folder 'public/images/_generated' Does Not Exist, Creating..."
    );

    await mkdir("public/images/_generated");
  }

  for (const item of data.filter((item) => item.image && item.fileName)) {
    await download(
      item.image,
      item.fileName,
      `public/images/_generated/${item.fileName}`
    );
  }
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

  const cleanedTraitsRecords = traitsRecords.filter((record) =>
    isPresent(record.name)
  );

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
          record.location.includes("mouth"):
          return { ...record, type: "Mouth" };

        case record.selectable &&
          record.form === "pepel" &&
          record.location.includes("eyes"):
          return { ...record, type: "Eyes" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          record.location.includes("torso"):
          return { ...record, type: "Hashmonk Torso" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          record.location.includes("head"):
          return { ...record, type: "Hashmonk Head" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          record.location.includes("crown"):
          return { ...record, type: "Hashmonk Crown" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          record.location.includes("right-arm"):
          return { ...record, type: "Hashmonk Right Arm" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          record.location.includes("left-arm"):
          return { ...record, type: "Hashmonk Left Arm" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          record.location.includes("right-leg"):
          return { ...record, type: "Hashmonk Right Leg" };

        case record.selectable &&
          record.form === "hashmonk" &&
          record.skeleton === "base" &&
          record.location.includes("left-leg"):
          return { ...record, type: "Hashmonk Left Leg" };

        default:
          return undefined;
      }
    })
    .filter(isPresent)
    .map(({ category, location, skeleton, form, selectable, ...rest }) => rest);

  const groupedData = _.groupBy(
    [...cleanedTraitsRecords, ...cleanedSkeletonRecords],
    "type"
  );

  const dedupedEntries = Object.entries(groupedData).map(([key, value]) => [
    key,
    _.uniqBy(value, "name"),
  ]);

  const data = Object.fromEntries(dedupedEntries);

  console.log(`Writing: step-options.json`);

  await writeFile(
    "data/_generated/step-options.json",
    JSON.stringify(data, null, 2)
  );
}

async function main() {
  await generateStepOptionsData();

  await generatePillboostWearablesData();

  await generateSkeletonOptionsData();
}

main();

/**
 * @param {string} url
 * @param {string} fileName
 * @param {string} pathLike
 */
const download = async (url, fileName, pathLike) => {
  try {
    if (existsSync(pathLike)) {
      return console.log(`${fileName} Exists. Skipping Download.`);
    }

    console.log(`Downloading: ${fileName}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const buffer = await response.buffer();

    await writeFile(pathLike, buffer);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {import("airtable").Records<import("airtable").FieldSet>} records
 * @param {string[]} columns
 */
const buildObjectFromRecords = (records, columns) => {
  return records.map((record) => {
    const entries = columns.map((columnName) => {
      const key = columnName.toLowerCase().replace(" ", "_");

      const valueForField = record.get(columnName) ?? null;

      if (
        Array.isArray(valueForField) &&
        valueForField.some(
          /**
           * @param {import("airtable").Attachment} elem
           */
          (elem) => typeof elem.url === "string"
        )
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
