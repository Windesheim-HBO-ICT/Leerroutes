const express = require("express");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Serve static files from the 'node_modules' directory
app.use("/vendor", express.static(__dirname + "/node_modules"));

// Define routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
