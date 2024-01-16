// models/comment.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};
