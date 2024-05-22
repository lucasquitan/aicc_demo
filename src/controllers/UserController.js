import User from '../model/User.js';
import { checkCPF } from '../util/functions.js';

class UserController {
  async create(req, res) {
    const { name, cpf, cep, attributes } = req.body;

    if (!name || !cpf || !cep) {
      return res
        .status(401)
        .json({ message: 'All parameters must be provided.' });
    }

    if (!checkCPF(cpf)) {
      return res
        .status(401)
        .json({ message: 'The CPF provided is not valid.' });
    }

    const user = await User.findOne({ cpf });

    if (user) {
      return res.status(401).json({ message: 'The user is already created.' });
    }

    try {
      const result = await User.create({
        name,
        cpf,
        cep,
      });

      return res.status(200).json({
        message: 'The user was created successfully',
        user: {
            name,
            cpf,
            cep
        }
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Internal error.',
      });
    }
  }

  async show(req, res) {
    const { cpf } = req.params;

    if (!cpf) {
      return res.status(404).json({ message: 'The CPF was not provided' });
    }

    const response = await User.findOne({ cpf }, '-_id -__v');

    if (!response) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(response);
  }

  async index(req, res) {
    const response = await User.find({}, 'name cpf cep -_id');

    return res.status(200).json(response);
  }
}

export default new UserController();
