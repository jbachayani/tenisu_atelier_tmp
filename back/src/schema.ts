import { z } from 'zod'

export const playerSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  shortname: z.string(),
  sex: z.string(),
  country: z.object({
    picture: z.string(),
    code: z.string(),
  }),
  picture: z.string(),
  data: z.object({
    rank: z.number(),
    points: z.number(),
    weight: z.number(),
    height: z.number(),
    age: z.number(),
    last: z.array(z.number()),
  }),
})
