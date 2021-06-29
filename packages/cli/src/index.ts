#!/usr/bin/env node

import cac from 'cac';
import pluginEnvInit from '@fe-toolkit/plugin-env-init';

const cli = cac('f');

pluginEnvInit(cli);

cli.help();

cli.parse();
