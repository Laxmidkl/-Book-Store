const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174"],
    credentials: true,
  })
);

//route
const bookRoutes = require("./src/books/book.route.js");
app.use("/api/books", bookRoutes);

const orderRoutes= require("./src/orders/order.route.js");
app.use("/api/orders", orderRoutes);

const userRoutes = require("./src/users/user.route.js")
app.use("/api/auth", userRoutes);


const adminRoutes = require("./src/stats/admin.stats.js")
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send(" Book Bazar server is live and running fine");
});




async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

main()
  .then(() => console.log("Mongodb connect successfully!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
