#!/usr/bin/env node
import dotenv from 'dotenv';
import cli from './cli.js';

dotenv.config();
cli(process.argv);

