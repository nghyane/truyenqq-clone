import { Elysia } from 'elysia'
import HomeController from '@/controllers/HomeController'
import MangaController from '@/controllers/MangaController'
import ReadController from '@/controllers/ChapterController'
import HistoryController from '@/controllers/HistoryController'
import BookmarkController from '@/controllers/BookmarkController'
import NotFoundPage from '@/views/pages/404'

const app = new Elysia()
const bookmark = new BookmarkController()


app.get('/', HomeController.welcome)

app.get('/home', HomeController.index)
app.get('/home/:page', HomeController.index)

app.get('/manga/:_slug/:id', MangaController.index)
app.get('/read', ReadController.index)

app.get('/history', HistoryController.index)
app.get('/bookmark', bookmark.index)

app.onError(({ code, set }) => {
    set.headers['Content-Type'] = 'text/html; charset=utf8'

    return NotFoundPage;
})

export default app
