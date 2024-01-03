module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define("group", {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Group;
};
