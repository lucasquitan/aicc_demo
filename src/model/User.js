import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        require: true
    },
    cep: {
        type: String,
        require: true
    },
})

export default model('User', UserSchema);