const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/groceryDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const grocerySchema = new mongoose.Schema({
  itemName: String,
  category: String,
  quantity: Number,
});

const Grocery = mongoose.model("Grocery", grocerySchema);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running Successfully",
  });
});

app.post("/api/grocery", async (req, res) => {
  try {
    const grocery = await Grocery.create(req.body);

    res.status(201).json({
      success: true,
      grocery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/grocery", async (req, res) => {
  const groceries = await Grocery.find();

  res.json({
    success: true,
    groceries,
  });
});

app.delete("/api/grocery/:id", async (req, res) => {
  await Grocery.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Item Deleted",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});