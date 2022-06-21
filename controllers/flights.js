import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({}).sort({'departs': "asc"})
  .then(flights => {
    flights.forEach(flight => {
      if (flight.departs.toISOString() < new Date().toISOString()) {
        flight.color = 'red'
      }
    })
    res.render('flights/index', {
      title: 'All Flights',
      flights: flights,
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
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
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
    res.redirect('/flights')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function edit(req, res) {
  const newPlane = new Flight()
  const dateTime = newPlane.departs
  const departsDate = dateTime.toISOString().slice(0, 16)
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      title: `Edit Flight ${flight.airline} #${flight.flightNo}`,
      flight: flight,
      departsDate
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${req.params.id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
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

function deleteTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.pop(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
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
  createTicket,
  edit,
  update,
  deleteFlight as delete,
  deleteTicket
}
