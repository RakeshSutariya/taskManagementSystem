const jwt = require("jsonwebtoken");

const { default: mongoose } = require("mongoose");
const UserModel = require("../models/user.model");
const messageString = require("../utils/helpers/messageString.helper");
const responseHandler = require("../utils/helpers/responseHandler.helper");
const { statusCode, errorCode } = require("../utils/helpers/statusCode.helper");
const config = require("../config");

const CheckUserMiddleware = (req, res, next) => {
  try {
    let token = req?.headers?.authorization;
    if (token) {
      const bearerToken = token.split(" ");
      if (bearerToken.length && bearerToken[0] === "Bearer") {
        jwt.verify(bearerToken[1], config.jwtSecretKey, async function (err, decoded) {
          if (err) {
            if (err?.name && err?.name === "TokenExpiredError") {
              console.log("err =====token expired==>>>", JSON.stringify(err, null, 2));
              responseHandler(res, statusCode._TOKEN_EXPIRED, messageString.server._TOKEN_EXPIRED, {
                code: errorCode._TOKEN_EXPIRED
              });
            }
            if (err?.name && err?.name != "") {
              console.log("err =====invalid token==>>>", JSON.stringify(err, null, 2));
              responseHandler(res, statusCode._UNAUTHORIZED, messageString.server._TOKEN_INVALID, {
                code: errorCode._TOKEN_INVALID
              });
            }
          }

          if (decoded && decoded.userId) {
            const getUserData = await UserModel.findOne(
              {
                _id: new mongoose.Types.ObjectId(decoded.userId)
              },
              "authorization"
            ).lean();
            token = token.split(".");
            if (getUserData) {
              if (getUserData.authorization && getUserData.authorization.toString() === token[2]) {
                req.userId = getUserData._id;
                next();
              } else {
                console.log("err =====token not valid==>>>");
                responseHandler(res, statusCode._TOKEN_EXPIRED, messageString.server._TOKEN_EXPIRED, {
                  code: errorCode._TOKEN_EXPIRED
                });
              }
            } else {
              console.log("err =====user not found==>>>");
              responseHandler(res, statusCode._UNAUTHORIZED, messageString.server._USER_DOES_NOT_EXIST, {
                code: errorCode._USER_DOES_NOT_EXIST
              });
            }
          } else {
            console.log("err =====Verify token after data not found==>>>");
            responseHandler(res, statusCode._UNAUTHORIZED, messageString.server._TOKEN_REQUIRED, {
              code: errorCode._TOKEN_REQUIRED
            });
          }
        });
      } else {
        console.log("err =====bearer token require==>>>");
        responseHandler(res, statusCode._UNAUTHORIZED, messageString.server._BEARER_TOKEN_REQUIRED, {
          code: errorCode._BEARER_TOKEN_REQUIRED
        });
      }
    } else {
      console.log("err =====token require==>>>");
      responseHandler(res, statusCode._UNAUTHORIZED, messageString.server._TOKEN_REQUIRED, {
        code: errorCode._TOKEN_REQUIRED
      });
    }
  } catch (err) {
    console.log("err =====middleware catch==>>>");
    responseHandler(res, statusCode._INTERNAL_ERROR, messageString.server._INTERNAL_SERVER_ERROR, {
      code: errorCode._INTERNAL_SERVER_ERROR
    });
  }
};

module.exports = CheckUserMiddleware;
