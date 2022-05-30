const { users, venues, bookings } = require('../models')

exports.deleteUser = async function (user_id) {

    const user = await users.findOne({ where: { user_id: user_id, isDelete: false } });

    if (user) {
        user.isDelete = true
        await user.save();
    }

    return user;

}

exports.toggleFeaturedVenue = async function (venue_id) {
    const venue = await venues.findOne({ where: { venue_id: venue_id, isDelete: false } });

    if (venue) {

        if (venue.isFeatured) {
            venue.isFeatured = false
            await venue.save();
        }

        else {
            venue.isFeatured = true
            await venue.save();
        }

    }

    return venue;
}

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

exports.findAllUsers = async function (req) {
    const { page, size } = req.query;

    var condition_01 = { isDelete: false };

    const { limit, offset } = getPagination(page, size);

    const data = await users.findAndCountAll({
        where: { ...condition_01 },
        attributes: { exclude: ['password', 'isDelete', 'createdAt', 'updatedAt'] },
        limit,
        offset
    })
    const result = getPagingData(data, page, limit);
    return result;
};


exports.findOneUser = async function (user_id) {
    const user = await users.findOne({ where: { user_id: user_id, isDelete: false }, attributes: { exclude: ['password', 'isDelete', 'createdAt', 'updatedAt'] }, });
    return user;
}


exports.updateUser = async function (userInfo) {
    const user = await users.findOne({ where: { user_id: userInfo.user_id, isDelete: false } });

    if (!user) {
        throw new Error("The user you are trying to update does not exist");
    }


    Object.assign(user, userInfo);
    await user.save();
    return user;
}

exports.getAdminBookings = async function (req) {
    const { page, size } = req.query;

    var condition_01 = { isDelete: false };

    const { limit, offset } = getPagination(page, size);

    const data = await bookings.findAndCountAll({
        where: { ...condition_01 },
        order: [['booking_id', 'DESC']],
        include: [{ model: users, attributes: ["name", "email"], where: { isDelete: false } }],
        limit,
        offset
    })

    const result = getPagingData(data, page, limit);
    return result;
}


exports.rejectBooking = async function (booking_id, user_id, type) {

    const booking = await bookings.findOne({ where: { booking_id: booking_id, isDelete: false } });

    if (!booking) {
        throw new Error("The booking you are trying to reject does not exist");
    }

    if (type != 3) {
        if (booking.manager_id != user_id) {
            throw new Error("Insufficient privileges to reject booking");
        }
    }

    if (booking) {
        booking.status = 'Admin rejected'
        await booking.save();
    }

    return booking;

}
