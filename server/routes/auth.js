const router = require("express").Router();
const userHelper = require("../helpers/user-helpers");
// RESTER URSERS

router.post("/register", async (req, res) => {
  try {
    userHelper.doSignup(req.body, (result) => {
      res.status(200).json({ message: "ok", status: 1, data: result });
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering the user" });
  }
});

module.exports = router;
