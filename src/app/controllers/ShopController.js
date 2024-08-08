const Shop = require('../models/Shop');
const Manager = require('../models/Manager');


class ShopController {

    async index(req, res) {
        try {
            const shop = await Shop.findAll()
            return res.status(200).send({
                 message: 'Loja encontrado com sucesso!',
                 data: shop
            })
           } catch (error) {
           return res.status(400).send({
            message:'Erro ao encontrar Loja! ',
            error: error.message
           })
           }
    }

    async store(req, res) {
        try {
            const userId = req.userId;
            const { name, cnpj_cpf, address, phone } = req.body
            const manager = await Manager.findByPk(userId)
            if (!manager) {
                return res.status(404).send({message: 'Loja nao encontrado'})
            }
            const shop = await Shop.create({
                name, cnpj_cpf, address, phone,
                manager_id: manager.id
            })
            return res.status(200).send({
                message: 'Loja cadastrado com sucesso!',
                data: shop
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao cadastrar Loja',
                error: error.message
            });
        }
    }

    async show(req, res) {
        const { id } = req.params
        try {
            const shop = await Shop.findOne({
                where: {id : id }
            })
            if (!shop) {
                return res.status(400).send({ 
                    message: 'Nenhuma Loja encontrado! '
                })
            }
            shop.password = undefined
            return res.status(200).send({ data: shop})
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro',
                error: error.message
            });
        }
    }

    async update(req, res) {
        const { name , cnpj_cpf, address, phone, } = req.body
        const { id } = req.params

        try {
            let upd = await Shop.findByPk(id)
            if (upd) {
                await Shop.update( { name, cnpj_cpf, address, phone }, {where: {id:id}} )
                upd = await Shop.findByPk(id)
                return res.status(201).send({
                    message: 'Loja atualizado com sucesso!',
                    data: upd
                })
            } else {
                return res.status(400).send({ message: 'Nenhuma Loja encontrada!' })
            }
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao atualizar Loja!',
                error: error.message
            });
        }
    }

    async delete(req, res) {
        
    }
}

module.exports = new ShopController();
