#!/usr/bin/env node

import cac from 'cac';
import pluginEnvInit from '@fe-toolkit/plugin-env-init';
import { init as pluginTemplateInit } from '@fe-toolkit/plugin-template-init';

const cli = cac('f');

pluginEnvInit(cli);

pluginTemplateInit(cli);

cli.help();

cli.parse();
