import express from "express";

const app = express();

app.get("", (req, res) => {
  res.send(`THis is my project Welcome`);
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log(`App is listening to the port 4000`);
});
