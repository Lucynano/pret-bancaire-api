const jwt = require("jsonwebtoken")

const authenticateToken = (request, response, next) => {
    const token = request.cookies.accessToken

    if (!token) {
        return response.status(401).send("Access denied")
    }

    try {
        const user = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        request.user = user

        next()
    } catch (error) {
        return response.status(403).send("Invalid token")
    }
}

module.exports = authenticateToken