const User = require('../models/User')
const bcrypt = require('bcrypt')
const cadastroRepository = require('../repositories/cadastroRepository.js')

module.exports = {

    async store(req, res) { // criar usuario
        const nome = req.body.nome
        const email = req.body.email
        const senha1 = req.body.senha
        const row = await cadastroRepository.create(nome, email, senha1 )
        res.json(row)
    },

    async delete(req, res) {
        const { id } = req.params
        const user = User.findOne({ where: { id } })

        if (!user) {
            res.status(401).json({ message: "Usuario não encontrado" })
        } else {
            await User.destroy({ where: { id } })
            res.status(200).json({ message: `Usuario ${user} excluido` })
        }

    }

}

