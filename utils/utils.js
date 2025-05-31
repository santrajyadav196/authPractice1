const JWT = require("jsonwebtoken");

exports.generateLoginAccessToken = (payload) => {
  const token = JWT.sign(payload, process.env.LOGIN_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};
