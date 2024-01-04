import Manga from './models/MangaModel'

Manga.sync({ force: true }).then(() => {
    console.log('Manga table created')
})
