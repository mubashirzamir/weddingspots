module.exports = (sequelize, DataTypes) => {

    const venue_reviews = sequelize.define("venue_reviews", {

        review_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        venue_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            min: 1,
            max: 5
        },

        review: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
    })

    return venue_reviews;
};