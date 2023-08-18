const device = require("../models/device");
const bcrypt = require("bcryptjs");

const request = async (req, res) => {
  const { id } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedId = await bcrypt.hash(id, salt);

  const isDeviceExists = await device.findOne({ id: hashedId });

  if (!isDeviceExists) {
    await device.create({ id: hashedId, allowed: false });
  } else if (isDeviceExists.allowed) {
    res.status(400).json({ message: "This device is already allowed!" });
  }
  res.json({ message: "Success!" });
};

const register = async (req, res) => {
  const { id } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedId = await bcrypt.hash(id, salt);

  const isDeviceExists = await device.findOne({ id: hashedId });

  if (!isDeviceExists) {
    await device.create({ id: hashedId, allowed: true });
  } else if (isDeviceExists.allowed) {
    res.status(400).json({ message: "This device is already allowed!" });
  } else {
    await device.findByIdAndUpdate(isDeviceExists._id, { allowed: true });
  }

  res.json({ message: "Success!" });
};

module.exports = { request, register };
