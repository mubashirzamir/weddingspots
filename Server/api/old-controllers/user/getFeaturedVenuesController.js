const conn = require('../dbConnection').promise();

exports.getFeaturedVenues = async (req, res, next) => {

    try {

        const [row] = await conn.execute(
            "SELECT `venue_id` FROM `featured_venues` where `isDelete` = false",
        );

        if (row.length > 0) {
            return res.json({
                featured_venues: row
            });
        }

        res.json({
            message: "No featured venues"
        });

    }
    catch (err) {
        next(err);
    }
}