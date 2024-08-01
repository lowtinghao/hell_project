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
    status : Number, // This specifies if it has been accepted or not, set automatically. 0: Unprocessed 1: Accepted 2: Rejected 3: Completed
    assignedTrainers : [] 
});

// TODO : For all accesses to the database, specify types and do data validation

let workshop = new mongoose.model('Workshops', workshopSchema);

class WorkshopController{

    // HELPER METHODS
    // DONE : This validates the type of the fields in the body.
    // Input : HTTP Request. body.dates should be a comma seperated string. body.assignedTrainers should be a comma seperated string
    // Output : None. Throws error if checks fail
    static validateWorkshopBody(req){ // Validates the body for the parser
        let body = {... req.body};
        console.log("Validating Workshop Body...")
        if (body.dates.length == 0) {
            console.log("No date selected");
            throw new Error("No date selected");
        }
    }

    // DONE : This receives a HTTP request, and parses the dates and assigned trainers
    // INPUT : HTTP request. body.dates should be a comma seperated string. body.assignedTrainers should be a comma seperated string
    // OUTPUT : JS Object.  body.dates should be an array of Dates. body.assignedTrainers should be an array of numbers
    static parseWorkshopRequest(req) { // Parses the JSON to match the database schema
        let body = {... req.body};
        return body;
        // try {

        //     }
            
        // }  catch (err) {
        //     console.log(err);
        //     throw new Error("Incorrect Formatting of dates or trainers")
        // }
    }

    // CRUD FUNCTIONS
    // DONE : This returns the current largest workshop id
    // Input : None
    // Output : Number
    static async getLargestWorkshopId() {
        try {
            let p = await workshop.find({});
            if (p.length == 0) {
                return 0;
            }
            p.sort((a,b) => a.workshopId < b.workshopId ? 1 : -1);
            return p[0].workshopId;
        } catch (err) {
            throw err;
        }
    }

    // DONE : This takes in the workshop details and creates a new item in the database
    // Input : JS Object with workshop fields
    // Output : None
    static async submitWorkshopRequestQuery (details) {
        try {
            let p = await workshop.create(details);
        } catch (err) {
            throw err;
        }
        
    }

    // DONE : This handles the logic for assigning the workshop ID,
    // then calls the submitWorkshopRequestQuery function to create a new workshop
    // Input : HTTP Request
    // Output : None, Database created with details of new workshop
    static async submitWorkshopRequest(req) {
        try {
            this.validateWorkshopBody(req);
            console.log("Successfully validated request body...")
            let new_body = this.parseWorkshopRequest(req);
            new_body.workshopId = await this.getLargestWorkshopId() + 1;
            new_body.status = 0;
            await this.submitWorkshopRequestQuery(new_body);
        } catch (err) {
            throw err;
        }
    }

    // DONE : This gets the workshops that are associated with a specific client
    // INPUT : Number
    // OUTPUT : Array of JS objects. Each object is a workshop associated with a client.
    static async getWorkshopsByClientId(id) {
        try {
            let p = await workshop.find({client_id : id});
            return p;
        } catch (err) {
            throw err;
        }
    }
    // DONE : This replaces the workshops that has a specific id
    // INPUT : HTTP Request, workshop_id
    // OUTPUT : None.
    static async replaceWorkshopByWorkshopId(req, workshop_id){
        try {
            console.log(req.body);
            this.validateWorkshopBody(req);
            let new_body = this.parseWorkshopRequest(req);
            new_body.workshopId = workshop_id;
            await workshop.replaceOne({workshopId : workshop_id}, new_body);
        } catch (err) {
            throw err;
        }
    }
    // DONE : This gets a specific workshop by Id
    // INPUT : Number
    // OUTPUT : Array of JS objects. Array has a single JS object. Object is a workshop document with specified Id.
    static async getWorkshopByWorkshopId(id) {
        try {
            let p = await workshop.find({workshopId : id});
            return p;
        } catch (err) {
            throw err
        }
    }
    // DONE : This gets all workshops
    // INPUT : None
    // OUTPUT : Array of JS objects. Objects are workshop documents.
    static async getAllWorkshops() {
        try {
            let p = await workshop.find({});
            return p;
        } catch (err) {
            throw err;
        }
    }
    
    // DONE : Takes in the trainers id and the workshops id, then appends the trainer id to the assigned trainers list
    // INPUT : (Number, Number)
    // OUTPUT : None. Appends the trainer_id to the specific workshop.
    static async assignTrainerToWorkshop(trainer_id, workshop_id){
        try {
            let workshopInfo = await this.getWorkshopByWorkshopId(workshop_id);
            workshopInfo.assignedTrainers.push(trainer_id);
            await workshop.replaceOne({ workshopId : workshop_id }, workshopInfo);
        } catch (err) {
            throw err;
        }
    }

    // DONE : Finds all workshops associated with a specific trainer.
    // INPUT : Number
    // OUTPUT : Array of JS objects. Each object is a workshop associated with specified trainer. 
    static async getworkshopsAssignedToTrainer(trainer_id) {
        try {
            return await workshop.find({assignedTrainers : {$in : trainer_id}});
        } catch (err) {
            throw err
        }
    }

}

module.exports = WorkshopController;