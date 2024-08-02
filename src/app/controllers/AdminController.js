const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authconfig = require('../../config/auth.json')

function generateToken( params = {}) {
    return jwt.sign(params, authconfig.secret, {
        expiresIn: 78300
    })
}

class AdminController {

        // Parte de Login
     async login (req, res) {
        const { email, password } = req.body
        try {
            const verf = await Admin.findOne({
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
                message: 'Admin logado com sucesso',
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

        //  verficação e Cadastro
    async store(req, res) {
        const { name, email, password } = req.body
        try {
            const verf = await Admin.findOne({
                where: { email }
            }) 
            if (verf) {
                return res.status(400).send({ message: 'Admin já cadastrado!' })
            } 
            const admin = await Admin.create({ name, email, password })
            admin.password = undefined
            return res.status(201).send({
                message: 'Admin cadastrado com sucesso!',
                data: admin
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro',
                error: error.message
            });
        }
    }
        // Visualização
    async show(req, res) {
         const adminId = req.userId;
        try {
            const admin = await Admin.findOne({
                where: {id : adminId }
            })
            if (!admin) {
                return res.status(400).send({ 
                    message: 'Nenhum admin encontrado! '
                })
            }
            admin.password = undefined
            return res.status(200).send({ data: admin})
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro',
                error: error.message
            });
        }
    }
    async update(req, res) {
        const { name } = req.body
        const id  = req.userId
        try {
            let verf = await Admin.findOne({
                where: { id: id }
            }) 
            if (!verf) {
                return res.status(400).send({ message: 'Nenhum Admin encontrado!' })
            } 
            await Admin.update({ name }, { where: {id: id}})
            verf = await Admin.findOne({
                where: { id: id }
            }) 
            verf.password = undefined
            return res.status(201).send({
                message: 'Admin atualizado com sucesso!',
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

module.exports = new AdminController();
