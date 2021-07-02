#!/usr/bin/env node

import cac from 'cac';

const cli = cac('f');

cli.help();

cli.parse();
