const jwt = require("jsonwebtoken");
const { verifyToken } = require("../helper/jwt.helper.js");
const { BadRequestException } = require("../exeption/bad-request.exception.js");
const CheckAuthGuard = (isProtected) => {
  return (req, _, next) => {
    if (!isProtected) {
      return next();
    }

    const token = req.headers["authorization"];

    if (!(token && token.startsWith("Bearer") && token.split(" ")[1])) {
      throw new BadRequestException(`Given token: ${token} is invalid`);
    }

    const accessToken = token.split(" ")[1];

    verifyToken(accessToken);

    const { id, role } = jwt.decode(accessToken);

    req.userId = id;
    req.role = role;

    next();
  };
};
module.exports = CheckAuthGuard;
