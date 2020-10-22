'use strict';
module.exports = (sequelize, DataTypes) => {
  const followers = sequelize.define('followers', {
     id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
       
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'followers'
  });
  followers.associate = function(models) {
    followers.belongsTo(models.users,{foreignKey:'follower_id'})
  };
  return followers;
};