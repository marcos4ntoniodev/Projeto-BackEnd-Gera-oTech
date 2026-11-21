
const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {

  async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: ['id', 'firstname', 'surname', 'email'],
      });

      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado.',
        });
      }

      return res.status(200).json(user);

    } catch (error) {
      console.error('Erro ao consultar usuário:', error);

      return res.status(500).json({
        message: 'Erro interno do servidor.',
      });
    }
  }

  async create(req, res) {
    try {
      const {
        firstname,
        surname,
        email,
        password,
        confirmPassword,
      } = req.body;

      if (
        !firstname ||
        !surname ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        return res.status(400).json({
          message: 'Todos os campos são obrigatórios.',
        });
      }

      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!validEmail.test(email)) {
        return res.status(400).json({
          message: 'E-mail inválido.',
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          message: 'As senhas não coincidem.',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstname,
        surname,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
      });

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);

      return res.status(500).json({
        message: 'Erro interno do servidor.',
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { firstname, surname, email } = req.body;

      if (!firstname || !surname || !email) {
        return res.status(400).json({
          message: 'Todos os campos são obrigatórios.',
        });
      }

      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!validEmail.test(email)) {
        return res.status(400).json({
          message: 'E-mail inválido.',
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado.',
        });
      }

      await user.update({
        firstname,
        surname,
        email,
      });

      return res.status(204).send();

    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);

      return res.status(500).json({
        message: 'Erro interno do servidor.',
      });
    }
  }
  async deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: 'Usuário não encontrado.',
      });
    }

    await user.destroy();

    return res.status(204).send();

  } catch (error) {
    console.error('Erro ao excluir usuário:', error);

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    });
  }
}
}

module.exports = new UserController();
