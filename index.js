const express = require("express");
const bodyparser = require("body-parser");
const userRoutes = require("./routes/userRouter");
const blogRoutes = require("./routes/blogRouter");

const PORT = 3000;
const app = express();

app.use(bodyparser.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});


app.use("/user", userRoutes);
app.use("/blog", blogRoutes);




