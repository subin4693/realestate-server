const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const User = require("../Models/UserModel")
 
const asyncErrorHandler = require("../Utils/AsyncErrorHandler");
const CustomError = require("../Utils/CustomError");
const Property = require("../Models/PropertyModel");

exports.createnewProperty = asyncErrorHandler(async (req, res, next) => {
    console.log("********************************************************88")
    const {image,place,location,numberOfBedRooms,numberOfBathRooms ,nearestPlaces  } =  req.body;
 
    const newProperty = await Property.create({image,place,location,numberOfBedRooms,numberOfBathRooms ,nearestPlaces,sellerId:req.body.user.id  });
   
    console.log(newProperty);
   

     res.status(201).json({
        status: "success",

        data: {
            propertys: newProperty,
        },
    });
});

exports.deleteProperty = asyncErrorHandler(async (req, res, next) => {
 
    const propertyId = req.params.id;
    const userid = req.body.user.id;
    console.log(propertyId)
    console.log(userid)


    const property = await Property.findById(propertyId);

    if(property.sellerId != userid){
        const error = new CustomError("Only owner can delete a property",400);
        next(error);
    }

    await Property.findByIdAndDelete(propertyId)
 
    
    return res.status(201).json({
        status: "success",

        data: {
           message:"deleted successfully"
        },
    });
});

exports.editProperty = asyncErrorHandler(async (req, res, next) => {
 
    const propertyId = req.params.id;
    const userid = req.body.user.id;
   


    const property = await Property.findById(propertyId);

    if(property.sellerId != userid){
        const error = new CustomError("Only owner can delete a property",400);
        next(error);
    }

    const updatedproperty = await Property.findByIdAndUpdate(propertyId,req.body)
 
    
    return res.status(201).json({
        status: "success",

        data: {
           property: updatedproperty
        },
    });
});

exports.updatedproperty = asyncErrorHandler(async (req, res, next) => {
 
    const propertyId = req.params.id;
    const userid = req.body.user.id;
   


    const property = await Property.findById(propertyId);

    if(property.sellerId != userid){
        const error = new CustomError("Only owner can delete a property",400);
        next(error);
    }

    const updatedproperty = await Property.findByIdAndUpdate(propertyId,req.body)
 
    
    return res.status(201).json({
        status: "success",

        data: {
           property: updatedproperty
        },
    });
});


exports.getPropertyForDashboard = asyncErrorHandler(async(req,res,next)=>{
    console.log("function called")
    const userid = req.body.user.id;

 

    const propertyes = await Property.find({sellerId: userid})
    console.log(propertyes)
    return res.status(200).json({
        status: "success",
        data:{
            propertyes
        }
    })
})

exports.getAllPropertys = asyncErrorHandler(async (req, res, next) => {
 
    const { page = 1, limit = 10, location, place, minBedRooms, maxBedRooms, minBathRooms, maxBathRooms,search } = req.query;

    const filter = {};

    if (location) {
        filter.location = location;
    }

    if (place) {
        filter.place = place;
    }

    if (minBedRooms || maxBedRooms) {
        filter.numberOfBedRooms = {};
        if (minBedRooms) {
            filter.numberOfBedRooms.$gte = Number(minBedRooms);
        }
        if (maxBedRooms) {
            filter.numberOfBedRooms.$lte = Number(maxBedRooms);
        }
    }

    if (minBathRooms || maxBathRooms) {
        filter.numberOfBathRooms = {};
        if (minBathRooms) {
            filter.numberOfBathRooms.$gte = Number(minBathRooms);
        }
        if (maxBathRooms) {
            filter.numberOfBathRooms.$lte = Number(maxBathRooms);
        }
    }

    if (search) {
        const searchRegex = new RegExp(search, 'i'); // 'i' for case insensitive
        filter.$or = [
            { place: searchRegex },
            { location: searchRegex },
            { nearestPlaces: searchRegex }
        ];
    }

    const properties = await Property.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .exec();

    const count = await Property.countDocuments(filter);

    return res.status(201).json({
        status: "success",

        data: {
            properties,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            totalProperties: count,
        },
    });
});



exports.getSingleProperty = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;

    const property = await Property.findById(id);

    res.status(200).json({
        status: "success",
        data:{
            property
        }
    })
})