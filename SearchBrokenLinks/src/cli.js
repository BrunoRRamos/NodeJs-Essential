import chalk from 'chalk';
import fs from 'fs';
import catchArchiveAsync from './index.js';
import validedList from './http-valid.js';

const way = process.argv;

function printList(valid = "", result, identify = "") {
    if (valid) {
        console.log(
            chalk.yellow("Valided link list:"),
            chalk.bgBlack.bgGreen(identify),
            validedList(result))

    } else if (result.length != 0) {
        console.log(
            chalk.yellow("Link List:"),
            chalk.bgBlack.bgGreen(identify),
            result)
    }
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

async function textProcess(args) {
    const way = args[2];
    const valid = args[3] === "--valid";

    verifyWay(way);

    if (fs.lstatSync(way).isFile()) {
        const result = await catchArchiveAsync(way);
        printList(valid, result)
    } 
    
    else if (fs.lstatSync(way).isDirectory()) {
        const archives = await fs.promises.readdir(way)
        
        archives
        .forEach(async (archiveName) => {
            const list = await catchArchiveAsync(`${way}/${archiveName}`)
            printList(valid, list, archiveName);
        });
    }
}

textProcess(way)