module.exports = (sequelize, DataTypes) => {

    const venues = sequelize.define("venues", {

        venue_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        halls: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        latitude: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false,
        },

        longitude: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false,
        },

        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        area: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        price_per_head: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        min_cap: {
            type: DataTypes.INTEGER,
            allowNull: false,
            min: 0,
        },

        max_cap: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isGreaterThanOtherField(value) {
                    if (parseInt(value) <= parseInt(this.min_cap)) {
                        throw new Error('max_cap must be greater than min_cap.');
                    }
                }
            }
        },

        image_thumb: {
            type: DataTypes.TEXT,
        },

        image_gallery: {
            type: DataTypes.JSON,
        },

        isFeatured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },

        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },

    }, {})

    venues.associate = function (models) {
        venues.belongsTo(models.users, { foreignKey: 'user_id' });
    }

    return venues;
};