import type { KVNamespace } from '@cloudflare/workers-types'

declare module 'hono' {
  interface Env {
    Bindings: {
      TENISU_DB: KVNamespace
      FRONT_URL: string
    }
  }
}
