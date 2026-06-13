import { Router } from 'express'
import type { Model } from 'mongoose'
import { Activity } from '../models/activity.js'
import { LeaderboardEntry } from '../models/leaderboard.js'
import { Team } from '../models/team.js'
import { User } from '../models/user.js'
import { Workout } from '../models/workout.js'

function createCollectionRouter(model: Model<any>) {
  const router = Router()

  router.get('/', async (_request, response, next) => {
    try {
      const items = await model.find().sort({ createdAt: -1 }).lean()
      response.json(items)
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (request, response, next) => {
    try {
      const createdItem = await model.create(request.body)
      response.status(201).json(createdItem)
    } catch (error) {
      next(error)
    }
  })

  return router
}

export const apiRouter = Router()

apiRouter.use('/users', createCollectionRouter(User))
apiRouter.use('/teams', createCollectionRouter(Team))
apiRouter.use('/activities', createCollectionRouter(Activity))
apiRouter.use('/leaderboard', createCollectionRouter(LeaderboardEntry))
apiRouter.use('/workouts', createCollectionRouter(Workout))