import { setupWorker } from 'msw/browser'
import { userHandlers } from './user'
import { collectionHandlers } from './collection'


export const worker = setupWorker(...userHandlers, ...collectionHandlers)