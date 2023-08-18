const express = require("express");
const router = express.Router();

const { request, register } = require("../controller/auth");

router.post("/request", request);

router.post("/register", register);

module.exports = router;
