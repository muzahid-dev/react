const express = require("express");
const cors = require("cors");

const app = express();

// ⬅️ PUT IT HERE
app.use(cors());

app.use(express.json());

// your routes
app.get("/todos", (req, res) => {
  res.json([{ id: 1, title: "Test" }]);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
