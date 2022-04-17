const jwt = require('jsonwebtoken');
const conn = require('../../dbConnection').promise();

exports.updateVenue = async (req, res, next) => {

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

        console.log("Hello")

        console.log(
            req.body.venue_id,
            req.body.venue_name,
            req.body.venue_type,
            req.body.halls,
            req.body.description,
            req.body.latitude,
            req.body.longitude,
            req.body.location_name,
            req.body.price_per_head,
            req.body.min_cap,
            req.body.max_cap,
            req.body.city,
            req.body.area
        );

        const [rows] = await conn.execute('Update `venue` SET `venue_name` = ?,  `venue_type` = ?,  `halls` = ?,  `description` = ?,  `latitude` = ?,  `longitude` = ?,  `location_name` = ?,  `price_per_head` = ?,  `min_cap` = ?,  `max_cap` = ?,   `city` = ?,  `area` = ? where venue_id = ?', [
            req.body.venue_name,
            req.body.venue_type,
            req.body.halls,
            req.body.description,
            req.body.latitude,
            req.body.longitude,
            req.body.location_name,
            req.body.price_per_head,
            req.body.min_cap,
            req.body.max_cap,
            req.body.city,
            req.body.area,
            req.body.venue_id
        ]);

        if (rows.affectedRows === 1) {
            return res.json({
                message: "Update venue success"
            });
        }

        res.json({
            message: "Update venue failure"
        });

    }
    catch (err) {
        next(err);
    }
}