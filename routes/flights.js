import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

/* GET users listing. */

router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.post('/', flightsCtrl.create)
router.get('/:id', flightsCtrl.show)
router.post('/:id/meals', flightsCtrl.addToMeals)
router.post('/:id/tickets', flightsCtrl.createTicket)
router.delete('/:id/tickets/:ticketId', flightsCtrl.deleteTicket)
router.get('/:id/edit', flightsCtrl.edit)
router.put('/:id', flightsCtrl.update)
router.delete('/:id', flightsCtrl.delete)

export {
  router
}
