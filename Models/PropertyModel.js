const mongoose = require("mongoose");



const propertySchema = new mongoose.Schema(
    {
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
             ref:"User",
        },
        image:{
            type:String,
            required:true,
        },
        place: {
            type: String,
            required:[true,"Place enter a place"]
        },
        location: {
            type: String,
            required: [true, "Please enter Location."],
        },
        numberOfBedRooms: {
            type: Number,
            required: [true, "Please enter number of bed rooms."],
        },

        numberOfBathRooms: {
            type: Number,
            required: [true, "Please enter number of bath rooms."],
        },
        nearestPlaces: {
            type:[{type:String}],
            required:true
        },
    },
    { timestamps: true },
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
