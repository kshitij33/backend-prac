import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            // whenever we have to add searching field for any data we need to set index to true
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url will be used
            required: true
        },
        coverImage: {
            type: String, // cloudinary url will be used
            required: true,
        },
        watchHistory: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken:{
            type: String,
        }
    },
    {
        timestamps: true
    }
)

// userSchema.pre("save", () => {}) // do not use callback using this syntax () => {}
// arrow function me this ka reference nhi hota || context pata nahi hota
// error, req, res, next
// since it is a middleware, next ka access hona hi chahiye
// sabse end me is next ko call karna padta hai taki use flag ko pass kar sake
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
}) 

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// both access and refresh tokens are JWT tokens -- difference lies in usage
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        // payload
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        // payload
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
