const BaseExeption = require("./base.exeption.js");

class BadRequestException extends BaseExeption {
  constructor(message) {
    super();
    this.statusCode = 400;
    this.name = "Bad Request Exception";
    this.message = message;
  }
}
module.exports = { BadRequestException };
