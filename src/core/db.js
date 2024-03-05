import mongoose from "mongoose";

const setupDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://adlove03012004:hZmNJ7r0XfSLCg97@freecluster.tufkva2.mongodb.net/todoApp",
      {}
    );
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error", error);
  }
};

export default setupDB;
