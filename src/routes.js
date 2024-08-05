const express = require('express')

const router = express.Router()
const AdminController = require('./app/controllers/AdminController')


const authMiddleware = require('./app/middlewares/auth')
const ManagerController = require('./app/controllers/ManagerController')

router.post('/cadastro', AdminController.store)
router.post('/login', AdminController.login)
router.post('/login_manager', ManagerController.login)



const authManegerMiddleware = require('./app/middlewares/authManeger')

// router.get('/', function (req, res) {
//     res.status(200).send('Server on')
// })

// TODAS AS ROTAS QUE TIVEREM ABAIXO DO router.use(authMiddleware) 
// IRAM PRECISAR DE AUTENTICAÇÃO ENTÃO ATENÇÃO SE A ROTA IRA PRECISAR
// DE AUTENTICAÇÃO




router.put('/admins',authMiddleware, AdminController.update)
router.get('/admins',authMiddleware, AdminController.show)
router.post('/cadastro_manager',authMiddleware, ManagerController.store)
router.get('/manager',authManegerMiddleware, ManagerController.show)
router.put('/manager',authManegerMiddleware, ManagerController.update)



// router.get('/NOME_DA_ROTA', AdminController.NOME_DO_METODO/FUNÇÂO)



module.exports = router
