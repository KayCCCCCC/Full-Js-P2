module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Role;
};
