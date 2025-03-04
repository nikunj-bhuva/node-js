const express = require("express");
const app = express();
const connection = require("./config/db");
const UserModel = require("./model/model");
const port = 8080;

app.set("view engine", "ejs");

app.use(express.urlencoded());

app.get("/", async (req, res) => {
  const bookData = await UserModel.find({});
  res.render("add", { bookData });
});

app.post("/bookadd", async (req, res) => {
  await UserModel.create(req.body);
  res.redirect("back");
});

app.get("deletebook:id", async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  console.log("Data deleted successfully");
  res.redirect("back");
});

app.get("/update/:id", async (req, res) => {
  const storeData = await UserModel.findById(req.params.id);
  res.render("update", { storeData });
});

app.post("/editData/:id", async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, req.body);
    console.log("Data updated successfully");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log("Server is not running");
    return;
  }
  connection();
  console.log(`Server is running on port : ${port}`);
});
