const express = require('express')

const router = express.Router()
const AdminController = require('./app/controllers/AdminController')


const authMiddleware = require('./app/middlewares/auth')

router.post('/cadastro', AdminController.store)
router.post('/login', AdminController.login)



// const authManegerMiddleware = require('./app/middlewares/authManeger')

// router.get('/', function (req, res) {
//     res.status(200).send('Server on')
// })

// TODAS AS ROTAS QUE TIVEREM ABAIXO DO router.use(authMiddleware) 
// IRAM PRECISAR DE AUTENTICAÇÃO ENTÃO ATENÇÃO SE A ROTA IRA PRECISAR
// DE AUTENTICAÇÃO

router.use(authMiddleware)


router.put('/admins', AdminController.update)
router.get('/admins', AdminController.show)


// router.get('/NOME_DA_ROTA', AdminController.NOME_DO_METODO/FUNÇÂO)



module.exports = router
