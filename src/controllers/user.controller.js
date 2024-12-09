const md5 = require("md5");
const jwt = require("jsonwebtoken");

const messageString = require("../utils/helpers/messageString.helper");
const responseHandler = require("../utils/helpers/responseHandler.helper");
const { statusCode, errorCode } = require("../utils/helpers/statusCode.helper");
const UserModel = require("../models/user.model");
const config = require("../config");

const UserController = {
  async registration(req, res) {
    try {
      const { body } = req;
      const checkEmail = await UserModel.findOne({ email: body.email.toLowerCase() }, "email").lean();
      if (checkEmail) {
        console.log("err =====Already registered email==>>>");
        responseHandler(res, statusCode._BAD_REQUEST, messageString.user._EMAIL_EXIST, {
          code: errorCode._EMAIL_EXIST
        });
      } else {
        const createUserSchema = new UserModel({
          username: body.username,
          password: md5(body.password),
          email: body.email.toLowerCase()
        });

        const saveData = await createUserSchema.save();
        if (saveData && saveData._id) {
          responseHandler(res, statusCode._OK, messageString.user._REGISTRATION_SUCCESS);
        } else {
          console.log("err =====insert user database==>>>");
          responseHandler(res, statusCode._BAD_REQUEST, messageString.user._REGISTRATION_FAILED, {
            code: errorCode._REGISTRATION_FAILED
          });
        }
      }
    } catch (err) {
      console.log("err =====register catch==>>>", JSON.stringify(err, null, 2));
      responseHandler(res, statusCode._INTERNAL_ERROR, messageString.server._INTERNAL_SERVER_ERROR, {
        code: errorCode._INTERNAL_SERVER_ERROR
      });
    }
  },
  async login(req, res) {
    try {
      const { body } = req;
      const getUserData = await UserModel.findOne({ email: body.email.toLowerCase() }, "password username").lean();

      if (!getUserData) {
        console.log("err =====email not register==>>>");
        responseHandler(res, statusCode._BAD_REQUEST, messageString.user._EMAIL_NOT_REGISTER, {
          code: errorCode._EMAIL_NOT_REGISTER
        });
      } else {
        if (getUserData.password && getUserData.password === md5(body.password)) {
          const token = jwt.sign({ userId: getUserData._id.toString() }, config.jwtSecretKey, { expiresIn: "4h" });

          if (token && token != "") {
            const tokenThirdPartStore = token.split(".")[2];
            if (tokenThirdPartStore && tokenThirdPartStore != "") {
              await UserModel.updateOne(
                {
                  _id: getUserData._id
                },
                {
                  authorization: tokenThirdPartStore
                },
                {
                  upsert: true
                }
              )
                .then(() => {
                  responseHandler(res, statusCode._OK, messageString.user._LOGIN_SUCCESS, {
                    userId: getUserData._id,
                    username: getUserData.username ? getUserData.username : "",
                    authorization: `Bearer ${token}`
                  });
                })
                .catch((err) => {
                  console.log("err =====login token stored in database time==>>>", JSON.stringify(err, null, 2));

                  responseHandler(res, statusCode._BAD_REQUEST, messageString.user._LOGIN_FAILED, {
                    code: errorCode._LOGIN_FAILED
                  });
                });
            } else {
              console.log("err =====tokenThirdPartStore not work==>>>");
              responseHandler(res, statusCode._BAD_REQUEST, messageString.user._LOGIN_FAILED, {
                code: errorCode._LOGIN_FAILED
              });
            }
          } else {
            console.log("err =====token not generate==>>>");
            responseHandler(res, statusCode._BAD_REQUEST, messageString.user._LOGIN_FAILED, {
              code: errorCode._LOGIN_FAILED
            });
          }
        } else {
          console.log("err =====does not match password==>>>");
          responseHandler(res, statusCode._BAD_REQUEST, messageString.user._PASSWORD_DOES_NOT_MATCH, {
            code: errorCode._PASSWORD_DOES_NOT_MATCH
          });
        }
      }
    } catch (err) {
      console.log("err =====login catch==>>>", JSON.stringify(err, null, 2));
      responseHandler(res, statusCode._INTERNAL_ERROR, messageString.server._INTERNAL_SERVER_ERROR, {
        code: errorCode._INTERNAL_SERVER_ERROR
      });
    }
  }
};

module.exports = UserController;
