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
            references: {
                model: 'venues',
                key: 'venue_id'
            }
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
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

    }, {})

    venue_reviews.associate = function (models) {
        venue_reviews.belongsTo(models.users, { foreignKey: 'user_id' });
    }


    return venue_reviews;
};