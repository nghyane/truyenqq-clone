import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'

import api from './routers/api'

const app = new Elysia()

app.use(api)
.use(
    staticPlugin({
      assets: "public/js",
      prefix: "public/js",
      headers: {
        "Cache-Control": "max-age=604800",
      },
    })
  )
  .use(
    staticPlugin({
      assets: "public/img",
      prefix: "public/img",
      headers: {
        "Cache-Control": "max-age=604800",
      },
    })
  )
  .use(
    staticPlugin({
      assets: "public/css",
      prefix: "public/css",
    })
  )
app.use(html())



app.onError(({ code }) => {
    if (code === 'NOT_FOUND') return 'Route not found :('
})

app.listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
