const mongoose = require('mongoose');
const Booking = require('../models/bookings'); 
const User = require('../models/users'); 

// Connect to db
const db = mongoose.connection;

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


async function populateBookings() {
  try {
    // Empty collection
    // await Booking.deleteMany({});

    // users: berkeozten stuA123 stuB123
    const userA = await User.findOne({ username: 'berkeozten' });
    const userB = await User.findOne({ username: 'stuA123' });
    const userC = await User.findOne({ username: 'stuB123' });

    
    const bookingsData = [
      { date: new Date('2023-08-06'), level: 'beginner', status: 'Full', students: [{ username: userA.username, status: 1 }] },
      { date: new Date('2023-08-07'), level: 'intermediate', status: 'Open', students: [{ username: userB.username, status: 2 }] },
      { date: new Date('2023-08-08'), level: 'beginner', status: 'Open', students: [{ username: userC.username, status: 3 }] },
    ];

    // Save
    const bookings = await Booking.create(bookingsData);

    console.log('Bookings created:', bookings);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

populateBookings();
