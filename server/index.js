const express = require("express");
const cors = require("cors");
const router = require("./routes");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", router);

app.get("/ping", function (req, res) {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
