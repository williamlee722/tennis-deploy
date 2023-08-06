const mongoose = require("mongoose");
const notificationsSchema = new mongoose.Schema({
    day: {
        type: Date, // Year - Month - Day only,
        required: [true],
    },
    status: {
        type: String, // Read - Unread
        default: "Unread"
    },
    byUser: {
        type: String,
    },
    description: String,
    creditAmount: {
        type: Number
    }
})

const Notification = mongoose.model("Notification", notificationsSchema)

module.exports = Notification