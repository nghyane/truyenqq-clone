import { Elysia } from 'elysia'
import HomeController from '@/controllers/HomeController'
import MangaController from '@/controllers/MangaController'
const app = new Elysia()

app.get('/', HomeController.welcome)

app.get('/home', HomeController.index)
app.get('/home/:page', HomeController.index)

app.get('/manga/:_slug/:id', MangaController.index)
app.get('/read/:_slug/:id', HomeController.chapter)


export default app
