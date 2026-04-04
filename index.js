const express =  require('express')
const userRoutes =  require('./routes/userRoutes')
const dotenv = require('dotenv')
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const cookieParser = require('cookie-parser')
const pretBancaireRoutes = require("./routes/pretBancaireRoutes")

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api", pretBancaireRoutes)

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})