const conn = require('../../dbConnection').promise();

exports.getVenue = async (req, res, next) => {

    try {

        const [row] = await conn.execute(
            "SELECT * from venue"
            //"SELECT * from venue where venue_id = ?",
            //[req.body.venue_id]
        );

        if (row.length > 0) {
            return res.json({
                venue: row
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