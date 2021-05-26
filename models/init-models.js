var DataTypes = require("sequelize").DataTypes;
var _hibernate_sequence = require("./hibernate_sequence");
var _member = require("./member");
var _user_log = require("./user_log");

function initModels(sequelize) {
  var hibernate_sequence = _hibernate_sequence(sequelize, DataTypes);
  var member = _member(sequelize, DataTypes);
  var user_log = _user_log(sequelize, DataTypes);


  return {
    hibernate_sequence,
    member,
    user_log,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
