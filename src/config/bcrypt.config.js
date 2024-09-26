const { config } = require("dotenv");

config();

const bcryptConfig = {
  rounds: Number(process.env.HASH_ROUNDS),
};

module.exports = bcryptConfig;
