const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let records = [];

app.get("/", (req, res) => {
  return res.render("form", { records, message: "" });
});

app.post("/add", (req, res) => {
  const newRecord = req.body.record;
  if (newRecord && newRecord.length >= 3) {
    records.push(newRecord);
    res.redirect("/");
  } else {
    res.render("form", {
      records,
      message: "Please enter at least 3 characters",
    });
  }
});

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  const editToBe = records[index];
  res.render("edit", { record: editToBe, index, message: "" });
});

app.post("/update/:index", (req, res) => {
  const index = req.params.index;
  const updatedRecord = req.body.record;
  const currentRecord = records[index];

  if (updatedRecord === currentRecord) {
    res.render("edit", {
      record: updatedRecord,
      index,
      message: "Please update your task",
    });
  } else if (updatedRecord && updatedRecord.length >= 3) {
    records[index] = updatedRecord;
    res.redirect("/");
  } else {
    res.render("edit", {
      record: updatedRecord,
      index,
      message: "Please enter at least 3 characters",
    });
  }
});

app.get("/delete/:index", (req, res) => {
  const index = req.params.index;
  records.splice(index, 1);
  res.redirect("/");
});

app.use((req, res) => {
  res.status(404).render("page-not-found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
