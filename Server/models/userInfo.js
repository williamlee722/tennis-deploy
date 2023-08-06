const mongoose = require("mongoose");
const userInfoSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
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
    },
    preferedZelleID: {
        type: String,
    }
})

const UserInfos = mongoose.model("UserInfo", userInfoSchema)

module.exports = UserInfos