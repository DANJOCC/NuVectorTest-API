import mongoose from "mongoose";

const URLcluster:string="mongodb+srv://Danjocc:Djcc27998876@nuvectortest.xxjifb6.mongodb.net/NuVectorTest?retryWrites=true&w=majority";

const connection=()=>{
     mongoose.connect(URLcluster)
    const bdConnection=mongoose.connection
    return bdConnection
}

export default connection