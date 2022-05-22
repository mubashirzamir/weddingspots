module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },

        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },

    }, {})


    users.associate = function (models) {
        users.hasMany(models.venue_reviews, { as: 'comments', foreignKey: 'user_id' });
    }

    users.associate = function (models) {
        users.hasMany(models.venues, { as: 'venues', foreignKey: 'user_id' });
    }

    return users;
};