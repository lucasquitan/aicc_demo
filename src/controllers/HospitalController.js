import mongoose from 'mongoose';
import Hospital from '../model/Hospital.js'

const defaultTypes = ["Emergencia", "Consulta", "Ortopedia", "Cardiologia", "Clinico"]

class HospitalController {
    async index(req, res) {

        try {
            const response = await Hospital.find({}, '-__v');

            return res.status(200).json(response);
        } catch (e) {
            console.log(e);
        }

        return res.status(404).json({ 'message': 'No information was found.'})
        
    }

    async show(req, res) {
        const { id }  = req.params;

        console.log(id)

        if (!id) {
            return res.status(400).json({ 'message': 'The id must be provided' })
        }

        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid) {
            return res.status(400).json({ 'message': 'The id provided is invalid' })
        }

        const hospital = await Hospital.findById(id, '-__v');

        if (!hospital) {
            return res.status(404).json({ 'message': 'The Hospital was not found' })
        }

        return res.status(200).json(hospital)

    }

    async create(req, res) {
        let { name, address, cep, attributes } = req.body;

        if (attributes.length<=0) {
            return res
              .status(400)
              .json({ 'message': 'The attribute must be greater than 0.' })
          }

        const checkAttributes = attributes.includes("all") || attributes.every(item => defaultTypes.includes(item));

        if (!checkAttributes ) {
            return res
            .status(400)
            .json({ 'message': 'The attribute provide is not valid.' })
        }

        if (attributes.includes("all")) {
            attributes = defaultTypes;
        }
        
        if (name && address && cep) {
            const hospital = {
                name,
                address,
                cep,
                attributes
            }

            const result = await Hospital.create(hospital);

            return res.status(200).json({ 'message': 'The hospital was created.', user: {
                result
            } })
        }

        return res.status(400).json({ 'message': 'The parameters are mandatory.' })
    }

    async verify(req, res) {
        const selection = req.body.attributes;
        console.log(selection)

        let input = [];

        if (selection.includes("all")) {
            const response = await Hospital.find({attributes: { $all: defaultTypes}})
            return res.status(200).json(response);
        }

        const isValid = selection.every(item => defaultTypes.includes(item));

        if (!isValid || !input) {
            return res.status(400).json({ 'message': 'Must provide the attribute choosen.' })
        }

        const response = await Hospital.find({attributes: { $all: selection}})

        
        return res.status(200).json(response);

    }
}

export default new HospitalController();