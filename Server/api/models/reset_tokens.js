module.exports = (sequelize, DataTypes) => {

    const reset_tokens = sequelize.define("reset_tokens", {

        token_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        email: {
            type: DataTypes.STRING,
            defaultValue: null
        },

        token: {
            type: DataTypes.STRING,
            defaultValue: null
        },

        expiration: {
            type: DataTypes.DATE,
            defaultValue: null
        },

        used: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },

    }, {})

    return reset_tokens;
};