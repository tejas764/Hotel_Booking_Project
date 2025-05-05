const Listing=require("../models/listing");
const ExpressError = require("../utils/ExpressError"); 
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken="pk.eyJ1IjoidGVqYXNiaDEyMzQiLCJhIjoiY21hOW91bG9tMWlnZDJsc2dmaWwzdGxxZSJ9.rzCyDFfPzGyRh3QYvCJqEw";
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
// stylesService exposes listStyles(), createStyle(), getStyle(), etc.

module.exports.index=(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    });

module.exports.renderNewForm= (req, res) => {
    
    res.render("listings/new.ejs");
};

module.exports.showListings=async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    })
    .populate("owner")
    .setOptions({ strictPopulate: false });

    if(!listing){
        req.flash("error","Listing Does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
    };

module.exports.createListing=async(req,res,next)=>{
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();
    
     
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};

    newListing.geometry=response.body.features[0].geometry;

    await newListing.save();
    req.flash("Success","New listing added");
    res.redirect("/listings/");

};

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing Requested Does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
};


module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data");
    }

    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // If there's a new image uploaded, update it
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", "Listing info updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("Success","Listing deleted Successfully!");
    res.redirect("/listings");
}
