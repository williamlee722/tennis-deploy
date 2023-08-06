const express = require("express")
const app = express();
const mongoose = require("mongoose");
const User = require("./models/users.js");
const Bookings = require("./models/bookings.js")
const UserInfos = require("./models/userInfo.js")
const Notifications = require("./models/notifications.js")
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
const dbUrl = process.env.DB_URL;
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

                            // console.log('Login successful - 1');
                            // console.log(token);

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

    if (!validator.isEmail(req.body.email)) {
        res.status(400).send({
            message: "Not a valid e-mail!",
        });
        return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/g.test(req.body.password)) {
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

            const userInfo = new UserInfos({
                username: req.body.username,
                level: 'undecided',
                credits: 0,
                feedbacks: [
                    {
                        dateOfFeed: new Date().setHours(0, 0, 0, 0),
                        feedback: "Wellcome to tennist"
                    }
                ]
            })

            console.log(user.first_name, user.last_name, user.username, user.email, user.password);
            // save the new user
            user
                .save()
                // return success if the new user is added to the database successfully
                .then((result) => {
                    userInfo.save()
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

// Get into portal
app.post("/portal", authenticateToken, (req, res) => {
    // console.log("in server portal")
    // // req.user -> username
    // console.log(req.user.username)
    const username = req.user.username

    try {
        User.findOne({ username: username }).then((userInfo) => {
            if (!userInfo.isAdmin) {
                UserInfos.findOne({ username: username }).then((userInfo) => {
                    const studentLevel = userInfo.level
                    Bookings.find({ level: studentLevel }).then((classList) => {
                        res.send({
                            username: username,
                            level: studentLevel,
                            credits: userInfo.credits,
                            feedbacks: userInfo.feedbacks,

                            eventdb: classList
                        });
                    })
                    // console.log(username)
                    // console.log(userInfo.level)
                    // console.log(userInfo.credits)
                    // console.log(userInfo.feedbacks)
                    // res.send({
                    //     username: username,
                    //     level: studentLevel,
                    //     credits: userInfo.credits,
                    //     feedbacks: userInfo.feedbacks
                    // });   
                })
            } else {
                res.status(400).send({
                    message: "Something went wrong please login again!"
                });
            }
        })
    } catch (error) {
        res.status(400).send({
            message: "Something went wrong please login again!"
        });
    }
})

// Admin data
app.post("/admin/getData", authenticateToken, (req, res) => {
    // Check if admin first
    try {
        const username = req.user.username
        User.findOne({ username: username }).then((userInfo) => {
            if (!userInfo.isAdmin) {
                res.status(400).send({
                    message: "Not Admin!"
                });
            } else {
                UserInfos.find({}).sort({username: 1}).then((userInfo) => {
                    Bookings.find({}).sort({day: 1}).then((bookings) => {
                        Notifications.find({}).then((notifications) => {
                            res.send({
                                userInfos: userInfo,
                                bookings: bookings,
                                notifications: notifications
                            });
                        })
                    })
                })
            }
        });
    } catch (error) {
        res.status(400).send({
            message: "Not Admin!"
        });
    }
})

// Admin user update
app.post("/admin/updateUser", authenticateToken, (req, res) => {
    // Check if admin first
    try {
        const username = req.user.username
        User.findOne({ username: username }).then((userInfo) => {
            if (!userInfo.isAdmin) {
                res.status(400).send({
                    message: "Not Admin!"
                });
            } else {
                const studentUserName = req.body.userInfoObject.username
                const newLevel = req.body.userInfoObject.level
                const newCredit = req.body.userInfoObject.credit
                UserInfos.find({ username: studentUserName }).then((userInfo) => {
                    
                    if(userInfo.level != newLevel){
                        feedString = "Your new level is " + newLevel
                        feedbackObj = {
                            dateOfFeed: new Date(),
                            feedback: feedString
                        }
                        feedbackList = userInfo.feedbacks
                        feedbackList.append(feedbackObj)
                    }else{
                        feedString = "Your new credit balance is " + newCredit
                        feedbackObj = {
                            dateOfFeed: new Date(),
                            feedback: feedString
                        }
                        feedbackList = userInfo.feedbacks
                        feedbackList.append(feedbackObj)
                    }                        
                    }).then(() => {
                        UserInfos.updateOne({ username: studentUserName }, {
                            $set: { level: newLevel, credits: newCredit, feedbacks: feedbackList }
                        }).then((result) => {
                            UserInfos.find({}).sort({username: 1}).then((userInfoList) => {
                                res.send({
                                    userInfos: userInfoList,
                                })
                            })
                        })
                    })
            }
        });
    } catch (error) {
        res.status(400).send({
            message: "Not Admin!"
        });
    }
})

// Admin lecture update
app.post("/admin/updateLecture", authenticateToken, (req, res) => {
    // Check if admin first
    try {
        const username = req.user.username
        User.findOne({ username: username }).then((userInfo) => {
            if (!userInfo.isAdmin) {
                res.status(400).send({
                    message: "Not Admin!"
                });
            } else {
                // Bookings.find({_id: req.body.bookingObject._id}).then((result) => console.log(result))

                Bookings.updateOne({ _id: req.body.bookingObject._id }, {
                    $set: { day: req.body.bookingObject.day, location: req.body.bookingObject.location, status: req.body.bookingObject.status }
                }).then((result) => {
                    Bookings.find({}).sort({day: 1}).then((bookings) => {
                    res.send({
                        bookings: bookings
                    });})
                })
            }
        });
    } catch (error) {
        res.status(400).send({
            message: "Not Admin!"
        });
    }
})

// Admin lecture create
app.post("/admin/createLecture", authenticateToken, (req, res) => {
    // Check if admin first
    try {
        const username = req.user.username
        User.findOne({ username: username }).then((userInfo) => {
            if (!userInfo.isAdmin) {
                res.status(400).send({
                    message: "Not Admin!"
                });
            } else {                
                    const booking = new Bookings({
                        day: req.body.eventDay,
                        start: req.body.eventStart,
                        end: req.body.eventEnd,
                        level: req.body.eventLevel,
                        location: req.body.eventLocation,
                        students: []
                    })

                    booking.save().then((result) => {
                        res.send({
                            message: "Lecture added Successfully",
                            result,
                        });
                })
            }
        });
    } catch (error) {
        res.status(400).send({
            message: "Not Admin!"
        });
    }
})

// Payment get zelleID
app.post("/payment/getData", authenticateToken, (req, res) => {
    try {
        const username = req.user.username
        UserInfos.findOne({ username: username }).then((userInfo) => {
            if (userInfo.preferedZelleID) {
                res.send({
                    preferedZelleID: userInfo.preferedZelleID,
                });
            } else {
                User.findOne({ username: username }).then((user) => {
                    UserInfos.updateOne(
                        { username: username },
                        { $set: { preferedZelleID: user.email } }
                    ).then(() => {
                        res.send({
                            preferedZelleID: user.email,
                        });
                    });
                });
            }
        }).catch((e) => {
            console.log(e.message);
            res.status(400).send({
                message: "User doesnt exist!",
            });
        })
    } catch (error) {
        res.status(400).send({
            message: "Error occured!"
        });
    }
})


// Notify credit
app.post("/payment/notifyCredit", authenticateToken, (req, res) => {
    const username = req.user.username
    const date = new Date()
    const creditAmount = req.body.creditAmount
    const preferedZelleID = req.body.preferedZelleID

    const notification = new Notifications({
        byUser: username,
        day: date,
        creditAmount: creditAmount
    })

    notification.save().then((result) => {
        res.send({
            message: "Notification Created Successfully",
            result,
        });
    }).catch((e) => {
        console.log(e.message);
        res.status(400).send({
            message: "Notification creation not successful",
        });
    });
})

app.listen(8000, () => {
    console.log("The server is up and running on port 8000");
})

