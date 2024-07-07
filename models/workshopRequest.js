const mongoose = require('mongoose');
const {workshop, workshopType} = require('./workshop')



const workshopRequestSchema = new mongoose.Schema({
    workshopRequest: {type: workshop, required: true},
    workshopId: {type: Number, required: true},
    accepted: {type: Boolean, default: false},
    trainerId: {type: Number}
})

const Workshop = mongoose.model('WorkshopRequest', workshopRequestSchema);

workshopRequestSchema.methods.getAllWorkshopRequests = async function() {
    try {
        const workshops = await mongoose.model('WorkshopRequest').find();
        return workshops;
    } catch (error) {
        console.error('Error fetching workshops:', error);
        throw error;
    }
}

workshopRequestSchema.methods.insertWorkshop = async function(workshopReqObj) {
    try {
        id = mongoose.model('WorkshopRequest').count() + 1;
        const workshopObj = {workshopRequest: workshopReqObj, workshopId: id}
        await mongoose.model('WorkshopRequest').insertOne(workshopObj);
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}

workshopRequestSchema.methods.rejectWorkshopById = async function(id) {
    try {
        if (mongoose.model('WorkshopRequest').findOne({workshopId: id}, {accepted: 1}) == false){
            await mongoose.model('WorkshopRequest').deleteOne({workshopId: id});
        }else{
            console.log("Already accepted, can't reject");
        }
        
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}

workshopRequestSchema.methods.updateWorkshopAcceptanceByID = async function(workshopID, trainerID) {
    try {
        await mongoose.model('WorkshopRequest').updateOne({workshopId: workshopID}, {$set :{accepted: true, trainerId: trainerID}});
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}


workshopRequestSchema.methods.getAcceptedWorkshops = async function() {
    try {
        const workshops = await mongoose.model('WorkshopRequest').find({accepted:true});
        return workshops;
    } catch (error) {
        console.error('Error fetching workshops:', error);
        throw error;
    }
}

module.exports = Workshop;
