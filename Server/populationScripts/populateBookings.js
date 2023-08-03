const mongoose = require('mongoose');
const Booking = require('../models/bookings'); // Adjust the path to the Booking model file
const User = require('../models/users'); // Adjust the path to the User model file

// Assuming you have already established the MongoDB connection
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

// Function to populate the bookings collection
async function populateBookings() {
  try {
    // Clear existing data (optional)
    await Booking.deleteMany({});

    // Get user documents for User A, B, and C
    const userA = await User.findOne({ username: 'berkeozten' });
    const userB = await User.findOne({ username: 'stuA123' });
    const userC = await User.findOne({ username: 'stuB123' });

    // Create bookings associated with users
    const bookingsData = [
      { date: new Date('2023-08-06'), level: 'beginner', status: 'Full', students: [{ username: userA.username, status: 1 }] },
      { date: new Date('2023-08-07'), level: 'intermediate', status: 'Open', students: [{ username: userB.username, status: 2 }] },
      { date: new Date('2023-08-08'), level: 'beginner', status: 'Open', students: [{ username: userC.username, status: 3 }] },
    ];

    // Save the bookings to the database
    const bookings = await Booking.create(bookingsData);

    console.log('Bookings created:', bookings);
  } catch (error) {
    console.error('Error populating bookings:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Call the populateBookings function
populateBookings();
