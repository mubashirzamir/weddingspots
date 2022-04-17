const express = require('express');
const app = express();
const cors = require('cors')

const errorHandler = require('./api/middleware/ErrorHandler')

const db = require('./api/models')

const userRouter = require('./api/routes/UserRoutes.js')
const managerRouter = require('./api/routes/ManagerRoutes.js')
const adminRouter = require('./api/routes/AdminRoutes.js')
const venueRouter = require('./api/routes/VenueRoutes.js')

app.use(cors());
app.use(express.json());

app.use("/api", userRouter)
app.use("/managerAPI", managerRouter)
app.use("/adminAPI", adminRouter)
app.use("/api/venues", venueRouter)

app.use(errorHandler)

db.sequelize.sync().then(() => {
    app.listen(3001, () => console.log('Server is running on port 3001'));
})
