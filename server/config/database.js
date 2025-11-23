// Importing mongoose, a library that helps in connecting and working with MongoDB easily
const mongoose = require("mongoose");

// Creating an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    /* 
      Trying to connect to MongoDB using the connection string from the environment variable.
      process.env.MONGO_URI means it's reading the MongoDB URL stored securely in the .env file.
    */
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Using new URL parser to handle connection strings better (recommended by Mongoose)
      useNewUrlParser: true,
      // Using new server discovery and monitoring engine for better performance
      useUnifiedTopology: true
    });

    /* 
      If connection is successful, logging a success message 
      with the database host name to confirm the connection.
    */
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    /* 
      Catching any error that happens during the connection process 
      and printing it on the console for debugging.
    */
    console.error("MongoDB Connection Error:", error.message);

    /* 
      Exiting the process with a failure code (1) 
      so the app doesn’t keep running without a database connection.
    */
    process.exit(1);
  }
};

// Exporting the function so other files can use it to connect to the database
module.exports = connectDB;
