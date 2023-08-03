const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    date:{
        type: Date // Year - Month - Day only
    },
    level: {
        type: String
        // value in beginner, intermediate, advance
    },
    status: String, // 1- Open 2- Full 3- Canceled
    students: [
        {
            username: String,
            status: Number // 1- Ok 2- Waitlist 3- Rejected            
        }
    ]
    
})

const Booking = mongoose.model("Booking",bookingSchema)

module.exports = Booking