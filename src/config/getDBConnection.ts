import mongoose from "mongoose";

const URLcluster:string|undefined=process.env.MONGODBURL;

const connection=()=>{
    try{
        if(typeof URLcluster!=='undefined')
             mongoose.connect(URLcluster)
        else throw new Error("Cant Connect to Datadase, URL undefined")
    }catch(error){
        console.log(error)
        process.exit(-1)
    }
    const bdConnection=mongoose.connection
    return bdConnection
}

export default connection