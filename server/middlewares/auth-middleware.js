const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function (res, req, next) {
  try {
    const authHeader = res.headers.authorization;

    if (!authHeader) {
      return next(ApiError.UnathorizedError()); //
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return next(ApiError.UnathorizedError()); //
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnathorizedError()); //
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnathorizedError()); //
  }
};
