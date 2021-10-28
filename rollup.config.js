import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

import { execSync } from "child_process";
import fs from "fs";

const clean = () => ({
  buildStart: () => {
    fs.rmdirSync("./dist", { recursive: true, force: true });
  },
});

const generateZip = () => ({
  writeBundle: () => {
    execSync(`zip -r ../unrickroll.zip *`, { cwd: "./dist/src" });
  },
});

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
      file: "./dist/src/contentScript.js",
      ...outputDefaults,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./modules/contentScript/tsconfig.json" }),
      clean(),
    ],
  },
  {
    input: "./modules/background/index.ts",
    output: {
      file: "./dist/src/background.js",
      ...outputDefaults,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./modules/background/tsconfig.json" }),
      copy({ targets: [{ src: "./static/**/*", dest: "./dist/src" }] }),
      generateZip(),
    ],
  },
];
