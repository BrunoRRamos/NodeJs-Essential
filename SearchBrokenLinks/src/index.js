import fs from 'fs';
import chalk from 'chalk';

function catchError(error) {
    throw new Error(chalk.red(error.code, "Reading Error"));
}

//Cria um array com {nomeLink : link}.
function createLinkObj(arr) {
    let arrLinks = [];
    for (let i = 0; i < arr.length; i++) {
        arrLinks.push({[arr[i][1]]: arr[i][2]})
    }
    return arrLinks;
}

//Cria um array com o texto desejado pelo regex.
function extractLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const catches = [...text.matchAll(regex)];
    const resultTest = catches.map(captura => ({[captura[1]]: captura[2]}))
    //return createLinkObj(catches);
    return resultTest.length !== 0 ? resultTest : "0 links";
}

//Lê uim arquivo .md e retorna um array com objetos {nomeLink : link}.
async function catchArchiveAsync(archiveRoute) {
    const encoding = 'utf-8';
    try {
        const text = await fs.promises.readFile(archiveRoute, encoding);
        const relarionLinks = extractLinks(text);
        return relarionLinks;
    } catch (error) {
        catchError(error);
    }
}

export default catchArchiveAsync;