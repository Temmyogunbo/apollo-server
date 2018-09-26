import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 5
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  });

  User.beforeCreate(async user => {
    return user.password = await user.generatePasswordHash();
  });
  
  User.prototype.generatePasswordHash = async function() {
    return await bcrypt.hash(this.password, 10);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};
