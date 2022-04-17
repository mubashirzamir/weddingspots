const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {

    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return res.status(401).json({ error: { status: 1, message: "Please provide token" }, data: {}, message: {} })
    }

    try {

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secret');

        if (theToken) {
            res.locals.decoded = decoded
            next();
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }

}

const permitAdmin = (req, res, next) => {
    try {

        if (res.locals.decoded.type < 3) {
            return res.status(403).json({ error: { status: 1, message: "Insufficient privileges (Admin API)" }, data: {}, message: {} });
        }

        else {
            next();
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}


const permitManager = (req, res, next) => {
    try {

        if (res.locals.decoded.type < 2) {
            return res.status(403).json({ error: { status: 1, message: "Insufficient privileges (Manager API)" }, data: {}, message: {} });
        }

        else {
            next();
        }

    } catch (e) {
        return res.status(400).json({ error: { status: 1, message: e.message }, data: {}, message: {} });
    }
}




module.exports = { validateToken, permitAdmin, permitManager };