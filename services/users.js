const userModel = require("../models/users");
const user = new userModel();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let errorMessage = require("../common/error_constants.js");
const uuid = require("uuid");

const login = async function (reqBody) {
  try {
    return new Promise(async (resolve, reject) => {
      let userRecord = await user.filterRecord({ email: reqBody.email });

      if (userRecord && userRecord.length) {
        let passwordIsValid = bcrypt.compareSync(
          reqBody.password,
          userRecord[0].password
        );
        if (passwordIsValid) {
          let token = jwt.sign(
            { email: userRecord[0].email, userId: userRecord[0]._id },
            "AUTH_KEY"
          );
          let response = {
            status: 200,
            message: "User logged in Successfully",
            token: token,
            data: {
              username: userRecord[0].username,
              email: userRecord[0].email,
              unique_id: userRecord[0].unique_id,
            },
          };
          resolve(response);
        } else {
          reject(errorMessage.WRONG_PASS);
        }
      } else {
        reject(errorMessage.EMAIL_NOT_FOUND);
      }
    });
  } catch (e) {
    throw e;
  }
};

const signup = async function (reqBody) {
  try {
    return new Promise(async (resolve, reject) => {
      let userExist = await user.filterRecord({ email: reqBody.email });
      if (userExist && userExist.length) {
        let errMeassge = {
          status: 400,
          message: `User with email - ${reqBody.email} already exists. Please choose another one`,
        };
        reject(errMeassge);
      } else {
        let newUser = new userModel();
        newUser.username = reqBody.username;
        newUser.email = reqBody.email;
        newUser.password = await bcrypt.hashSync(reqBody.password, 8);
        newUser.unique_id = uuid.v1();
        let newRecord = await newUser.save();

        if (newRecord && Object.keys(newRecord).length) {
          let response = {
            status: 200,
            // data: newRecord,
            message: `User create Successfully`,
          };
          resolve(response);
        } else {
          reject(errorMessage.USER_SAVE_FAILED);
        }
      }
    });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  login: login,
  signup: signup,
};
