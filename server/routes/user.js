const router = require("express").Router();
const bcrypt = require("bcrypt");
const updatedUserHelper = require("../helpers/user-helpers");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../helpers/verifyToken-helpers");

//UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  console.log("req.body.password", req.body.password);
  if (req.body.password) {
    req.body.password = await bcrypt.hash(register.password, 10);
  }

  updatedUserHelper
    .updatedUser(req)
    .then((res) => {
      res.status(200).json({ message: "ok", status: 1, data: res });
    })
    .catch((error) => {
      res.status(500).json({ message: "bad", status: 0, data: error });
    });
});

//Delete USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  updatedUserHelper
    .deleteUser(req)
    .then((response) => {
      res.status(200).json({ message: "ok", status: 1, data: response });
    })
    .catch((error) => {
      res.status(500).json({ message: "bad", status: 0, data: error });
    });
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  updatedUserHelper
    .getUser(req)
    .then((response) => {
        console.log('response',response);
      res.status(200).json({ message: "ok", status: 1, data: response });
    })
    .catch((error) => {
      res.status(500).json({ message: "bad", status: 0, data: error });
    });
});

module.exports = router;
