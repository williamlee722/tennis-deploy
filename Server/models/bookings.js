const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    day:{
        type: Date // Year - Month - Day only
    },
    start:{
        type: Date // hour:minute only
    },
    end:{
        type: Date // hour:minute only
    },
    level: {
        type: String
        // value in beginner, intermediate, advance
    },
    status: String, // Open Full Canceled
    location: String,
    description: String,
    students: [
        {
            username: String,
            status: Number // 1- Ok 2- Waitlist 3- Rejected            
        }
    ]
    
})

const Booking = mongoose.model("Booking",bookingSchema)

module.exports = Booking