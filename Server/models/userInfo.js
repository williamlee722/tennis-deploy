const mongoose = require("mongoose");
const userInfoSchema = new mongoose.Schema({
    username: {
        type:String,
    },
    level: {
        type:String,
    },
    credits: {
        type:Number,
    },
    feedbacks: {
        type: [
            {
                dateOfFeed: String,
                feedback: String
            }
        ]
    }
})

const UserInfo = mongoose.model("UserInfo",userInfoSchema)

module.exports = UserInfo