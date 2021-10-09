const LogsService = require("./logs.service");
const promiseHandler = require("../utilities/promiseHandler");

const getLogs = async (req, res, next) => {
  try {
    const { type, logType, limit, skip, ip, location, userId } = req.query;
    const [logsError, logs] = await promiseHandler(
      LogsService.getLogs({ userId, type, ip, location }, logType, skip, limit)
    );

    if (logsError) {
      throw new Error(logsError);
    }

    return res.status(200).json({ logs });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLogs,
};
