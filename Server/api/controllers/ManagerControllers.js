const s3 = require('../../s3');
const ManagerService = require('../services/ManagerServices')
const noError = { status: 0, message: "No error" }

exports.createVenue = async function (req, res, next) {
    try {

        const result = await ManagerService.createVenue(req.body, res.locals.decoded.user_id);

        if (result) {
            return res.status(200).json({ error: noError, data: result, message: "Successfully created venue" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

exports.updateVenue = async function (req, res, next) {
    try {

        const result = await ManagerService.updateVenue(req.body, res.locals.decoded.user_id, res.locals.decoded.type);

        if (result) {
            return res.status(200).json({ error: noError, data: result, message: "Successfully updated venue" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

exports.deleteVenue = async function (req, res, next) {
    try {
        const venue = await ManagerService.deleteVenue(req.params.venue_id, res.locals.decoded.user_id, res.locals.decoded.type);

        if (venue) {
            return res.status(200).json({ error: noError, data: venue, message: "Succesfully deleted venue" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

exports.s3URL = async function (req, res, next) {

    try {
        const url = { url: await s3.generateUploadURL() };
        return res.status(200).json({ error: noError, data: url, message: "s3 URL retrieved" });

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}

exports.addImage = async function (req, res, next) {

    try {
        const venue = await ManagerService.addImage(req.body.imageURL, req.params.venue_id, res.locals.decoded.user_id, res.locals.decoded.type);
        if (venue) {
            return res.status(200).json({ error: noError, data: req.body.imageURL, message: "Image added to database" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}

exports.addLocation = async function (req, res, next) {

    try {
        const venue = await ManagerService.addLocation(req.body.lat, req.body.lng, req.params.venue_id, res.locals.decoded.user_id, res.locals.decoded.type);
        if (venue) {
            return res.status(200).json({ error: noError, data: req.body.imageURL, message: "Location added to database" });
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}