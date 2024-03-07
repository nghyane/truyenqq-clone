import prisma from "@/services/prisma";

async function fetchAndUploadImages(manga: any[]) {
    const promises = manga.map(async (m) => {
        const mangaId = m.id;
        const path = `covers/${mangaId}.jpg`;

        try {
            const uploaded = await fetch(`https://bn.image01.workers.dev/?path=${path}&url=${m.image}`, {
                method: "GET",
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Referer": "https://kumaraw.com/",
                },
            }).then((res) => res.json());

            if (uploaded.HttpCode === 201) {
                await prisma.manga.update({
                    where: {
                        id: mangaId,
                    },
                    data: {
                        image: `https://storage.dnmanga.one/${path}`,
                    },
                });
                console.log(`https://storage.dnmanga.one/${path}`);
                console.log(`Done ${m.title}`);
            }
        } catch (error) {
            console.error(`Error processing manga ${m.title}:`, error);
        }
    });

    await Promise.all(promises);
}

async function main() {
    try {
        // get all manga with cover containing rawkuma
        const manga = await prisma.manga.findMany({
            where: {
                image: {
                    contains: "cdn.kumaraw.com",
                },
            },
            select: {
                id: true,
                title: true,
                image: true,
            }
        });

        await fetchAndUploadImages(manga);

        console.log("Done all");
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

await main();
