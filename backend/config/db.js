const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewURLParser: true,
    });

    await mongoose.connection;
    console.log(`MongoDB Connected`);
  } catch (err) {
    const error = new Error(err);
    console.error(error);
  }
};