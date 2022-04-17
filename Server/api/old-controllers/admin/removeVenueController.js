const jwt = require('jsonwebtoken');
const conn = require('../../dbConnection').promise();

exports.addReview = async (req, res, next) => {

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

        const [rows] = await conn.execute('INSERT INTO `venue_reviews`(`venue_id`,`user_id`,`rating`,`review_text`) VALUES(?,?,?,?)', [
            req.body.venue_id,
            decoded.id,
            req.body.rating,
            req.body.review_text
        ]);

        if (rows.affectedRows === 1) {
            return res.json({
                review_id: rows.insertId
            });
        }

        res.json({
            message: "Review failure"
        });

    }
    catch (err) {
        next(err);
    }
}