function extractLinks(arrLinks) {
    return arrLinks.map((objectLink) => Object.values(objectLink).join())
}

async function checkStatus(listURLs) {
    const arrStatus = await Promise
    .all(
        listURLs
        .map(async (url) => {
            const response = await fetch(url);
            return response.status;
        })
    );

    return arrStatus;
}

export default async function validedList(listLinks) {
    const links = extractLinks(listLinks);
    console.log(links);
    const status = await checkStatus(links);
    console.log(status);
    return status;
}

//[TestBrokenLink](https://www.BrokenLink.com).