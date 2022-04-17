const { users } = require('../models')
const { venues } = require('../models')

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
    const { count: totalItems, rows: users } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, users, totalPages, currentPage };
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
        throw new Error("The venue you are trying to update does not exist");
    }


    Object.assign(user, userInfo);
    await user.save();
    return user;
}

/*exports.getUsers = async function () {
    const listOfUsers = await users.findAll({ where: { isDelete: false } });
    return listOfUsers;
}*/

/*exports.addFeaturedVenue = async function (venue_id) {
    const [featured_venue, created] = await featured_venues.findOrCreate({
        where: { venue_id: venue_id, isDelete: false },
        defaults: {
            venue_id: venue_id
        }
    });

    return [featured_venue, created];
}


exports.deleteFeaturedVenue = async function (featured_id) {

    const featured_venue = await featured_venues.findOne({ where: { featured_id: featured_id, isDelete: false } });

    if (featured_venue) {
        featured_venue.isDelete = true
        await featured_venue.save();
    }

    return featured_venue;

}*/