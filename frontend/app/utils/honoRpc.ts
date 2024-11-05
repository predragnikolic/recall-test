import type { AppType } from '~/../../server/src/index'
import { hc } from 'hono/client'

export const honoClient = hc<AppType>(import.meta.env.VITE_BACKEND_BASE_URL)

