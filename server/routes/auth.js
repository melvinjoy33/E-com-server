const router = require("express").Router();
const userHelper = require("../helpers/user-helpers");
// RESTER URSERS

router.post("/register", async (req, res) => {
  userHelper.doSignup(req.body, (result) => {
    try {
      if (result instanceof Error) {
        res.status(500).json({
          message: "Error registering the user",
          status: 0,
          data: result.message,
        });
      } else {
        res.status(200).json({ message: "ok", status: 1, data: result });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        status: 0,
        data: error.message,
      });
    }
  });
});

router.post("/login", (req, res) => {
  userHelper
    .doLogin(req.body)
    .then((resp) => {
      console.log("resp:login", resp);
      res
        .status(201)
        .json({ message: "successfully loged in", status: 1, data: resp });
    })
    .catch((error) => {
      console.log("err:login", error);
      res.status(500).json({
        message: "user is not existing",
        status: 0,
        data: error,
      });
    });
});

module.exports = router;
