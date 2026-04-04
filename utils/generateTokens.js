const jwt = require("jsonwebtoken");

const generateTokens = (user) => {
    // ACCESS TOKEN
    const accessToken = jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        { expiresIn:"15m" }
    )
    
    // REFRESH TOKEN
    const refreshToken = jwt.sign(
        { id:user.id },
        process.env.REFRESH_SECRET,
        { expiresIn:"7d" }
    )

    return { accessToken, refreshToken }
}

module.exports = generateTokens