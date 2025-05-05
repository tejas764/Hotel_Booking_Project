
const User=require("../models/user.js");


module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("Success","Welcome To WanderLust");
        res.redirect("/listings")
    })
    
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("Success","Welcome Back to WanderLust");
    let resRedirect=res.locals.redirectUrl||"/listings"
    res.redirect(resRedirect);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if (err){
            return next(err);
        }
        req.flash("Success","You are logged out now");
        res.redirect("/listings");
    });
}