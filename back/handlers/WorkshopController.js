const { default: mongoose } = require('mongoose');

let workshopSchema = new mongoose.Schema({
    client_id : Number, 
    companyName : String,
    clientType : String,
    workshopName : String,
    workshopId : {type : Number, unique : true}, //Set automatically
    dates : [Date],
    type : String,
    numberOfAttendees : String,
    dealSizePotential : Number,
    location : String,
    venue : String,
    comments: String,
    status : Boolean, // This specifies if it has been accepted or not
    assignedTrainers : [String],
});

let workshop = new mongoose.model('Workshops', workshopSchema);

class WorkshopController{

    static async getLargestWorkshopId() {
        try {
            let p = await workshop.find({});
            if (p.length == 0) {
                return 0;
            }
            p.sort((a,b) => a.workshopID < b.workshopId ? 1 : -1);
            return p[0].workshopId;
        } catch (err) {
            throw err;
        }
    }

    static async submitWorkshopRequest (details) {
        try {
            let p = await workshop.create(details);
        } catch (err) {
            throw err;
        }
        
    }

    static async getWorkshopsById(id) {
        try {
            let p = await workshop.find({client_id : id})
            return p;
        } catch (err) {
            throw err
        }
    }
}

module.exports = WorkshopController;
