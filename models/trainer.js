const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    trainerName: { type: String, required: true, unique: true },
    trainerId: { type: Number },
    schedule: { type: mongoose.Schema.Types.Mixed }, //will be updated in the future
    workshopId: { type: Number } //same as for schedule
});

const Trainer = mongoose.model('Trainer', trainerSchema);

Trainer.statics.getTrainers = async function() {
    try {
        const trainers = await this.find();
        return trainers;
    } catch (error) {
        console.error('Error fetching trainers:', error);
        throw error;
    }
}


/* Trainer.statics.updateTrainerSchedule = async function() {
    try {
        const schedule = await mongoose.model('Trainer').find();
        return schedule;
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}
*/

module.exports = Trainer;
