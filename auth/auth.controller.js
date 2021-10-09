const promiseHandler = require("../utilities/promiseHandler");
const AuthService = require("./auth.service");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const [loginError, token] = await promiseHandler(AuthService.login(email, password, req));

  if (loginError) {
    return next(loginError);
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

const forgotPassword = async (req, res, next) => {
  const { email } = req.query;

  const [forgotPasswordError] = await promiseHandler(AuthService.forgotPassword({ email }, req));
  if (forgotPasswordError) {
    return next(forgotPasswordError);
  }

  return res.status(200).json({
    status: true,
    message: "An email has been sent your email address! 📨",
  });
};

const changePassword = async (req, res, next) => {
  const { newPassword, changePasswordToken } = req.body;

  const [changePasswordError] = await promiseHandler(
    AuthService.changePassword({ newPassword, changePasswordToken }, req)
  );
  if (changePasswordError) {
    return next(changePasswordError);
  }

  return res.status(200).json({
    status: true,
    message: "Your password has been changed successfully ! ✅",
  });
};

module.exports = {
  login,
  register,
  forgotPassword,
  changePassword,
};
