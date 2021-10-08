const { lookup } = require("geoip-lite");

const getIpAddressLocation = async (request) => {
  const ip = request.headers["x-forwarded-for"] || request.connection.remoteAddress;
  const location = await lookup(ip);
  if (!location) {
    return {
      ip,
      location: "Undefined",
    };
  }

  return {
    ip,
    location: location.city,
  };
};

module.exports = {
  getIpAddressLocation,
};
