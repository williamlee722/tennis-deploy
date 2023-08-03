const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required: [true, "First Name cant be empty"],
        unique: false,
    },
    last_name: {
        type:String,
        required: [true, "Last Name cant be empty"],
        unique: false,
    },
    username: {
        type:String,
        required: [true, "Username cant be empty"],
        unique: [true, "Username Exist"],
    },
    email: {
        type:String,
        required: [true, "E-Mail cant be empty"],
        unique: [true, "Email Exist"],
    },
    password: {
        type: String,
        required: [true, "Password cant be empty"],
        // minlength: [8, "Password must be at least 8 characters long"],
        // maxlength: [100, "Password can't exceed 100 characters"],
        // validate: {
        //     validator: function (value) {
        //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/g.test(value);
        //     },
        //     message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character",
        //   },
        unique: false,
    },
    isAdmin:{
        type: Boolean,
        required: [true, "Something went wrong, call development team."],
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User