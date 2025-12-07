import { Hono } from 'hono'
import { getPlayer, getPlayers, postPlayer } from './controllers/players.js'
import { serve, type ServerType } from '@hono/node-server'
import { getStats } from './controllers/stats.js'

export class App {
  async run() {
    const server = await this.startServer()
    process.on('SIGTERM', this.exit.bind(this, server))
    console.log('app_start')
  }

  private async startServer() {
    const { fetch } = App.createApp()
    const server = serve({ fetch, port: 3000 })
    await new Promise((resolve) => server.once('listening', resolve))
    return server
  }

  static createApp() {
    const app = new Hono().basePath('/api')
    app.get('/players', getPlayers)
    app.get('/players/:id', getPlayer)
    app.post('/players', postPlayer)
    app.get('/stats', getStats)
    return app
  }

  private async exit(server: ServerType) {
    await new Promise((resolve) => server.close(resolve))
    console.log('app_stop')
  }
}
