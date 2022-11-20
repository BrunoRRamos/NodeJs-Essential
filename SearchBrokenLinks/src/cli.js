import chalk from 'chalk';
import catchArchiveAsync from './index.js';

const way = process.argv;

async function textProcess(way) {
    const result = await catchArchiveAsync(way[2]);
    console.log(chalk.yellow("Link list"), chalk.green(result))
}

textProcess(way)