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
        const theToken = jwt.sign({ user_id: user.user_id, type: user.type }, 'the-super-strong-secret', { expiresIn: '24h' });
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

exports.updateProfile = async function (userInfo) {
    const user = await users.findOne({ where: { user_id: userInfo.user_id, isDelete: false } });

    if (!user) {
        throw new Error("The user you are trying to update does not exist");
    }


    Object.assign(user, userInfo);
    await user.save();
    return user;
}
