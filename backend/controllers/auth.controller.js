const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/generateJWT");
const bcryptjs = require("bcryptjs");
const mongoSanitize = require("mongo-sanitize");

exports.login = asyncHandler(async (req, res, next) => {
    const sanitizedBody = mongoSanitize(req.body);

    const {email, password} = sanitizedBody;

    let user = await User.findOne({email}).select("+password");

    if (!user || !bcryptjs.compare(password, user.password)) {
        const error = AppError.create("Invalid Email or Password!", 401);
        return next(error);
    } else {

        user = user.toObject();
        // Hide Password & rePassword from the response
        delete user.password;
        const token = await generateJWT({email: user.email, _id: user._id,role:user.role});

        res.status(200).json({
            status: "success", message: "User Logged In Successfully!", data: {
                token,
                user
            },
        });
    }
});

exports.register = asyncHandler(async (req, res, next) => {
    const sanitizedBody = mongoSanitize(req.body);

    const {username, email, password} = sanitizedBody;

    const isExists = await User.findOne({email});
    if (isExists) {
        const error = AppError.create("User Already Exists!", 400);
        return next(error);
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    let user = new User({
        username, email, password: hashedPassword,
    });

    // Generate Token

    await user.save();

    user = user.toObject();
    // Hide Password & rePassword from the response
    delete user.password;
    const token = await generateJWT({email:user.email, _id:user._id, role:user.role});

    res.status(201).json({
        status: "success", data: {
            user, token,
        },
    });
});
