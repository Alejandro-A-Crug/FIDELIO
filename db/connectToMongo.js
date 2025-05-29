import mongoose  from "mongoose";
//se espera a que mongoose se conecte a mongoDB, el paquete dotenv esta en el archivo server, se usa la url en el archivo env
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connection to mongoDB was succesful, well done")
    } catch (error) {
        console.log("could not connect to mongo")
    }
}

export default connectToMongo;