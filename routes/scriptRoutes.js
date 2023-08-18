const express = require("express");
const router = express.Router();

const { getScript } = require("../controller/script");

router.post("/getScript", getScript);

module.exports = router;
