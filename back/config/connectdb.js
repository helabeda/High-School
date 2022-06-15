const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    console.log("successfully connected db");
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = connectdb;
