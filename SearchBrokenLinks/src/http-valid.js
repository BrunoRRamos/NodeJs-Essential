import chalk from "chalk";

function extractLinks(arrLinks) {
    return arrLinks.map((objectLink) => Object.values(objectLink).join())
}


async function checkStatus(listURLs) {
    const arrStatus = await Promise
    .all(
        listURLs
        .map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch (error) {
                return errorManagement(error)
            }
        })
        );
        return arrStatus;
    }
    
function errorManagement(error) {
    if (error.cause.code === "ENOTFOUND") {
        return "Link not found"
    } else {
        return "fatal Error"
    }
}

export default async function validedList(listLinks) {
    const links = extractLinks(listLinks);
    const status = await checkStatus(links);
    console.log(listLinks.map((object, index) => ({
        ...object,
         status: status[index]
    })))
}
