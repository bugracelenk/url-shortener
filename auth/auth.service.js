const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getIpAddressLocation } = require("../utilities/reqUtils");
const { AuthValidateSchema, AuthModel } = require("./auth.model");
const LogService = require("../logs/logs.service");
const { GetUserValidation, ChangePasswordValidation } = require("./auth.module");

const login = async (email, password, request) => {
  const user = await AuthModel.findOne({ email });

  if (!user) {
    const errorLog = await LogService.createErrorLog({
      request,
      userId: null,
      data: { email, password },
      type: "LoginError",
      error: "UserNotFound",
    });
    throw new Error("User not found! Error Log: " + errorLog._id);
  }

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    const errorLog = await LogService.createErrorLog({
      request,
      userId: user._id,
      data: { email, password },
      type: "LoginError",
      error: "WrongPassword",
    });
    throw new Error("Not authorized! Error Log: " + errorLog._id);
  }

  const token = await jwt.sign(
    {
      role: user.role,
      email: user.email,
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "365d",
    }
  );

  return token;
};

const register = async (args, request) => {
  const validateResult = await AuthValidateSchema.validate(args);
  if (validateResult.error) {
    const errorLog = await LogService.createErrorLog({
      request,
      userId: null,
      data: { ...args },
      type: "RegisterError",
      error: validateResult.error,
    });
    throw new Error(`${validateResult.error} Error Log: ${errorLog._id}`);
  }

  const hash = await bcrypt.hash(args.password, 10);
  args.password = hash;

  const { ip, location } = await getIpAddressLocation(request);
  args.ip = ip;
  args.location = location;

  const newUser = await AuthModel.create(args);
  if (!newUser) {
    const errorLog = await LogService.createErrorLog({
      request,
      userId: null,
      data: { email, password, username },
      type: "RegisterError",
      error: "UserCouldNotCreated",
    });
    throw new Error("Could not created a new user! Error Log: " + errorLog._id);
  }

  return newUser;
};

const getUser = async (args, request) => {
  const validateResult = await GetUserValidation.validateAsync(args);
  if (validateResult.error) {
    const errorLog = await LogService.createErrorLog({
      request,
      userId: null,
      data: { ...args },
      type: "GetUserError",
      error: validateResult.error,
    });
    throw new Error(`${validateResult.error} Error Log: ${errorLog._id}`);
  }
  if (args.userId) {
    return await AuthModel.findById(args.userId);
  }
  return await AuthModel.findOne(args);
};

const changePassword = async (args, request) => {
  const validateResult = await ChangePasswordValidation.validateAsync(args);
  if (validateResult.error) {
    const errorLog = await LogService.createErrorLog({
      request,
      userId: null,
      data: { ...args },
      type: "GetUserError",
      error: validateResult.error,
    });
    throw new Error(`${validateResult.error} Error Log: ${errorLog._id}`);
  }
  const hash = await bcrypt.hash(args.newPassword, 10);
  const user = await AuthModel.findById(args.userId);

  const compareTokens = await bcrypt.compare(args.changePasswordToken, user.changePasswordToken);

  if (!compareTokens) {
    const errorLog = await LogService.createErrorLog({
      request,
      userId: null,
      data: { ...args, userChangePasswordToken: user.changePasswordToken, userChangePasswordExpires: user.changePasswordExpires, time: new Date() },
      type: "ChangePasswordError",
      error: "ChangePasswordError:TokensAreNotMatching",
    });
    throw new Error(`🚫 Not authorized!🚫 Error Log: ${errorLog._id}`);
  }

  if (user.changePasswordExpires < new Date()) {
    const errorLog = await LogService.createErrorLog({
      request,
      userId: null,
      data: { ...args, userChangePasswordToken: user.changePasswordToken, userChangePasswordExpires: user.changePasswordExpires, time: new Date() },
      type: "ChangePasswordError",
      error: "ChangePasswordError:TokenExpired",
    });
    throw new Error(`🚫 Not authorized!🚫 Error Log: ${errorLog._id}`);
  }

  return await AuthModel.findByIdAndUpdate(args.userId, { password: hash, changePasswordToken: "", changePasswordExpires: new Date() });
};

module.exports = {
  login,
  register,
  getUser,
  changePassword,
};
