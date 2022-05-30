const express = require('express');
const app = express();

const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();
const passportSetup = require('./passport');
const db = require('./api/models');

const PORT = process.env.PORT;

const errorHandler = require('./api/middleware/ErrorHandler')

const userRouter = require('./api/routes/UserRoutes.js')
const managerRouter = require('./api/routes/ManagerRoutes.js')
const adminRouter = require('./api/routes/AdminRoutes.js')
const venueRouter = require('./api/routes/VenueRoutes.js');
const socialRouter = require('./api/routes/SocialRoutes.js');

app.use(cookieSession({
    name: "session",
    keys: ["weddingspots"],
    maxAge: 24 * 60 * 60 * 100,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

app.use("/api", userRouter)
app.use("/managerAPI", managerRouter)
app.use("/adminAPI", adminRouter)
app.use("/api/venues", venueRouter)
app.use("/api/social", socialRouter)

app.use(errorHandler)

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || PORT, () => console.log(`Server is running on port ${PORT}`))
})
