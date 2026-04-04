const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const generateTokens = require("../utils/generateTokens")

// REGISTER
const register = async (request, response) => {
    const { name, email, password } = request.body
    try {
        // Check existing email
        const users = await userModel.getUserByEmail(email)
        if (users.length > 0) {
            return response.status(400).send("Email exists")
        }
        // Create user
        const user = await userModel.createUser(name, email, password)
        response.status(201).json(user)
    } catch (error) {
        console.error(error);
        response.status(500).send("Register error")
    }
}

// LOGIN with Refresh Token
const login = async (request, response) => {
    const { email, password } = request.body

    try {
        const users = await userModel.getUserByEmail(email)

        if (users.length === 0) {
            return response.status(404).send("User not found")
        }

        const user = users[0]

        // Check password
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return response.status(401).send("Wrong password")
        }

        const tokens = generateTokens(user)

        const accessToken = tokens.accessToken

        const refreshToken = tokens.refreshToken

        // Save refresh
        await userModel.saveRefreshToken(user.id, refreshToken)
        
        // Send cookies
        response.cookie(
            "accessToken", 
            accessToken, 
            {
                httpOnly:true,
                maxAge:15*60*1000
            }
        )

        response.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly:true,
                maxAge:7*24*60*60*1000
            }
        )

        response.json({message:"Login success"})
    } catch (error) {
        console.error(error);
        response.status(500).send("Login error")
    }
}

const refreshToken = async (request, response) => {
    const token = request.cookies.refreshToken

    if (!token) {
        return response.status(401).send("No refresh token")
    }

    try {
        const user = jwt.verify(
            token,
            process.env.REFRESH_SECRET
        )

        const users = await userModel.getUserById(user.id)

        const dbUser = users[0]

        console.log(dbUser);

        const tokens = generateTokens(dbUser)

        await userModel.saveRefreshToken(
            dbUser.id,
            tokens.refreshToken
        )

        response.cookie(
            "accessToken",
            tokens.accessToken,
            {
                httpOnly:true,
                maxAge:15*60*1000
            }
        )

        response.cookie(
            "refreshToken",
            tokens.refreshToken,
            {
                httpOnly:true,
                maxAge:7*24*60*60*1000
            }
        )

        response.json({
            message:"Token refreshed"
        })
    } catch (error) {
        return response.status(403).send("Invalid refresh token")
    }
}

const logout = (request, response) => {
    response.clearCookie("accessToken")
    response.clearCookie("refreshToken")
    response.send("Logged out")
}

module.exports = {
    register,
    login,
    refreshToken,
    logout
}