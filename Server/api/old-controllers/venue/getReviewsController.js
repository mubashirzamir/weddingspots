const conn = require('../../dbConnection').promise();

exports.getReviews = async (req, res, next) => {

    try {

        const [row] = await conn.execute(
            "SELECT `review_id`, `venue_id`, `user_id`, `review_date`, `rating`, `review_text`, `name` FROM `venue_reviews`, `users` where venue_id = ? and user_id = id;",
            [req.body.venue_id]
        );

        if (row.length > 0) {
            return res.json({
                review: row
            });
        }

        res.json({
            message: "No reviews"
        });

    }
    catch (err) {
        next(err);
    }
}