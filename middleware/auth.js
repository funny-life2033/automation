const device = require("../models/device");
const bcrypt = require("bcryptjs");

const auth = async (req, res, next) => {
  const id = req.headers.deviceId;

  if (!id) {
    res.status(401).json({ message: "Device id is needed" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedId = await bcrypt.hash(id, salt);

  const isDeviceExists = await device.findOne({ id: hashedId });

  if (isDeviceExists && isDeviceExists.allowed) {
    next();
  } else {
    res.status(401).json({ message: "This device is not allowed yet" });
  }
};

module.exports = auth;
