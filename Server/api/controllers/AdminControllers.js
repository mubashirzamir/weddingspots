const AdminService = require('../services/AdminServices')
const noError = { status: 0, message: "No error" }

exports.getUsers = async function (req, res, next) {
    try {

        // findOne
        if (Object.keys(req.query).length === 0 && req.params.user_id) {
            const user = await AdminService.findOneUser(req.params.user_id);
            return res.status(200).json({ error: noError, data: user, message: "Successfully user retrieved" })
        }

        // findAll with search
        else {
            const users = await AdminService.findAllUsers(req);
            return res.status(200).json({ error: noError, data: users, message: "Succesfully users retrieved" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });

    }
}

exports.deleteUser = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
        const user = await AdminService.deleteUser(req.params.user_id)

        if (user.type === 3) {
            return res.status(400).json({ error: { status: 1, message: "Admin can not be deleted" }, data: {}, message: {} })
        }

        if (user) {
            return res.status(200).json({ error: noError, data: user, message: "Succesfully deleted user" });
        }

        else {
            return res.status(400).json({ error: { status: 1, message: "User does not exist" }, data: {}, message: {} })
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}


exports.updateUser = async function (req, res, next) {
    try {

        const result = await AdminService.updateUser(req.body);

        if (result) {
            return res.status(200).json({ error: noError, data: result, message: "Successfully updated user" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

exports.toggleFeaturedVenue = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
        const venue = await AdminService.toggleFeaturedVenue(req.params.venue_id)

        if (venue) {
            return res.status(200).json({ error: noError, data: venue, message: "Succesfully toggled featured venue" });
        }

        else {
            return res.status(400).json({ error: { status: 1, message: "Venue does not exist" }, data: {}, message: {} })
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}

exports.getBookings = async function (req, res, next) {
    try {

        const booking = await AdminService.getAdminBookings(req);
        return res.status(200).json({ error: noError, data: booking, message: "Successfully retrieved booking" })


    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });

    }
}

exports.rejectBooking = async function (req, res, next) {
    try {
        const booking = await AdminService.rejectBooking(req.params.booking_id, res.locals.decoded.user_id, res.locals.decoded.type);

        if (booking) {
            return res.status(200).json({ error: noError, data: booking, message: "Succesfully rejected booking" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

