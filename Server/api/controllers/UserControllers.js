const UserService = require('../services/UserServices')
const noError = { status: 0, message: "No error" }

exports.login = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
        const email = req.body.email;
        const password = req.body.password;

        const isUser = await UserService.isUser(email);
        if (!isUser) {
            return res.status(400).json({ error: { status: 1, message: "User does not exist" }, data: {}, message: {} });
        }

        else {

            const result = await UserService.login(email, password);

            if (result) {
                return res.status(200).json({ error: noError, data: result, message: "Successfully logged in" });
            }

            else {
                return res.status(400).json({ error: { status: 1, message: "Invalid email address or password" }, data: {}, message: {} });
            }

        }


    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

exports.register = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    try {
        const isUser = await UserService.isUser(req.body.email);

        if (isUser) {
            return res.status(400).json({ error: { status: 1, message: "Email already registered" }, data: {}, message: {} });
        }

        else {
            const result = await UserService.register(req.body);
            if (result) {
                return res.status(200).json({ error: noError, data: result, message: "Successfully registered" });
            }
        }


    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}

exports.getUser = async function (req, res, next) {
    try {
        const user = await UserService.getUser(res.locals.decoded.user_id);
        if (user) {
            return res.status(200).json({ error: noError, data: user, message: "Successfully retrieved user" })
        }
    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}

exports.about = async function (req, res, next) {
    try {
        const info = "A platform where you can find the venue of your choice with one click! Welcome to the world of celebrations"
        return res.status(200).json({ error: noError, data: info, message: "Successfully retrieved info" })
    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}


