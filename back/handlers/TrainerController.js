const { default: mongoose } = require('mongoose');

let trainerSchema = new mongoose.Schema({
    trainer_id : {type : Number, unique : true}, 
    trainer_name : String,
    assigned_workshops : [Number], // This should be an actual workshop in the workshope collection
});

let trainer = new mongoose.model('Trainers', trainerSchema);

class TrainerController{
    // TODO : Create a new trainer
    static async createTrainer(details) {
        try {
            let p = await trainer.create(details);
        } catch (err) {
            throw err;
        }
        
    }
    // TODO : Delete a trainer
    // TODO : Assign a trainer a workshop
    // TODO : Access the workshops a trainer is assigned to
    // TODO : Access the schedule of a trainer
}

module.exports = TrainerController;
