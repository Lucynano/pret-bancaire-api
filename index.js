const express =  require('express')
const userRoutes =  require('./routes/userRoutes')
const dotenv = require('dotenv')
const cors = require("cors")

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/api", userRoutes)

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})