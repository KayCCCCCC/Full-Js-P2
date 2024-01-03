module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("project", {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Project;
};
