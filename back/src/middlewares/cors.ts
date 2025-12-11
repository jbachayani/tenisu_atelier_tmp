import type { Context, Next } from 'hono'
import { cors } from 'hono/cors'

export function corsMiddleware(c: Context, next: Next) {
  return cors({
    origin: '*',
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type'],
  })(c, next)
}
