const Manager = require('../models/Manager');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authconfig = require('../../config/auth.json')

function generateToken( params = {}) {
    return jwt.sign(params, authconfig.secretGerente, {
        expiresIn: 78300
    })
}

class ManagerController {

          // Parte de Login
          async login (req, res) {
            const { email, password  } = req.body
            try {
                const verf = await Manager.findOne({
                    where: { email }
                })
                if (!verf||!bcrypt.compareSync(password, verf.password)) {
                    return res.status(400).send({
                        message: 'Email ou senha incorretos!',
                    })
                }
                verf.passsword = undefined
                const token = generateToken({ id: verf.id})
                return res.status(200).send({
                    message: 'Manager logado com sucesso',
                    verf,
                    token
                })
            } catch (error) {
                return res.status(500).send({
                    message: 'Erro ao realizar login',
                    error: error.message
                });
    
            }
        }

    async index(req, res) {
       
    }

    async store(req, res) {
        const { name, email, password, document, address } = req.body
        const admin_id =  req.userId
        try {
            const verf = await Manager.findOne({
                where: { email }
            })
             const admin = await Admin.findOne({
                where: { id: admin_id }
            })
             if (!admin) {
                return res.status(400).send({ message: 'Admin não cadastrado!' })
            } 
            if (verf) {
                return res.status(400).send({ message: 'Manager já cadastrado!' })
            } 
            const manager = await Manager.create({ name, email, password, document, address, admin_id: admin_id })
            manager.password = undefined
            return res.status(201).send({
                message: 'Manager cadastrado com sucesso!',
                data: manager
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro',
                error: error.message
            });
        }
    }

    async show(req, res) {
        const managerId = req.managerId;
        try {
            const manager = await Manager.findOne({
                where: {id : managerId }
            })
            if (!manager) {
                return res.status(400).send({ 
                    message: 'Nenhum Manager encontrado! '
                })
            }
            manager.password = undefined
            return res.status(200).send({ data: manager})
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro',
                error: error.message
            });
        }
    }

    async update(req, res) {
        const { name, document, address } = req.body
        const id  = req.managerId
        try {
            let verf = await Manager.findOne({
                where: { id: id }
            }) 
            if (!verf) {
                return res.status(400).send({ message: 'Nenhum Manager encontrado!' })
            } 
            await Manager.update({ name, document, address }, { where: {id: id}})
            verf = await Manager.findOne({
                where: { id: id }
            }) 
            verf.password = undefined
            return res.status(201).send({
                message: 'Manager atualizado com sucesso!',
                data: verf
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro',
                error: error.message
            });
        }
    }


    async delete(req, res) {
        
    }
}

module.exports = new ManagerController();