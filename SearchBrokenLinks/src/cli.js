import chalk from 'chalk';
import fs from 'fs';
import catchArchiveAsync from './index.js';

const way = process.argv;

function noLinks(error) {
    throw new Error(chalk.red(error.code, "Não há links."))
}

async function logLinkInfo(args) {
    const infoLinks = await catchArchiveAsync(way)
        if (infoLinks.length === 0) {
            console.log(chalk.yellow("Link list"), chalk.red("No links"));
        } else {
            console.log(chalk.yellow("Link list"));
            infoLinks
            .forEach(Element => {console.log(chalk.green(JSON.stringify(Element)))})
        }
}

async function textProcess(args) {
    const way = args[2]

    if (fs.lstatSync(args).isFile()) {
        logLinkInfo(way)
    } 
    
    else if (fs.lstatSync(args).isDirectory()) {

    }

 }

textProcess(way)