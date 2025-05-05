const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing = require("../models/listing");
const ExpressError=require("../utils/ExpressError.js");

//basic mongoose setup
const url = "mongodb://127.0.0.1:27017/WanderLust";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(url);
}


//initialise databaseS
const initDB=async()=>{
    await Listing.deleteMany({});
    const dataWithOwner = initData.data.map(obj => ({ ...obj, owner: "68149f692eaca13cd3ed1dea" }));
await Listing.insertMany(dataWithOwner);

    console.log("data was initialised");
};
initDB();