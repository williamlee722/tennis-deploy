const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    date:{
        type: Date
    },
    level: {
        type: String
        // value in beginner, intermediate, advance
    },
    students: [
        {
            username: String,            
        }
    ]
    
})

const Booking = mongoose.model("Booking",bookingSchema)

module.exports = Booking