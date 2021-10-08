const promiseHandler = require("../utilities/promiseHandler");
const AuthService = require("./auth.service");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const [loginError, token] = await promiseHandler(AuthService.login(email, password, req));

  if (loginError) {
    next(loginError);
  }

  return res.status(200).json({
    status: true,
    token,
  });
};

const register = async (req, res, next) => {
  const { email, password, username } = req.body;

  const [registerError] = await promiseHandler(AuthService.register({ email, password, username }, req));
  if (registerError) {
    return next(registerError);
  }

  const [loginError, token] = await promiseHandler(AuthService.login(email, password, req));
  if (loginError) {
    return next(loginError);
  }

  return res.status(200).json({
    status: true,
    token,
  });
};

module.exports = {
  login,
  register,
};
