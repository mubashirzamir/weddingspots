const { venues, users, venue_reviews } = require('../models')
const { Op } = require("sequelize");


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

exports.findAll = async function (req) {
    const { page, size, isFeatured, user_id, city, name, type, max_cap } = req.query;


    var isFeaturedHelper = (isFeatured === 'true')
    var condition_01 = { isDelete: false };
    var condition_02 = isFeatured ? { isFeatured: isFeaturedHelper } : null;
    var condition_03 = user_id ? { user_id: user_id } : null;
    var condition_04 = name ? { name: { [Op.like]: `%${name}%` } } : null;
    var condition_05 = city ? { city: { [Op.like]: `%${city}%` } } : null;
    var condition_06 = type ? { type: { [Op.like]: `%${type}%` } } : null;
    var condition_07 = max_cap ? { max_cap: { [Op.gte]: max_cap } } : null;


    const { limit, offset } = getPagination(page, size);

    const data = await venues.findAndCountAll({
        where: { ...condition_01, ...condition_02, ...condition_03, ...condition_04, ...condition_05, ...condition_06, ...condition_07 },
        attributes: { exclude: ['user_id', 'isDelete', 'createdAt', 'updatedAt'] },
        limit,
        offset
    })
    const result = getPagingData(data, page, limit);
    return result;
};


exports.findOne = async function (venue_id) {
    const venue = await venues.findOne({
        where: { venue_id: venue_id, isDelete: false },
        include: [{ model: users, attributes: ["name", "email"] }]
    });
    return venue;
}

exports.findContact = async function (user_id) {
    const user = await users.findOne({ where: { user_id: user_id, isDelete: false } });
    const contact = {
        name: user.name,
        email: user.email
    }
    return contact;
}

exports.addReview = async function (reviewInfo, user_id) {
    const newReview = venue_reviews.build(reviewInfo);
    newReview.user_id = user_id;
    await newReview.save();
    return newReview;
}

exports.getReviews = async function (req) {
    const { page, size, venue_id } = req.query;
    const { limit, offset } = getPagination(page, size);

    const data = await venue_reviews.findAndCountAll({
        where: { isDelete: false, venue_id: venue_id },
        attributes: { exclude: ['isDelete', 'createdAt', 'updatedAt'] },
        order: [['review_id', 'DESC']],
        limit,
        offset,
        include: [{ model: users, attributes: ["name"] }]
    })

    const result = getPagingData(data, page, limit);
    return result;
};



/*exports.getVenues = async function () {
    const listOfVenues = await venues.findAll({
        where: {
            isDelete: false
        },
        attributes: { exclude: ['user_id', 'isDelete', 'createdAt', 'updatedAt'] }
    });
    return listOfVenues;
}

exports.getSingleVenue = async function (venue_id) {
    const venue = await venues.findOne({ where: { venue_id: venue_id, isDelete: false } });
    if (!venue) {
        throw new Error("No such venue exists");
    }
    return venue;
}*/
