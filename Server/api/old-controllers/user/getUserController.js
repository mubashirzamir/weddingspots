const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.getUser = async (req, res, next) => {

    try {

        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secret');

        const [row] = await conn.execute(
            "SELECT `id`,`name`,`email` FROM `users` where `id` = ?",
            [decoded.id]
        );

        if (row.length > 0) {
            return res.json({
                id: row[0].id,
                name: row[0].name,
                email: row[0].email
            });
        }

        res.json({
            message: "No user found"
        });

    }
    catch (err) {
        next(err);
    }
}