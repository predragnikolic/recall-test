import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { auth } from "./utils/auth.js";
import { cors } from 'hono/cors'


const app = new Hono()
app.use('*', cors({
    origin: ['http://localhost:5173'], // @TODO change this in prod
    credentials: true,
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/ping', (c) => {
  return c.json({
    message: 'hello'
  })
})

app.get('/api/auth/*', (c) => auth.handler(c.req.raw));
app.post('/api/auth/*', (c) => auth.handler(c.req.raw));


const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
