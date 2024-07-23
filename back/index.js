const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

main()
async function main() {
  await mongoose.connect('mongodb+srv://admin:testpass123@cluster0.ldwipqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  console.log("Database Loaded");
}


app.use(express.json());
const clientRoute = require('./routes/Client');
const adminRoute = require('./routes/Admin');


app.use(express.json())
app.use('/client', clientRoute);
app.use('/admin', adminRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})