const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Function to generate a new employee ID
async function generateEmployeeId() {
  const count = await User.countDocuments().exec();
  return count + 1;
}

// Insert user to DB
router.post("/add", async (req, res) => {
  try {
    const employeeId = await generateEmployeeId(); // Generate the new employee ID

    // Create a new user instance
    const user = new User({
      employeeId, // Assign the generated employee ID
      name: req.body.name,
      address: req.body.address,
      age: req.body.age,
      department: req.body.department,
      status: req.body.status,
    });

    // Save the user and wait for completion
    await user.save();

    // Set a success message in the session
    req.session.message = {
      type: "success",
      message: "User Added Successfully",
    };

    // Redirect to the home page
    res.redirect("/");
  } catch (err) {
    // Respond with an error message
    res.json({ message: err.message, type: "Danger" });
  }
});

// Define routes
router.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

router.get("/add", (req, res) => {
  res.render("add_users", { title: "Add Users" });
});

module.exports = router;
