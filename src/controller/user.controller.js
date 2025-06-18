import { asyncHandler } from "../utils/asyncHandler.js";

const userRegister = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exsits
    // check for images
    // check for avatar
    // upload to cloudinary
    // create user object
    // create user in db
    // remove password and refresh token field
    // check for user creation
    // return res

    const {fullName, email, username, password} = req.body
    console.log("email:" ,email);
})

export { userRegister }