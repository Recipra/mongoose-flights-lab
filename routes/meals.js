import { Router } from 'express'
import * as mealsCtrl from '../controllers'

const router = Router()

router.get('/new', mealsCtrl.new)

export {
  router
}