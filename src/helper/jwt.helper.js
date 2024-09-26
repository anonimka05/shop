const jwt = require('jsonwebtoken');
const jwtConfig = require( "../config/jwt.config.js");

const signToken = (tokenData) =>
  jwt.sign(tokenData, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expireTime,
  });

const verifyToken = (token) =>
  jwt.verify(token, jwtConfig.secretKey);

module.exports = {
  signToken, verifyToken
}