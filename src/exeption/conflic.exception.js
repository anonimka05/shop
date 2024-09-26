const BaseExeption = require("./base.exeption.js");

class ConflictExeption extends BaseExeption {
  constructor(message) {
    super();
    this.statusCode = 409;
    this.name = "Conflict Exeption";
    this.message = message;
  }
}
module.exports = ConflictExeption;
