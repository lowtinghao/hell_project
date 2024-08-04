const { default: mongoose } = require('mongoose');

let fieldSchema = new mongoose.Schema({
    client_type : [String],
    workshop_type : [String],
    number_attendees : [String],
});

let fields = new mongoose.model('Fields', fieldSchema
);

class TrainerController{

    static async getFields(){
        try {
            let p = await fields.findOne({});
            return p;
        } catch (err) {
            return err;
        }
    }

    static async setFields(req){
        try {
            let body = {... req.body};
            
            let p = await fields.exists({});
            if (p == null) {
                console.log("Document does not exist")
                let q = await fields.create(body);
                return q;
            } else {
                console.log("Document exists")
                let q = await fields.findOneAndUpdate({}, body);
                return q;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
        

    }
}
module.exports = TrainerController;