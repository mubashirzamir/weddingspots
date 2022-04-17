const jwt = require('jsonwebtoken');
const conn = require('../../dbConnection').promise();

exports.removeFeaturedVenue = async (req, res, next) => {

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
            "SELECT `isDelete` FROM `featured_venues` where `featured_id` = ?",
            [req.body.featured_id]
        );

        if (row.length > 0 && row[0].isDelete === 1) {
            return res.json({
                message: "Venue is already removed from featured venues",
            });
        }

        const [rows] = await conn.execute('UPDATE `featured_venues` SET `isDelete`= true WHERE `featured_id` = ?', [
            req.body.featured_id
        ]);

        if (rows.changedRows === 1) {
            return res.json({
                message: "Venue removed from featured venues",
            });
        }

        res.json({
            message: "Could not remove venue from featured venues"
        });

    }
    catch (err) {
        next(err);
    }
}