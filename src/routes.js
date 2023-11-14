const { Router } = require('express')
const router = Router()
const cadastroController = require('./controller/cadastroController.js')

router.get('/', (req, res)=>{
    res.send('Hello World')
})

router.post('/criar', cadastroController.store)//criar usuário
router.delete('/del/:id', cadastroController.delete)//deletar usuário



module.exports =  router