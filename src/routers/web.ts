import { Elysia } from 'elysia'
import HomeController from '@/controllers/HomeController'
const app = new Elysia()

app.get('/', HomeController.index)

export default app
