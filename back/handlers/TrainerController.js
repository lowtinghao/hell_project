const mongoose = require('mongoose');
const Trainer = require('../models/Trainer');

/*let trainerSchema = new mongoose.Schema({
    trainer_id : {type : Number, unique : true}, 
    trainer_name : {type: String, required : true},
}); */

//let trainer = new mongoose.model('Trainers', trainerSchema);

// TODO : Specify functionality, inputs, outputs of functions
// TODO : For all accesses to the database, specify types and do data validation

class TrainerController{
    // HELPER FUNCTIONS
    // DONE : Parses the HTTP request body
    // INPUTS : HTTP Request
    // OUTPUTS : JS Object with trainer details
    static parseNewTrainerRequest(req) {
        let body = {... req.body};
        return body
    }

    // DONE : Gets the current largest trainer Id from the database
    // INPUTS : None
    // Outputs : Number representing the largest trainer body
    static async getLargestTrainerId() {
        try {
            let p = await Trainer.find({});
            if (p.length == 0) {
                return 0;
            }
            p.sort((a,b) => a.trainerId < b.trainerId ? 1 : -1);
            return p[0].trainerId;
        } catch (err) {
            throw err;
        }
    }

    // DONE :
    // 1. This parses the request body to get the trainer details
    // 2. Gets the current largest trainer ID
    // 3. Creates a new trainer with an ID 1 larger
    // 4. Sends a request to the database to create a new trainer
    // INPUTS : HTTP Request containing trainer details
    // OUTPUTS : None. Creates a new trainer document.
    static async createTrainer(req) {
        try {
            let details = this.parseNewTrainerRequest(req);
            let id = await this.getLargestTrainerId() + 1;
            details.trainerId = id;
            await Trainer.create(details);
        } catch (err) {
            throw err;
        }
        
    }
    // DONE : This takes in a trainers id, then sends a delete request to the database for the trainer document
    // INPUT : Number, Trainer_id
    // OUTPUT : None
    static async deleteTrainer(id){
        try {
            await Trainer.deleteOne({ trainerId : id });
        } catch (err) {
            throw err;
        }
    }

    // DONE : Gets all trainers
    // INPUT : None
    // OUTPUT : JS Object containing all trainers
    static async getAllTrainers() {
        try {
            let p = await Trainer.find({});
            return p;
        } catch (err) {
            throw err;
        }
    }

    // DONE : Gets trainer by id
    // INPUT : Number, Trainer id
    // OUTPUT : JS Object containing trainer
    static async getTrainerById(trainer_id) {
        try {
            let p = await Trainer.find({trainerId : trainer_id});
            return p;
        } catch (err) {
            throw err;
        }
    }

    static async replaceTrainerbyTrainerId(details, id){
        try {
            details.trainerId = id;
            await Trainer.replaceOne({trainerId : id}, details);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = TrainerController;