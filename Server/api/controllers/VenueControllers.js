const VenueService = require('../services/VenueServices')
const noError = { status: 0, message: "No error" }

exports.getReviews = async function (req, res, next) {

    try {

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}

exports.addReview = async function (req, res, next) {

    try {

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


/*exports.getVenues = async function (req, res, next) {


    try {
        const venues = await VenueService.getVenues();
        return res.status(200).json({ error: noError, data: { venues: venues }, message: "Succesfully retrieved venues" });

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}

exports.getSingleVenue = async function (req, res, next) {

    try {

        const venue = await VenueService.getSingleVenue(req.params.venue_id);
        if (venue) {
            res.status(200).json({ error: noError, data: venue, message: "Successfully retrieved venue" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}*/
