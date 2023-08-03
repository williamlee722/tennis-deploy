const express = require("express")
const app = express();
const mongoose = require("mongoose");
const User = require("./models/users.js");
const Bookings = require("./models/bookings.js")
const UserInfo = require("./models/userInfo.js")
const cors = require("cors");
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require('./middleware/auth');
const validator = require('validator');
require('dotenv').config();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// DB Link
const dbUrl = "mongodb+srv://berkeozten:lsTBZWheHeEymeqc@jjtennis.mvvk8s9.mongodb.net/jjtennisDB?retryWrites=true&w=majority";
async function dbConnect() {
    mongoose.connect(dbUrl)
        .then(() => {
            console.log("Successfully connected to MongoDB Atlas!");
        })
        .catch((error) => {
            console.log("Unable to connect to MongoDB Atlas!");
            console.error(error);
        });
}
dbConnect();

//Login - Get user from db

app.post("/login", (req, res) => {
    try {
        console.log("database connected");

        User.findOne({ username: req.body.username })
            .then((user) => {
                bcrypt.compare(req.body.password, user.password)
                    .then((passwordMatch) => {
                        if (passwordMatch) {
                            // Passwords match, create token
                            const token = jwt.sign(
                                {
                                    userId: user._id,
                                    username: user.username,
                                },
                                process.env.JWT_SECRET_KEY,
                                { expiresIn: '1h' }
                            );

                            console.log('Login successful - 1');
                            console.log(token);

                            // Return success response with token and username
                            res.send({
                                message: 'Login Successful',
                                username: user.username,
                                isAdmin: user.isAdmin,
                                token,
                            });
                        } else {
                            // Passwords do not match, send error response
                            res.status(401).send({
                                message: 'Incorrect username or password',
                            });
                        }
                    })
                    .catch((error) => {
                        // Handle any errors that occurred during bcrypt.compare()
                        console.error('Error comparing passwords:', error);
                        res.status(500).send({
                            message: 'Internal server error',
                        });
                    });
            }).catch((e) => {
                res.status(400).send({
                    message: "User doesn't exist"
                });
            });
    }
    catch (err) {
        console.log(`ERROR: ${err}`);
    }
});


//Register

app.post("/register", (req, res) => {
    console.log(req.body.username, req.body.password);

    if (!validator.isEmail(req.body.email)){
        res.status(400).send({
            message: "Not a valid e-mail!",
        });
        return;
    }

    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/g.test(req.body.password)){
        res.status(400).send({
            message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character!",
        });
        return;
    }
    else {
        console.log("Legal password")
    }


    // hash the password
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            // create a new user instance and collect the data
            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                isAdmin: false
            });


            console.log(user.first_name, user.last_name, user.username, user.email, user.password);
            // save the new user
            user
                .save()
                // return success if the new user is added to the database successfully
                .then((result) => {
                    res.send({
                        message: "User Created Successfully",
                        result,
                    });
                }).catch((e) => {
                    console.log(e.message);
                    res.status(400).send({
                        message: "Mail or username already in use!",
                    });
                });
        });
});

app.get("/portal", authenticateToken, (req, res) => {
    // req.user -> username
    console.log(req.user)
    res.send({
        message: "It is ok",
    })

})

app.listen(5000, () => {
    console.log("The server is up and running on port 5000");
})

