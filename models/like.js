'use strict';
module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
     id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    tweet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
       
    }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'likes'
  });
  likes.associate = function(models) {
    likes.belongsTo(models.users,{foreignKey:'user_id'});
    likes.belongsTo(models.tweets,{foreignKey:'tweet_id'});

  };
  return likes;
};