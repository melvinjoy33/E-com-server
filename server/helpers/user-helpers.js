const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  doSignup: async (register, callback) => {
    console.log("register", register);
    register.password = await bcrypt.hash(register.password, 10);

    const newUser = new User({
      name: register.userName,
      email: register.email,
      password: register.password,
    });

    try {
      const savedUser = await newUser.save();
      console.log("savedUser", savedUser);
      callback(savedUser);
    } catch (error) {
      console.log("error:doSignup", error);
      callback(error);
    }
  },

  doLogin: async (signin) => {
    return new Promise(async (resolve, reject) => {
      const existingUser = await User.findOne({ email: signin.email });
      if (existingUser) {
        bcrypt
          .compare(signin.email, existingUser.email)
          .then((userLogin) => {
            const { password, ...others } = existingUser._doc;
            const accessToken = jwt.sign(
              {
                id: others._id,
                isAdmin: others.isAdmin,
              },
              process.env.JWT_SEC,
              { expiresIn: "3d" }
            );
            console.log("accessToken", accessToken);
            resolve({ ...others, accessToken });
          })
          .catch((error) => {
            console.log("login:error", error);
            reject(error);
          });
      } else {
        reject("No user found");
      }
    });
  },

  updatedUser: (req) => {
    return new Promise(async (resolve, reject) => {
      console.log("updateData", updateData);
      await User.findByIdAndUpdate(
        req.params.id,
        {
          //   $set: req.body,
          ...req.body,
        },
        { new: true }
      )
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          console.log("error: updated user", error);
          reject(error);
        });
    });
  },

  deleteUser: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await User.findByIdAndDelete(req.body.params);
        resolve(response);
      } catch (error) {
        console.log("error:Delete", error);
        reject(error);
      }
    });
  },

  getUser: (req) => {
    console.log("req.body.params", req.body.params);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await User.findById(req.body.params);
        console.log("response", response);
        const { password, ...others } = response._doc;
        resolve(others);
      } catch (error) {
        console.log("error:Delete", error);
        reject(error);
      }
    });
  },
};
