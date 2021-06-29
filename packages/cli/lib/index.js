#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const plugin_env_init_1 = __importDefault(require("@fe-toolkit/plugin-env-init"));
const cli = cac_1.default('f');
plugin_env_init_1.default(cli);
cli.help();
cli.parse();
