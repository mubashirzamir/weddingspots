const { venues, bookings, users } = require('../models')

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, items, totalPages, currentPage };
};

exports.createVenue = async function (venueInfo, user_id) {
    const newVenue = venues.build(venueInfo);
    newVenue.user_id = user_id;

    newVenue.image_thumb = 'https://weddingspots.s3.amazonaws.com/909f928f0b07399e43a54f045bcbb7a5';
    newVenue.latitude = "24.941985222562053"
    newVenue.longitude = "67.11435194116635"

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

exports.addLocation = async function (lat, lng, venue_id, user_id, type) {

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
        venue.latitude = lat;
        venue.longitude = lng;
        await venue.save();
    }

    return venue;

}

exports.getUser = async function (user_id) {
    const user = await users.findOne({ where: { user_id: user_id } });
    return user;
}

exports.getManagerBookings = async function (user_id, req) {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    const data = await bookings.findAndCountAll({
        where: { manager_id: user_id, isDelete: false },
        limit,
        offset
    })

    const result = getPagingData(data, page, limit);
    return result;
}

exports.approveBooking = async function (booking_id, user_id, type) {
    console.log('hi')
    const booking = await bookings.findOne({ where: { booking_id: booking_id, isDelete: false } });

    if (!booking) {
        throw new Error("The booking you are trying to approve does not exist");
    }

    if (type != 3) {
        if (booking.manager_id != user_id) {
            throw new Error("Insufficient privileges to approve booking");
        }
    }

    if (booking) {
        booking.status = 'Approved'
        await booking.save();
    }

    return booking;

}

exports.refuseBooking = async function (booking_id, user_id, type) {

    const booking = await bookings.findOne({ where: { booking_id: booking_id, isDelete: false } });

    if (!booking) {
        throw new Error("The booking you are trying to refuse does not exist");
    }

    if (type != 3) {
        if (booking.manager_id != user_id) {
            throw new Error("Insufficient privileges to refuse booking");
        }
    }

    if (booking) {
        booking.status = 'Refused'
        await booking.save();
    }

    return booking;

}