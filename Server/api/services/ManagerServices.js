const { venues } = require('../models')

exports.createVenue = async function (venueInfo, user_id) {
    const newVenue = venues.build(venueInfo);
    newVenue.user_id = user_id;
    newVenue.image_thumb = 'placeholder';
    await newVenue.save();
    return newVenue;
}

exports.updateVenue = async function (venueInfo, user_id, type) {
    const venue = await venues.findOne({ where: { venue_id: venueInfo.venue_id, isDelete: false } });

    if (!venue) {
        throw new Error("The venue you are trying to update does not exist");
    }

    if (type != 3) {
        if (venue.user_id != user_id) {
            throw new Error("Insufficient privileges to update venue");
        }
    }

    Object.assign(venue, venueInfo);
    await venue.save();
    return venue;
}

exports.deleteVenue = async function (venue_id, user_id, type) {

    const venue = await venues.findOne({ where: { venue_id: venue_id, isDelete: false } });

    if (!venue) {
        throw new Error("The venue you are trying to delete does not exist");
    }

    if (type != 3) {
        if (venue.user_id != user_id) {
            throw new Error("Insufficient privileges to delete venue");
        }
    }

    if (venue) {
        venue.isDelete = true
        await venue.save();
    }

    return venue;

}

exports.addImage = async function (imageURL, venue_id, user_id, type) {

    const venue = await venues.findOne({ where: { venue_id: venue_id, isDelete: false } });

    if (!venue) {
        throw new Error("The venue you are trying to add an image to does not exist");
    }

    if (type != 3) {
        if (venue.user_id != user_id) {
            throw new Error("Insufficient privileges to add image to venue");
        }
    }

    if (venue) {
        venue.image_thumb = imageURL;
        await venue.save();
    }

    return venue;

}