const { users } = require('../models')
const { accounts } = require('../models')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: venues } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, venues, totalPages, currentPage };
};

exports.login = async function (email, password) {
    const user = await users.findOne({ where: { email: email, isDelete: false } });
    const passMatch = await bcrypt.compare(password, user.password);

    if (user && passMatch) {
        const theToken = jwt.sign({ user_id: user.user_id, type: user.type }, 'the-super-strong-secret', { expiresIn: '1h' });
        return {
            user,
            theToken
        };

    }
}

exports.isUser = async function (email) {
    const user = await users.findOne({ where: { email: email, isDelete: false } });

    if (user) {
        return true;
    }

    else {
        return false;
    }
}

exports.register = async function (userInfo) {
    userInfo.password = await bcrypt.hash(userInfo.password, 12);
    newUser = await users.create(userInfo);
    return newUser;
}

exports.getUser = async function (user_id) {
    const user = await users.findOne({ where: { user_id: user_id } });
    return user;
}

/*exports.getFeaturedVenues = async function (req) {
    const { page, size } = req.query;
    var condition_01 = { isDelete: false };
    const { limit, offset } = getPagination(page, size);

    venues.hasMany(featured_venues, { foreignKey: 'venue_id' })
    featured_venues.belongsTo(venues, { foreignKey: 'venue_id' })

    const data = await venues.findAndCountAll({
        include: [{
            model: featured_venues,
            required: true,
            where: { ...condition_01 },
            attributes: ['featured_id']
        }],
        attributes: { exclude: ['user_id', 'isDelete', 'createdAt', 'updatedAt'] },
        limit,
        offset
    })

    const result = getPagingData(data, page, limit);
    return result;
}*/

/*exports.getFeaturedVenues = async function () {
    venues.hasMany(featured_venues, { foreignKey: 'venue_id' })
    featured_venues.belongsTo(venues, { foreignKey: 'venue_id' })

    const featured_list = await venues.findAll({
        include: [{
            model: featured_venues,
            required: true,
            where: { isDelete: false },
            attributes: ['featured_id']
        }],
        attributes: { exclude: ['user_id', 'isDelete', 'createdAt', 'updatedAt'] }
    })

    return featured_list;
}*/

