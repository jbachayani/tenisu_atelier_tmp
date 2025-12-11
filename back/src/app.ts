import { type Context, Hono } from 'hono'
import { getPlayer, getPlayers, postPlayer } from './controllers/players.js'
import { getStats } from './controllers/stats.js'
import { cors } from 'hono/cors'

export class App {
  static createApp() {
    const app = new Hono().basePath('/api')
    app.use('*', (c: Context, next) => {
      return cors({
        origin: c.env.FRONT_URL,
        allowMethods: ['GET', 'POST'],
        allowHeaders: ['Content-Type'],
      })(c, next)
    })
    app.get('/players', getPlayers)
    app.get('/players/:id', getPlayer)
    app.post('/players', postPlayer)
    app.get('/stats', getStats)
    app.get('/status', (c: Context) => {
      return c.text('valeur : ' + c.env.FRONT_URL)
    })
    return app
  }
}
