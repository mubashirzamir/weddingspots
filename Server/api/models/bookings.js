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

        venue_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        manager_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        booking_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        booking_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pending'
        },

        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },

    }, {})

    bookings.associate = function (models) {
        bookings.belongsTo(models.users, { foreignKey: 'user_id' });
        bookings.belongsTo(models.venues, { foreignKey: 'venue_id' });

    }

    return bookings;
};