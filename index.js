const express = require("express");
require("dotenv/config");

app.listen(PORT, (error) => {
  if (!error) console.log("Listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
