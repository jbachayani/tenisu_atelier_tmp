import { Hono } from 'hono'
import { getPlayer, getPlayers, postPlayer } from './controllers/players.js'
import { getStats } from './controllers/stats.js'
import { corsMiddleware } from './middlewares/cors.js'

export class App {
  static createApp() {
    const app = new Hono().basePath('/api')
    app.use('*', corsMiddleware)
    app.get('/players', getPlayers)
    app.get('/players/:id', getPlayer)
    app.post('/players', postPlayer)
    app.get('/stats', getStats)

    app.onError((error, c) => {
      console.error('HONO ERROR', error)
      return c.text('Something went wrong')
    })

    return app
  }
}
