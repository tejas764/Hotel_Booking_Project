const express=require ("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
const {isLoggedIn,isOwner,isReviewOwner}=require("../middleware.js");

const reviewController=require("../controllers/review.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

  
//Review route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

//Delete review
router.delete("/:reviewId",isLoggedIn,isReviewOwner, wrapAsync(reviewController.destroyReview));

module.exports=router;