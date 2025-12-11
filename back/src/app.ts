import { type Context, Hono } from 'hono'
import { getPlayer, getPlayers, postPlayer } from './controllers/players.js'
import { getStats } from './controllers/stats.js'
import { cors } from 'hono/cors'

export class App {
  static createApp() {
    const app = new Hono().basePath('/api')
    app.use(
      '*',
      cors({
        // on renvoie toujours FRONT_URL, peu importe l’Origin de la requête
        origin: (origin, c: Context) => {
          console.log('🌐 Origin reçu:', origin)
          console.log('🎯 FRONT_URL binding:', c.env.FRONT_URL)
          return c.env.FRONT_URL
        },
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: ['Content-Type'],
      })
    )
    app.get('/players', getPlayers)
    app.get('/players/:id', getPlayer)
    app.post('/players', postPlayer)
    app.get('/stats', getStats)

    app.onError((error, c: Context) => {
      console.error('HONO ERROR', error)
      return c.text('valeur :' + c.env.FRONT_URL)
    })

    return app
  }
}
