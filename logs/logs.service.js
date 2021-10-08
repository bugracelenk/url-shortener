const mongoose = require("mongoose");
const { setPagination } = require("../utilities/pagination");
const { getIpAddressLocation } = require("../utilities/reqUtils");
const { ErrorLogModel, UserLogModel, AdminLogModel } = require("./logs.model");
const getModel = (logType) => {
  switch (logType) {
    case "admin":
      return "AdminLog";
    case "user":
      return "UserLog";
    case "error":
      return "ErrorLog";
    default:
      return false;
  }
};

const createErrorLog = async ({ request, error, userId, data, type }) => {
  try {
    const { ip, location } = await getIpAddressLocation(request);

    const errorLogData = {
      ip,
      data,
      type,
      error,
      location,
    };

    console.log(errorLogData);

    if (userId) errorLogData.user = userId;
    return await ErrorLogModel.create(errorLogData);
  } catch (error) {
    console.warn("createErrorLog Error");
    console.log(error);
  }
};

const createAdminLog = async ({ request, adminId, userId, data, type, details }) => {
  const { ip, location } = await getIpAddressLocation(request);

  return await AdminLogModel.create({
    user: userId,
    admin: adminId,
    ip,
    location,
    data,
    type,
    details,
  });
};

const createUserLog = async ({ request, userId, data, type }) => {
  const { ip, location } = await getIpAddressLocation(request);

  return await UserLogModel.create({
    user: userId,
    data,
    type,
    ip,
    location,
  });
};

const getLogs = async (args, logType, skip, limit) => {
  const { _limit, _skip } = setPagination(skip, limit);

  const modelType = getModel(logType);
  if (!modelType) {
    throw new Error("Not a valid log type");
  }

  return await model(modelType).find(args).skip(_skip).limit(_limit).exec();
};

module.exports = {
  createAdminLog,
  createErrorLog,
  createUserLog,
  getLogs,
};
