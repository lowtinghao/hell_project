const mongoose = require('mongoose');

const workshopTypeSchema = new mongoose.Schema({
    workshopTypes: { type: String, required: true, unique: true },
});

const WorkshopType = mongoose.model('WorkshopType', workshopTypeSchema);

workshopTypeSchema.methods.getWorkshopTypes = async function() {
    try {
        const workshopTypes = await mongoose.model('WorkshopType').find();
        return workshopTypes;
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}

workshopTypeSchema.methods.insertWorkshopType = async function(workshoptype) {
    try {
        const workshopTypes = await mongoose.model('WorkshopType').insertOne(workshoptype);
        return workshopTypes;
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}

workshopTypeSchema.methods.deleteWorkshopType = async function(workshoptype) {
    try {
        const workshopTypes = await mongoose.model('WorkshopType').deleteOne({workshopTypes: workshoptype});
        return workshopTypes;
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}




const workshopSchema = new mongoose.Schema({
    workshopType: { type: String, required: true},
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

workshopSchema.methods.getWorkshopFields = async function() {
    try {
        return workshopSchema;
    } catch (error) {
        console.error('Error fetching workshops:', error);
        throw error;
    }
}

workshopSchema.methods.insertWorkshopField = async function(field, varType = String, require = false) {
    try {
        workshopSchema.field={type: varType, required: require};
    } catch (error) {
        console.error('Error fetching workshop types:', error);
        throw error;
    }
}



module.exports = Workshop, WorkshopType;