// backend/models/Client.js
const mongoose = require('mongoose');

// Define the schema for the Client
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

// Static method to get all clients
ClientSchema.statics.all = function() {
  return this.find();
};

// Static method to insert a new client
ClientSchema.statics.insertOne = function(client) {
  return client.save();
};

// Create a Client model
const Client = mongoose.model('Client', ClientSchema);

module.exports = {
  Client,
  all: () => Client.find(),
  insertOne: (client) => client.save(),
};
