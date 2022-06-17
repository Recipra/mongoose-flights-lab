import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: { type: String, required: true, enum: ['American', 'Southwest', 'United'] },
  airport: { type: String, default: 'DEN', enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'] },
  flightNo: { type: Number, required: true, min: 10, max: 9999 },
  departs: { type: Date,
    default: function() {
      let currentDate = new Date()
      let addedYear = currentDate.getFullYear() + 1
      return currentDate.setFullYear(addedYear)
    }
  }
}, {
  timestamps: true,
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}