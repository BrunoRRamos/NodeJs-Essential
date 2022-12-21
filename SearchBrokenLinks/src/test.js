const links = ["https://www.gov.br/saude/pt-br"]

async function test(links) {
    links.forEach(async (element) => {
        const res = await fetch(element)
        console.log(res.status)
    });
}
test(links)
