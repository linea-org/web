"use client";

import { codeInput } from "@sanity/code-input";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "linea",
  title: "Linea",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), codeInput()],
});
