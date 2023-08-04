const mongoose = require('mongoose');
const UserInfo = require('../models/userInfo');

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