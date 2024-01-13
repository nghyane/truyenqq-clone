import { PrismaClient } from '@prisma/client'
import { MangaStatus } from './types/MangaTypes'

console.log('Installing...')

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        }
    ],
})

prisma.$on(
    'query',
    (e) => {
        console.log('Query: ' + e.query)
        console.log('Duration: ' + e.duration + 'ms')
    }
)

// insert genres
// for (let i = 0; i < 10; i++) {
//     await prisma.genre.create({
//         data: {
//             name: `Genre ${i}`
//         }
//     })
// }


// for (let i = 0; i < 10; i++) {
//     await prisma.manga.create({
//         data: {
//             title: `Manga ${i}`,
//             description: `Description ${i}`,
//             image: `https://i.pinimg.com/originals/ac/50/40/ac50402ca57413e981c8f08ccb3cd52b.jpg`,
//             status: MangaStatus.ONGOING,
//         }
//     }).then(async manga => {
//         const randomGenre = Math.floor(Math.random() * 10) + 1
//         await prisma.mangaGenre.create({
//             data: {
//                 mangaId: manga.id,
//                 genreId: randomGenre
//             }
//         })
//     })
// }

// get all mangas, with genres, where status is MangaStatus.ONGOING, and order by id, descending, in manga table get name, description, image, status, and in genre table get name
const mangas = await prisma.manga.findMany({
    where: {
        status: MangaStatus.ONGOING
    },
    orderBy: {
        id: 'desc'
    },
    select: {
        title: true,
        description: true,
        image: true,
        status: true,
    },
    take: 10,
})


prisma.$disconnect()

mangas.forEach(manga => {
    // console.log(manga, manga.genres)
})