'use strict';
module.exports = (sequelize, DataTypes) => {
  const tweets = sequelize.define('tweets', {
     id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
     
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'tweets'
  });
  tweets.associate = function(models) {
    tweets.belongsTo(models.users,{foreignKey:'user_id'});
    tweets.hasMany(models.likes, { foreignKey: 'tweet_id' });
    tweets.hasMany(models.commints, { foreignKey: 'tweet_id' });


  };
  return tweets;
};