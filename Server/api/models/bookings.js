module.exports = (sequelize, DataTypes) => {

    const bookings = sequelize.define("bookings", {

        booking_id: {
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

        description: {
            type: DataTypes.TEXT
        },

        details: {
            type: DataTypes.JSON,
        },

        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
    })

    return bookings;
};