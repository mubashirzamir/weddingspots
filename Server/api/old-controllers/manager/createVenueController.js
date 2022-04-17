const jwt = require('jsonwebtoken');
const conn = require('../../dbConnection').promise();

exports.createVenue = async (req, res, next) => {

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

        console.log(req.body.venue_name,
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

        const [rows] = await conn.execute('INSERT INTO `venue`(`venue_name`, `venue_type`, `halls`, `description`, `latitude`, `longitude`, `location_name`, `price_per_head`, `min_cap`, `max_cap`, `city`, `area`) VALUES(?,?,?, ?,?,?, ?,?,?, ?,?,?  )', [
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
        ]);

        if (rows.affectedRows === 1) {
            return res.json({
                venue_id: rows.insertId
            });
        }

        res.json({
            message: "Create venue failure"
        });

    }
    catch (err) {
        next(err);
    }
}