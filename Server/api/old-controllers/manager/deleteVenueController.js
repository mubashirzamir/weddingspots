const jwt = require('jsonwebtoken');
const conn = require('../../dbConnection').promise();

exports.deleteVenue = async (req, res, next) => {

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

        const [rows] = await conn.execute("DELETE FROM `venue` where venue_id = ?",
            [req.body.venue_id],
        );

        if (rows.affectedRows === 1) {
            return res.json({
                message: "Deleted successfully"
            });
        }

        if (rows.affectedRows === 0) {
            return res.json({
                message: "No such venue exists"
            });
        }

    }
    catch (err) {
        next(err);
    }
}