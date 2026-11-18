const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB Connection Successfully (Atlas/Primary)");
  } catch (err) {
    console.warn(
      `Primary MongoDB connection failed: ${err.message}. Attempting local MongoDB fallback...`
    );
    const localUri =
      process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/mern-blog";
    await mongoose.connect(localUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
    });
    console.log(`Connected to Local MongoDB Successfully at ${localUri}`);
  }
};

module.exports = connectDatabase;
