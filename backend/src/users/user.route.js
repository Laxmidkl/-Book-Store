const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const { getAllUsers, deleteUser } = require("./user.controller");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.get("/users", verifyAdminToken, getAllUsers);
router.delete("/users/:id", verifyAdminToken, deleteUser);

router.post("/admin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ email });
    if (!admin) {
      res.status(404).send({ message: "Admin not found!" });
    }
    if (admin.password !== password) {
      res.status(401).send({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Authentication successful",
      token: token,
      user: {
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Failed to login as admin", error);
    res.status(401).send({ message: "Failed to login as admin" });
  }
});

module.exports = router;
