const { venues, users, bookings, reset_tokens } = require('../models')
const { Op } = require("sequelize");
var Sequelize = require('sequelize');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const transport = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

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

exports.getUserBookings = async function (user_id, req) {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    const data = await bookings.findAndCountAll({
        where: { user_id: user_id, isDelete: false },
        order: [['booking_id', 'DESC']],
        include: [{ model: venues, attributes: ["name"], where: { isDelete: false } }],
        limit,
        offset

    })

    const result = getPagingData(data, page, limit);
    return result;
}


exports.forgotStuff = async function (req) {
    try {
        await reset_tokens.update(
            { used: 1 },
            { where: { email: req.body.email } }
        )


        //Create a random reset token
        var fpSalt = crypto.randomBytes(64).toString('base64');

        //token expires after one hour
        var expireDate = new Date(new Date().getTime() + (60 * 60 * 1000))

        await reset_tokens.create({
            email: req.body.email,
            expiration: expireDate,
            token: fpSalt,
            used: 0
        });

        const message = {
            from: process.env.SENDER_ADDRESS,
            to: req.body.email,
            replyTo: process.env.REPLYTO_ADDRESS,
            subject: process.env.FORGOT_PASS_SUBJECT_LINE,
            text: 'To reset your password, please click the link below.\n\nhttps://' + process.env.DOMAIN + '/ResetPassword?token=' + encodeURIComponent(fpSalt) + '&email=' + req.body.email
        };

        //send email
        transport.sendMail(message, function (err, info) {
            if (err) { }
            else { }
        });


        return true

    } catch (e) {
        return false
    }


}

exports.resetStuff = async function (req) {
    try {

        await reset_tokens.destroy({
            where: {
                expiration: { [Op.lt]: Sequelize.fn('CURDATE') },
            }
        });

        //find the token
        var record = await reset_tokens.findOne({
            where: {
                email: req.query.email,
                expiration: { [Op.gt]: Sequelize.fn('CURDATE') },
                token: req.query.token,
                used: 0
            }
        });

        if (record == null) {
            return false
        }

        var upd = await reset_tokens.update({
            used: 1
        },
            {
                where: {
                    email: req.body.email
                }
            });

        req.body.password = await bcrypt.hash(req.body.password, 12);

        await users.update({
            password: newPassword,
            salt: newSalt
        },
            {
                where: {
                    email: req.body.email
                }
            });
        return true

    } catch (e) {
        return false
    }


}