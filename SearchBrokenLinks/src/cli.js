import chalk from 'chalk';
import fs from 'fs';
import catchArchiveAsync from './index.js';

const way = process.argv;

function printList(result, identify) {
    console.log(
        chalk.yellow("Link List:"),
        chalk.bgBlack.bgGreen(identify),
        result)
}

function noLinks(error) {
    throw new Error(chalk.red(error.code, "Não há links."))
}

function noSutchFile(error) {
   throw new Error(chalk.red(error.code, "- No sutch archive or dir."))
}

function verifyWay(way) {
    try {
        fs.statSync(way);
    } catch (error) {
        noSutchFile(error);
    }
}

async function logLinkInfo(args) {
    verifyWay(args);
    const infoLinks = await catchArchiveAsync(args)

        if (infoLinks.length === 0) {
            console.log(chalk.yellow("Link list"), chalk.red("No links"));

        } else {
            console.log(chalk.yellow("Link list"));
            infoLinks
            .forEach(Element => {
                console.log(chalk.green(JSON.stringify(Element)))
            })
        }
}

async function textProcess(args) {
    const way = args[2];
    verifyWay(way);

    if (fs.lstatSync(way).isFile()) {
        return await logLinkInfo(way);
    } 
    
    else if (fs.lstatSync(way).isDirectory()) {
        const archives = await fs.promises.readdir(way)
        
        archives
        .forEach(async (archiveName) => {
            const list = await catchArchiveAsync(`${way}/${archiveName}`)
            printList(list, archiveName);
        });
    }
}

textProcess(way)