import mongoose from "mongoose";
const connectDb = async () => {
  mongoose.connection.on("connected", () =>
    console.log(mongoose.connection.name)
  );
  await mongoose.connect(`${process.env.MONGO_URI}/prescripto`);
};

export default connectDb;
