/*

const mongoose = require('mongoose');

const workshopTypeSchema = new mongoose.Schema({
    workshopType: { type: String, required: true, unique: true },
});

const WorkshopType = mongoose.model('WorkshopType', workshopTypeSchema);

WorkshopType.statics.getWorkshopTypes = async function() {
    try {
        const workshopTypes = await this.find();
        return workshopTypes;
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}

WorkshopType.statics.insertWorkshopType = async function(workshopType) { // parameter is value of workshop type
    try {
        const newWorkshopType = new this({ workshopType: workshopType });
        await newWorkshopType.save();
        return newWorkshopType;
    } catch (error) {
        console.error('Error inserting workshop type:', error);
        throw error;
    }
}

WorkshopType.statics.deleteWorkshopType = async function(workshopType) { // parameter is value of workshop type
    try {
        await this.deleteOne({ workshopType: workshopType });
        return;
    } catch (error) {
        console.error('Error deleting workshop type:', error);
        throw error;
    }
}

// Define the workshop schema
const workshopSchema = new mongoose.Schema({
    workshopType: { type: String, required: true },
    clientCompany: { type: String, required: true },
    clientType: { type: String, required: true },
    workshopNames: { type: [String], required: true },
    workshopDuration: { type: Number, required: true }, // duration in hours or days
    date: { type: Date, required: true },
    dealSizePotential: { type: Number, required: true },
    location: { type: String, required: true },
    venue: { type: String, required: true },
    numberOfAttendees: { type: Number, required: true },
    resourcesRequired: { type: [String], required: true },
    comments: { type: String },
    otherWorkshopSpecificQuestions: { type: [String] }
});

const Workshop = mongoose.model('Workshop', workshopSchema);

Workshop.statics.getWorkshopFields = function() {
    try {
        return this.schema;
    } catch (error) {
        console.error('Error fetching workshops:', error);
        throw error;
    }
}

Workshop.statics.insertWorkshopField = async function(field, varType = String, required = false) {
    try {
        this.schema.add({ [field]: { type: varType, required } });
    } catch (error) {
        console.error('Error inserting workshop field:', error);
        throw error;
    }
}

module.exports = { Workshop, WorkshopType };

*/