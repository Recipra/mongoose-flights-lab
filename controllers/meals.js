import { Meal } from "../models/meal.js"

function newMeal(req, res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      title: 'Add Meal',
      meals
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  newMeal as new
}