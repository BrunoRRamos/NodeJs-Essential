const links = ["https://gatinhosalsicha.com.br/"]

async function test(links) {
    links.forEach(async (element) => {
        const res = await fetch(element)
        console.log(res.status)
    });
}
test(links)
