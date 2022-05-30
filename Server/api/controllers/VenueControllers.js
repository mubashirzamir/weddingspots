const VenueService = require('../services/VenueServices')
const noError = { status: 0, message: "No error" }

exports.addReview = async function (req, res, next) {
    try {
        const result = await VenueService.addReview(req.body, res.locals.decoded.user_id);

        if (result) {
            return res.status(200).json({ error: noError, data: result, message: "Successfully added review" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}

exports.getReviews = async function (req, res, next) {

    try {
        const reviews = await VenueService.getReviews(req);
        return res.status(200).json({ error: noError, data: reviews, message: "Succesfully reviews retrieved" })
    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}

exports.getVenues = async function (req, res, next) {
    try {

        // findOne
        if (Object.keys(req.query).length === 0 && req.params.venue_id) {
            const venue = await VenueService.findOne(req.params.venue_id);
            return res.status(200).json({ error: noError, data: venue, message: "Successfully venue retrieved" })
        }

        // findAll with search
        else {
            const venues = await VenueService.findAll(req);
            return res.status(200).json({ error: noError, data: venues, message: "Succesfully venues retrieved" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });

    }
}

exports.getVenueContact = async function (req, res, next) {
    try {
        // findOne
        const venue = await VenueService.findOne(req.params.venue_id);
        if (venue) {
            const contact = await VenueService.findContact(venue.user_id);
            return res.status(200).json({ error: noError, data: contact, message: "Successfully contact retrieved" })
        }

        else {
            return res.status(200).json({ error: noError, data: contact, message: "No contact to retrieve" })
        }


    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });

    }
}


exports.book = async function (req, res, next) {


    try {
        const isBook = await VenueService.isBook(req.params.venue_id, req.body.booking_date, req.body.booking_time, res.locals.decoded.user_id);

        if (isBook) {
            return res.status(200).json({ error: noError, data: {}, message: "Already Booked" });
        }

        else {
            const getManager = await VenueService.getManager(req.params.venue_id);
            const getVenue_name = await VenueService.getVenue_name(req.params.venue_id);

            bookInfo = {
                booking_date: req.body.booking_date,
                booking_time: req.body.booking_time,
                venue_id: req.params.venue_id,
                user_id: res.locals.decoded.user_id,
                manager_id: getManager.dataValues.user_id,
                venue_name: getVenue_name.dataValues.name
            }
            const result = await VenueService.book(bookInfo);
            if (result) {
                return res.status(200).json({ error: noError, data: result, message: "Successfully Requested Booking" });
            }
        }


    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}