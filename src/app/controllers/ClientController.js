const Client = require('../models/Client');
const Shop = require('../models/Shop');

class ClientController {

    async index(req, res) {
        try {
            const client = await Client.findAll()
            return res.status(200).send({
                 message: 'Cliente encontrado com sucesso!',
                 data: client
            })
           } catch (error) {
           return res.status(400).send({
            message:'Erro ao encontrar Cliente! ',
            error: error.message
           })
           }
    }

    async store(req, res) {
        try {
            const { name, phone, email, cpf, address, district, city, state } = req.body
            const{ shop_id } = req.params
             const shop = await Shop.findByPk(shop_id)
             if (!shop) {
                return res.status(404).send({message: 'Cliente não encontrado'})
            }
            const shops = await Client.create({
                name, phone, email, cpf, address, district, city, state,
                shops_id: shops.id
            })
            return res.status(200).send({
                message: 'Cliente cadastrado com sucesso!',
                data: shops
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao cadastrar Cliente',
                error: error.message
            });
        }
    }

    async show(req, res) {
        const { id } = req.params
        try {
            const client = await Client.findOne({
                where: {id : id }
            })
            if (!client) {
                return res.status(400).send({ 
                    message: 'Nenhum Cliente encontrado! '
                })
            }
            return res.status(200).send({ data: product})
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro de Cliente!',
                error: error.message
            });
        }
    }

    async update(req, res) {
        const { name, phone, email, cpf, address, district, city, state } = req.body
        const { id } = req.params
        try {
            let upd = await Client.findByPk(id)
            if (upd) {
                await Client.update( { name, phone, email, cpf, address, district, city, state }, {where: {id:id}} )
                upd = await Product.findByPk(id)
                return res.status(201).send({
                    message: 'Cliente atualizado com sucesso!',
                    data: upd
                })
            } else {
                return res.status(400).send({ message: 'Nenhum Cliente encontrado!' })
            }
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao atualizar Cliente!',
                error: error.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params

        await Client.destroy({
            where: { id: id }
        })

        return res.status(200).send({
            message: 'Client deletado com sucesso'
        })
    }
}

module.exports = new ClientController();
