const mongoose = require("mongoose");
const Booking = require("../models/bookings");
const UserInfo = require('../models/userInfo');

// DB Link
require('dotenv').config();
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


async function populateUsersInfo() {
  try {
    // Empty collection
    await UserInfo.deleteMany({});

    // users: berkeozten stuA123 stuB123
    const usersInfoData = [
      {
        username: 'berkeozten',
        level: 'beginner',
        credits: 10,
        feedbacks: [
          { dateOfFeed: new Date('2023-08-01'), feedback: 'berkeozten feedback 1' },
          { dateOfFeed: new Date('2023-08-05'), feedback: 'berkeozten feedback 2' },
        ],
      },
      {
        username: 'stuA123',
        level: 'intermediate',
        credits: 8,
        feedbacks: [
          { dateOfFeed: new Date('2023-08-02'), feedback: 'stuA123 feedback 1' },
        ],
      },
      {
        username: 'stuB123',
        level: 'beginner',
        credits: 7,
        feedbacks: [
          { dateOfFeed: new Date('2023-08-03'), feedback: 'stuB123 feedback 1' },
          { dateOfFeed: new Date('2023-08-06'), feedback: 'stuB123 feedback 2' },
          { dateOfFeed: new Date('2023-08-09'), feedback: 'stuB123 feedback 3' },
        ],
      },
    ];

    // Save users to db
    const usersInfo = await UserInfo.create(usersInfoData);

    console.log('UsersInfo created:', usersInfo);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

populateUsersInfo();


// Function to create a booking event
const createBookingEvent = (day, start, end, level, status, location, description, students) => {
  const newBooking = new Booking({
    day: new Date(day),
    start: new Date(start),
    end: new Date(end),
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
const startTime1 = "2023-08-10T10:00:00";
const endTime1 = "2023-08-10T12:00:00";
const level1 = "beginner";
const students1 = [
  { username: "berkeozten", status: 1 },
  { username: "stuB123", status: 1 },
];

createBookingEvent(day1, startTime1, endTime1, level1, "Open", "Court 101", "Intermediate Class 1", students1);

const startTime2 = "2023-08-10T14:00:00";
const endTime2 = "2023-08-10T16:00:00";
const students2 = [
  { username: "stuA123", status: 2 },
];

createBookingEvent(day1, startTime2, endTime2, level1, "Open", "Court 102", "Intermediate Class 2", students2);

// Create three more booking events with different details
const day2 = "2023-08-12";
const startTime3 = "2023-08-12T09:00:00";
const endTime3 = "2023-08-12T11:00:00";
const level2 = "beginner";
const students3 = [
  { username: "berkeozten", status: 1 },
  { username: "stuB123", status: 1 },
];

createBookingEvent(day2, startTime3, endTime3, level2, "Open", "Court 201", "Beginner Class 1", students3);


const day4 = "2023-08-17";
const startTime5 = "2023-08-17T14:30:00";
const endTime5 = "2023-08-17T16:30:00";
const level4 = "beginner";
const students5 = [
  { username: "berkeozten", status: 2 },
  { username: "stuB123", status: 1 },
];

createBookingEvent(day4, startTime5, endTime5, level4, "Open", "Court 202", "Beginner Class 2", students5);