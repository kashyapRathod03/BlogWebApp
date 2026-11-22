const mongoose = require("mongoose");

const connectDatabase = async () => {
  const primaryUri = process.env.MONGO_URI;
  const localUri =
    process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/mern-blog";

  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
  };

  if (primaryUri) {
    try {
      await mongoose.connect(primaryUri, connectionOptions);
      console.log("MongoDB Connection Successfully (Atlas/Primary)");
      return;
    } catch (err) {
      console.warn(
        `Primary MongoDB connection failed: ${err.message}. Attempting local MongoDB fallback...`
      );
    }
  }

  try {
    await mongoose.connect(localUri, connectionOptions);
    console.log(`Connected to Local MongoDB Successfully at ${localUri}`);
  } catch (err) {
    console.warn(`Local MongoDB fallback notice: ${err.message}`);
  }
};

module.exports = connectDatabase;
