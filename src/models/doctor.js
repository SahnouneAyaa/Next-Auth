import mongoose, {Schema} from "mongoose";

const doctorSchema = new Schema ({
    fullName : String,
    email :  String,
    password :  String,
    sexe :  String,
    role :  String,
    photo :  String,
    isVerified :  {
        type: Boolean,
        default: false
    },
    isAccepted : {
        type: Boolean,
        default: false
    },
    about : String,
    education :  String,
    experience : String,
    diploma : String,
    ticketPrice : Number,
    num_registre : Number,
    num_patients :Number,
}, {
    timestamps: true
})

const Doctor = mongoose.models.doctor || mongoose.model
('doctor', doctorSchema);

export default Doctor;