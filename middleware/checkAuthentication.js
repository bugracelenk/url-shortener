const jwt = require("jsonwebtoken");
const LogsService = require("../logs/logs.service");
const promiseHandler = require("../utilities/promiseHandler");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const [createLogError] = await promiseHandler(LogsService.createErrorLog({ request: req, data: {}, error: "No Token", type: "UNAUTHORIZED" }));
      if (error) throw new Error(createLogError);
      throw new Error("🚫 Unauthorized !🚫");
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const [userInfoError, userInfo] = await promiseHandler(AuthService.getUserInfo(userId));
    if (userInfoError) {
      await LogsService.createUserLog({ req, userId, data: { userId }, type: "GET_USER_INFO_ERROR" });
      throw new Error(userInfoError);
    }
    req.userId = userId;
    req.email = userInfo.email;
    req.username = userInfo.username;
    req.userRole = userInfo.role;

    next();
  } catch (error) {
    next(error);
  }
};
