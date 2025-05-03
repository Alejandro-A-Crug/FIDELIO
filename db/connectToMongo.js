import mongoose  from "mongoose";

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connection to mongoDB was succesful, well done")
    } catch (error) {
        console.log("could not connect to mongo")
    }
}

export default connectToMongo;