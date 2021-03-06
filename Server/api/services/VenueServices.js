const { venues, users, venue_reviews, bookings } = require('../models')
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
    const { page, size, isFeatured, user_id, city, name, type, area, min_cap, max_cap, min_price, max_price } = req.query;


    var isFeaturedHelper = (isFeatured === 'true')
    var condition_01 = { isDelete: false };
    var condition_02 = isFeatured ? { isFeatured: isFeaturedHelper } : null;
    var condition_03 = user_id ? { user_id: user_id } : null;
    var condition_04 = name ? { name: { [Op.like]: `%${name}%` } } : null;
    var condition_05 = city ? { city: { [Op.like]: `%${city}%` } } : null;
    var condition_06 = type ? { type: { [Op.like]: `%${type}%` } } : null;
    var condition_07 = area ? { area: { [Op.like]: `%${area}%` } } : null;
    var condition_08 = (min_price && max_price) ? { price_per_head: { [Op.between]: [min_price, max_price] } } : null
    var condition_09 = (min_cap) ? { min_cap: { [Op.gte]: min_cap } } : null
    var condition_10 = (max_cap) ? { max_cap: { [Op.lte]: max_cap } } : null

    const { limit, offset } = getPagination(page, size);

    const data = await venues.findAndCountAll({
        where: { ...condition_01, ...condition_02, ...condition_03, ...condition_04, ...condition_05, ...condition_06, ...condition_07, ...condition_08, ...condition_09, ...condition_10 },
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
        include: [{ model: users, attributes: ["name", "email"], where: { isDelete: false } }]
    });
    return venue;
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
        include: [{ model: users, attributes: ["name"], where: { isDelete: false } }]
    })

    const result = getPagingData(data, page, limit);
    return result;
};


exports.getManager = async function (venue_id) {

    const book = await venues.findOne({
        where: { venue_id: venue_id },
        attributes: {
            exclude: ['venue_id', 'name', 'type', 'halls', 'description', 'latitude', 'longitude',
                'address', 'city', 'area', 'price_per_head', 'min_cap', 'max_cap', 'image_thumb', 'image_gallery',
                'isFeatured', 'isDelete', 'createdAt', 'updatedAt']
        },
    });
    return book

}

exports.getVenue_name = async function (venue_id) {

    const book = await venues.findOne({
        where: { venue_id: venue_id },
        attributes: {
            exclude: ['venue_id', 'user_id', 'type', 'halls', 'description', 'latitude', 'longitude',
                'address', 'city', 'area', 'price_per_head', 'min_cap', 'max_cap', 'image_thumb', 'image_gallery',
                'isFeatured', 'isDelete', 'createdAt', 'updatedAt']
        },
    });
    return book

}

exports.isBook = async function (venue_id, booking_date, booking_time, user_id) {

    const book = await bookings.findOne({
        where: {
            [Op.or]: [{ user_id: user_id }, { status: 'Approved' }],
            venue_id: venue_id,
            booking_date: booking_date,
            booking_time: booking_time,
            isDelete: false,
        }
    });

    if (book) {
        return true;
    }

    else {
        return false;
    }
}


exports.book = async function (bookInfo) {
    newBooking = await bookings.create(bookInfo);
    return newBooking;
}