'use strict';
module.exports = (sequelize, DataTypes) => {
  const commints = sequelize.define('commints', {
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
    tweet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
       
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
       
    }
  }, 
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'commints'
  });
  commints.associate = function(models) {
    commints.belongsTo(models.users,{foreignKey:'user_id'});
    commints.belongsTo(models.tweets,{foreignKey:'tweet_id'}); 
   };
  return commints;
};