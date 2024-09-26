const BaseExeption = require("./base.exeption.js")

class NotFounExeption extends BaseExeption {
  constructor(message) {
    super();
    this.statusCode = 404;
    this.name = "Not found Exeption";
    this.message = message;
  }
}
module.exports = new NotFounExeption()