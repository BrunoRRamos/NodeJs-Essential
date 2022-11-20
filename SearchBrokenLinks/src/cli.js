import chalk from 'chalk';
import catchArchiveAsync from './index.js';

const way = process.argv;

function noLinks(error) {
    throw new Error(chalk.red(error.code, "Não há links."))
}

async function textProcess(way) {
    console.log(chalk.yellow("Link list"));
    try {
        const result = await catchArchiveAsync(way[2]);
        result.
        forEach(element => {console.log(chalk.green(JSON.stringify(element)));});
        } catch(error) {
            noLinks(error);
        }
 }
textProcess(way)