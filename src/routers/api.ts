import { Elysia } from 'elysia'

const api = new Elysia()

api.group('/api', (app) => {
    app.get('/', () => 'Hello from api!')

    return app;
})

export default api