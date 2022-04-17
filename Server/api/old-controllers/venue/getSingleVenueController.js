const conn = require('../../dbConnection').promise();

exports.getSingleVenue = async (req, res, next) => {

    try {
        const [row] = await conn.execute(
            "SELECT * from venue where venue_id = ?",
            [req.body.venue_id]
        );

        if (row.length > 0) {
            return res.json({
                venue_name: row[0].venue_name,
                venue_type: row[0].venue_type,
                halls: row[0].halls,
                description: row[0].description,
                latitude: row[0].latitude,
                longitude: row[0].longitude,
                location_name: row[0].location_name,
                price_per_head: row[0].price_per_head,
                min_cap: row[0].min_cap,
                max_cap: row[0].max_cap,
                city: row[0].city,
                area: row[0].area
            });
        }

        res.json({
            message: "Invalid venue ID"
        });

    }
    catch (err) {
        next(err);
    }
}