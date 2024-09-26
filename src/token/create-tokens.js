const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  }); 
};


const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.sendStatus(401); 

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); 

    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshToken,
};
