const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
  doSignup: async (register, callback) => {
    register.password = await bcrypt.hash(register.password, 10);

    const newUser = new User({
      name: register.userName,
      email: register.email,
      password: register.password,
      // isAdmin: register.isAdmin,
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
        // resolve(existingUser);
        bcrypt
          .compare(signin.email, existingUser.email)
          .then((userLogin) => {
            resolve(userLogin);
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
};
