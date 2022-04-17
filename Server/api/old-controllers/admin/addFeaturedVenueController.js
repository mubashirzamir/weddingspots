const jwt = require('jsonwebtoken');
const conn = require('../../dbConnection').promise();

exports.addFeaturedVenue = async (req, res, next) => {

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

        const [xrow] = await conn.execute(
            "SELECT `isDelete` FROM `featured_venues` where `venue_id` = ?",
            [req.body.venue_id]
        );

        if (xrow.length > 0 && xrow[0].isDelete === 0) {
            return res.json({
                message: "Venue is already currently featured",
            });
        }


        const [rows] = await conn.execute('INSERT INTO `featured_venues`(`venue_id`) VALUES(?)', [
            req.body.venue_id
        ]);

        if (rows.affectedRows === 1) {
            return res.json({
                featured_id: rows.insertId
            });
        }

        res.json({
            message: "Could not add venue to featured venues"
        });

    }
    catch (err) {
        next(err);
    }
}