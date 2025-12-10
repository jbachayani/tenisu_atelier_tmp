import { Hono } from 'hono'
import { getPlayer, getPlayers, postPlayer } from './controllers/players.js'
import { getStats } from './controllers/stats.js'

export class App {
  static createApp() {
    const app = new Hono().basePath('/api')
    //app.use('*', cors())
    app.get('/players', getPlayers)
    app.get('/players/:id', getPlayer)
    app.post('/players', postPlayer)
    app.get('/stats', getStats)
    return app
  }
}
