module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        sex: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return User;
};
