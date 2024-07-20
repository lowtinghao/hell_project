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

    // HELPER METHODS
    static validateWorkshopBody(req){ // Validates the body for the parser
        let body = {... req.body};
        if (typeof body.dates != 'string') {
            throw new Error("body.dates is not of string type");
        }
        if (typeof body.assignedTrainers != 'string') {
            throw new Error("body.assignedTrainers is not of string type");
        }
    }

    static parseWorkshopRequest(req) { // Parses the JSON to match the database schema
        let body = {... req.body};
        // Format the comma seperated strings into an array of dates
        let arr_date_str = body.dates.split(',');
        let arr_date = [];
        arr_date_str.forEach(element => {
            arr_date.push(new Date(element))
        })
        body.dates = arr_date;
        // Format the comma seperated strings into an array of strings
        let arr_trainer_str = body.assignedTrainers.split(',');
        let arr_trainer = [];
        arr_trainer_str.forEach(element => {
            arr_trainer.push(element)
        })
        body.assignedTrainers = arr_trainer;
        return body;
    }

    // CRUD FUNCTIONS
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

    static async submitWorkshopRequestQuery (details) {
        try {
            let p = await workshop.create(details);
        } catch (err) {
            throw err;
        }
        
    }

    static async submitWorkshopRequest(req) {
        try {
            this.validateWorkshopBody(req);
            let new_body = this.parseWorkshopRequest(req);
            new_body.workshopId = await this.getLargestWorkshopId() + 1;
            await this.submitWorkshopRequestQuery(new_body);
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
