import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: { type: String, match: /[A-J][1-9]\d?/ },
  price: { type: Number, min: 0}
}, {
  timestamps: true
})

const flightSchema = new Schema({
  airline: { type: String, enum: ['American', 'Southwest', 'United'] },
  airport: { type: String, default: 'DEN', enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'] },
  flightNo: { type: Number, required: true, min: 10, max: 9999 },
  departs: { type: Date, required: true,
    default: function() {
      let currentDate = new Date()
      let addedYear = currentDate.getFullYear() + 1
      return currentDate.setFullYear(addedYear)
    }
  },
  tickets: [ticketSchema],
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal'}]
}, {
  timestamps: true,
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}