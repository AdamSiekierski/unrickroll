import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

const outputDefaults = {
  format: "iife",
  globals: {
    "webextension-polyfill": "browser",
  },
};

export default [
  {
    input: "./modules/contentScript/index.ts",
    output: {
      file: "./dist/contentScript.js",
      ...outputDefaults,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./modules/contentScript/tsconfig.json" }),
      copy({ targets: "./static", dest: "./dist" }),
    ],
  },
  {
    input: "./modules/background/index.ts",
    output: {
      file: "./dist/background.js",
      ...outputDefaults,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./modules/background/tsconfig.json" }),
    ],
  },
];
