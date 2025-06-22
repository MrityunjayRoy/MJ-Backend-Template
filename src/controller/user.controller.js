import { User } from "../models/user.model.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCLoudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}


const userRegister = asyncHandler(async (req, res) => {

    const { fullName, email, username, password } = req.body

    if ([fullName, email, username, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All field are required")
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "User alreasy exists")
    }

    const avatarLocal = req.files?.avatar[0]?.path;

    const coverImageLocal = req.files?.coverImage[0]?.path;

    if (!avatarLocal) {
        throw new ApiError(409, "Avatar is required")
    }

    const avatar = await uploadOnCLoudinary(avatarLocal);

    const coverImage = await uploadOnCLoudinary(coverImageLocal);

    if (!avatar) {
        throw new ApiError(409, "Avatar is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createduser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createduser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, "User created successfully!", createduser)
    )

})

const loginUser = asyncHandler(async (req, res) => {
    // req-body -> data
    // username or email
    // find the user
    // password check
    // access and refreshToken 
    // send cookies

    const { email, username, password } = req.body

    if (!username && !email) {
        throw new ApiError(404, "Email or username is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exists")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(404, "Password is invalid")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "User logged in successfully",
                {
                    user: loggedInUser, accessToken, refreshToken
                }
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(
            new ApiResponse(200, "User logged out successfully")
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(404, "No access token detected")
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?.id)

    if (!user) {
        throw new ApiError(401, "Invalid refrsh token")
    }

    if (!incomingRefreshToken == user?.refreshToken) {
        throw new ApiError(401, "Refresh token is either expired or used")
    }

    const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)

    options = {
        httpOnly: true,
        scure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", newRefreshToken)
    .json(
        new ApiResponse(200, "Access token refreshed successfully", {accessToken, newRefreshToken})
    )
})

export {
    userRegister,
    loginUser,
    logoutUser
}