import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      title: 'All Flights',
      flights: flights
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function newFlight(req, res) {
  const newPlane = new Flight()
  const dateTime = newPlane.departs
  const departsDate = dateTime.toISOString().slice(0, 16)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate
  })
}

function create(req, res) {
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      title: `Flight ${flight.airline} #${flight.flightNo}`,
      flight: flight
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/skills')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  deleteFlight as delete
}
