const mongoose = require("mongoose");
const Booking = require("../models/bookings");

// DB Link
require('dotenv').config();
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

Booking.deleteMany({})

// Function to create a booking event
const createBookingEvent = (id, day, start, end, level, status, location, description, students) => {
  const newBooking = new Booking({
    id: id,
    day: new Date(day),
    start: start,
    end: end,
    level: level,
    status: status,
    location: location,
    description: description,
    students: students,
  });

  newBooking.save()
    .then((result) => {
      console.log("Booking saved successfully:", result);
    })
    .catch((error) => {
      console.error("Error saving booking:", error);
    });
};

// Create two booking events in the same day and same level
const day1 = "2023-08-10";
const startTime1 = "10:00";
const endTime1 = "12:00";
const level1 = "beginner";
const students1 = [
  { username: "berkeozten", status: 1 },
  { username: "stuB123", status: 1 },
];

createBookingEvent(1, day1, startTime1, endTime1, level1, "Open", "Hyde Park", "Intermediate Class 1", students1);

const startTime2 = "14:00";
const endTime2 = "16:00";
const students2 = [
  { username: "stuA123", status: 2 },
];

createBookingEvent(2, day1, startTime2, endTime2, "intermediate", "Open", "Lafarge Park", "Intermediate Class 2", students2);

// Create three more booking events with different details
const day2 = "2023-08-12";
const startTime3 = "09:00";
const endTime3 = "11:00";
const level2 = "beginner";
const students3 = [
  { username: "berkeozten", status: 1 },
  { username: "stuB123", status: 1 },
];

createBookingEvent(3, day2, startTime3, endTime3, level2, "Open", "Hyde Park", "Beginner Class 1", students3);


const day4 = "2023-08-17";
const startTime5 = "14:30";
const endTime5 = "16:30";
const level4 = "beginner";
const students5 = [
  { username: "berkeozten", status: 2 },
];

createBookingEvent(4, day4, startTime5, endTime5, level4, "Open", "Hyde Park", 1, students5);
