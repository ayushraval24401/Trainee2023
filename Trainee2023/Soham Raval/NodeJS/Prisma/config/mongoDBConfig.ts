import * as Mongoose from 'mongoose';
import * as dotenv from "dotenv";

export default new class MongoDBConnection{
    async databaseConnect()
    {
        dotenv.config()
        const mongoURL=process.env.DB_CONN_STRING;
        Mongoose.connect(mongoURL as string)
        .then(()=>
            console.log("mongodb connect"))
        .catch(err=>console.log(err));

    }
}