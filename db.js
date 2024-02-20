import mongoose from "mongoose";

export const db = (url) => {
  mongoose.connect(url);
  mongoose.connection.on("connected", () => {
    console.log("Connection open");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Connection error", error);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Connection disconnected");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Connection disconnected app termination");
      process.exit(1);
    });
  });
};
