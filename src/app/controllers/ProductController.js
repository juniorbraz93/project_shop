const Product = require('../models/Product');
const Shop = require('../models/Shop');

class ProductController {

    async index(req, res) {
        try {
            const product = await Product.findAll()
            return res.status(200).send({
                 message: 'Produto encontrado com sucesso!',
                 data: product
            })
           } catch (error) {
           return res.status(400).send({
            message:'Erro ao encontrar Produto! ',
            error: error.message
           })
           }
    }

    async store(req, res) {
        try {
            const { name, description, value } = req.body
            const{ shop_id } = req.params
             const shop = await Shop.findByPk(shop_id)
             if (!shop) {
                return res.status(404).send({message: 'Produto não encontrado'})
            }
            const product = await Product.create({
                name, description, value,
                shop_id: shop.id
            })
            return res.status(200).send({
                message: 'Produto cadastrado com sucesso!',
                data: product
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao cadastrar Produto',
                error: error.message
            });
        }
    }

    async show(req, res) {
        const { id } = req.params
        try {
            const product = await Product.findOne({
                where: {id : id }
            })
            if (!product) {
                return res.status(400).send({ 
                    message: 'Nenhum Produto encontrado! '
                })
            }
            return res.status(200).send({ data: product})
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro de Produto!',
                error: error.message
            });
        }
    }

    async update(req, res) {
        const { name, description, value } = req.body
        const { id } = req.params
        try {
            let upd = await Product.findByPk(id)
            if (upd) {
                await Product.update( { name, description, value }, {where: {id:id}} )
                upd = await Product.findByPk(id)
                return res.status(201).send({
                    message: 'Produto atualizado com sucesso!',
                    data: upd
                })
            } else {
                return res.status(400).send({ message: 'Nenhum Produto encontrado!' })
            }
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao atualizar Produto!',
                error: error.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params

        await Product.destroy({
            where: { id: id }
        })

        return res.status(200).send({
            message: 'Produto deletado com sucesso'
        })
    }
}

module.exports = new ProductController();
