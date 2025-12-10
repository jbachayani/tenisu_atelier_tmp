import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getPlayer, getPlayers, postPlayer } from './controllers/players.js'
import { getStats } from './controllers/stats.js'

export class App {
  static createApp() {
    const app = new Hono().basePath('/api')
    app.use('*', (c, next) => {
      return cors({ origin: c.var.FRONT_URL })(c, next)
    })
    app.get('/players', getPlayers)
    app.get('/players/:id', getPlayer)
    app.post('/players', postPlayer)
    app.get('/stats', getStats)
    return app
  }
}
