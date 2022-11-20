import chalk from 'chalk';
import catchArchiveAsync from './index.js';

const way = process.argv;

async function textProcess(way) {
    const result = await catchArchiveAsync(way[2]);
    console.log(chalk.yellow("Link list"));
    result.
    forEach(element => {
        console.log(chalk.green(JSON.stringify(element)));
    });
}
textProcess(way)