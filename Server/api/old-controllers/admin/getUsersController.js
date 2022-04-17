const jwt = require('jsonwebtoken');
const conn = require('../../dbConnection').promise();

exports.getUsers = async (req, res, next) => {

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

        const [prow] = await conn.execute(
            "SELECT `user_type` FROM `users` where `id` = ?",
            [decoded.id]
        );

        if (prow[0].user_type != "3") {
            return res.json({
                message: "Unauthorized action"
            });
        }

        const [row] = await conn.execute(
            "SELECT `id`,`name`,`email`, `user_type` FROM `users`",
        );

        if (row.length > 0) {
            return res.json({
                user: row
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