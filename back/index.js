const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;


main()
async function main() {
  await mongoose.connect('mongodb+srv://admin:testpass123@cluster0.ldwipqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  console.log("Database Loaded");
}


app.use(express.json());
const clientRoute = require('./routes/Client');
const adminRoute = require('./routes/Admin');
const trainerRoute = require('./routes/Trainer');


app.use(cors());
app.use(express.json())
app.use('/client', clientRoute);
app.use('/admin', adminRoute);
app.use('/trainer', trainerRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})