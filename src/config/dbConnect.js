import mongoose, { mongo } from "mongoose";

async function connectToMongoDB () {
    mongoose.connect(process.env.MONGO_DB_KEY);
    return mongoose.connection;
};

export default connectToMongoDB;
