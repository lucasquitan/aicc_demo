import { BSON } from "mongodb";
import { Schema, model } from "mongoose";

const HospitalSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    cep: {
        type: String,
        require: true
    },
    attributes: {
        type: Array,
        require: ["service"],
        service: {
            enum: ["Emergencia", "Consulta", "Ortopedia", "Cardiologia", "Clinico", ]
        }
    }
})

export default model('Hospital', HospitalSchema);