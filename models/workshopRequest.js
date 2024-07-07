const mongoose = require('mongoose');
const {workshop, workshopType} = require('./workshop')


const workshopRequestSchema = new mongoose.Schema({
    workshopRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop', required: true },
    workshopId: { type: Number, required: true },
    accepted: { type: Boolean, default: false },
    trainerId: { type: Number }
});

const WorkshopRequest = mongoose.model('WorkshopRequest', workshopRequestSchema);

WorkshopRequest.statics.getAllWorkshopRequests = async function() {
    try {
        const workshops = await this.find();
        return workshops;
    } catch (error) {
        console.error('Error fetching workshops:', error);
        throw error;
    }
}

WorkshopRequest.statics.insertWorkshopRequest = async function(workshopReqObj) {
    try {
        const count = await this.countDocuments();
        const id = count + 1;
        const workshopObj = { workshopRequest: workshopReqObj._id, workshopId: id };
        await this.create(workshopObj);
    } catch (error) {
        console.error('Error inserting workshop request:', error);
        throw error;
    }
}

WorkshopRequest.statics.rejectWorkshopById = async function(id) {
    try {
        const workshop = await this.findOne({ workshopId: id });
        if (workshop && !workshop.accepted) {
            await this.deleteOne({ workshopId: id });
        } else {
            console.log("Already accepted, can't reject");
        }
    } catch (error) {
        console.error('Error rejecting workshop:', error);
        throw error;
    }
}

WorkshopRequest.statics.updateWorkshopAcceptanceByID = async function(workshopID, trainerID) {
    try {
        await this.updateOne({ workshopId: workshopID }, { $set: { accepted: true, trainerId: trainerID } });
    } catch (error) {
        console.error('Error updating workshop acceptance:', error);
        throw error;
    }
}

WorkshopRequest.statics.getAcceptedWorkshops = async function() {
    try {
        const workshops = await this.find({ accepted: true });
        return workshops;
    } catch (error) {
        console.error('Error fetching accepted workshops:', error);
        throw error;
    }
}

module.exports = WorkshopRequest;
