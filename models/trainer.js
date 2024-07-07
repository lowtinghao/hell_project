const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    trainerName: { type: String, required: true, unique: true },
    trainerId: {type: Number},
    schedule: {type: null}, // temporary
    workshopId: {type: Number} //unconfirmed
});

const Trainer = mongoose.model('Trainer', trainerSchema);

trainerSchema.methods.getTrainers = async function() {
    try {
        const trainers = await mongoose.model('Trainer').find();
        return trainers;
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}


/* trainerSchema.methods.updateTrainerSchedule = async function() {
    try {
        const schedule = await mongoose.model('WorkshopType').find();
        return trainers;
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}
*/

module.exports = Trainer;