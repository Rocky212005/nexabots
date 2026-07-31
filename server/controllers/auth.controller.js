const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")

const RefreshToken = require("../models/RefreshToken.model")
const Token = require('../utils/generateTokens')






async function register(req, res) {

    try {

        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

async function login(req, res) {


    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user)
            return res.status(404).json({
                message: "User not found",
            });

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match)
            return res.status(401).json({
                message: "Invalid credentials",
            });

        const accessToken =Token.generateAccessToken(
            user._id
        );
        // console.log("Access Token:", accessToken) ;
        // console.log("Decoded:", jwt.decode(accessToken));
        const refreshToken = Token.generateRefreshToken(
            user._id
        );

        await RefreshToken.create({
            user: user._id,
            token: refreshToken,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.json({
            accessToken,
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }


}

async function logout(req,res) {
      const token = req.cookies.refreshToken;

  await RefreshToken.deleteOne({
    token,
  });

  res.clearCookie("refreshToken");

  res.json({
    message: "Logged out",
  });

}

module.exports = { register, login, logout }