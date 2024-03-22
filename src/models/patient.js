import mongoose, {Schema} from "mongoose";

const patientSchema = new Schema ({
    fullName : String,
    email :  String,
    password :  String,
    sexe :  String,
    rule :  String,
    isVerified :  {
        type: Boolean,
        default: false
    },
    photo :  String,
    bloodType: String
}, {
    timestamps: true
})

const Patient = mongoose.models.patient || mongoose.model
('patient', patientSchema);

export default Patient;