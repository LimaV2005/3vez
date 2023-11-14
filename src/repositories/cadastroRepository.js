const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const User = require('../models/User')
const mensagem = require('../mensagem.js')

module.exports = {

    async create(nome, email, senha1) { // criar usuario
        const hashedSenha = await bcrypt.hash(senha1, 10)
        const senha = hashedSenha
        
        return new Promise( async (resolve, reject) => {
            try {
                const newUser = await User.create({ nome, email, senha })
                
                
                const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true, 
                        auth: {
                            user: "limag9006@gmail.com", 
                            pass: "qtna upxr kggp uxps" 
                        }
                    });
                    transporter.sendMail({
                        from: 'Limag9006 <limag9006@gmail.com>', 
                        to: `${email}`, 
                        subject: 'Bem-vindo à SweetPets - O Seu Espaço para Amantes de Animais!', 
                        text: 'Olá' + `${nome}` + '', 
                        html: `${mensagem}` 
                    })
                        .then(() => console.log(`Email enviado para ${email}`))
                        .catch((erro) => console.log(erro))
                
                resolve(newUser)

            } catch (error) {
                console.error('Erro ao criar o usuário:', error.message);
                reject('deu bom n')
            }
        })

    }

}
