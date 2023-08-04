const mongoose = require("mongoose");
const userInfoSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    level: {
        type: String, // beginner, intermediate, advance
    },
    credits: {
        type: Number,
    },
    feedbacks: {
        type: [
            {
                dateOfFeed: Date, // Year Month Day 
                feedback: String
            }
        ]
    }
})

const UserInfos = mongoose.model("UserInfo", userInfoSchema)

module.exports = UserInfos