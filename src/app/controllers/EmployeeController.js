const Employee = require('../models/Employee');
const Manager = require('../models/Manager');


class EmployeeController {

    async index(req, res) {
        try {
            const employee = await Employee.findAll()
            return res.status(200).send({
                 message: 'Funcionário encontrado com sucesso!',
                 data: employee
            })
           } catch (error) {
           return res.status(400).send({
            message:'Erro ao encontrar Funcionário! ',
            error: error.message
           })
           }
    }

    async store(req, res) {
        try {
            
            const { name, address, phone, document } = req.body
            const{ manager_id } = req.params
             const manager = await Manager.findByPk(manager_id)
             if (!manager) {
                return res.status(404).send({message: 'Funcionário nao encontrado'})
            }
            const employee = await Employee.create({
                name, address, phone, document,
                manager_id: manager.id
            })
            return res.status(200).send({
                message: 'Client cadastrado com sucesso!',
                data: employee
            })
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao cadastrar Funcionário',
                error: error.message
            });
        }
    }

    async show(req, res) {
        const { id } = req.params
        try {
            const employee = await Employee.findOne({
                where: {id : id }
            })
            if (!employee) {
                return res.status(400).send({ 
                    message: 'Nenhum Funcionário encontrado! '
                })
            }
            return res.status(200).send({ data: employee})
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao realizar cadastro de Funcionário!',
                error: error.message
            });
        }
    }

    async update(req, res) {
        const { name, address, phone, document } = req.body
        const { id } = req.params

        try {
            let upd = await Employee.findByPk(id)
            if (upd) {
                await Employee.update( { name, address, phone, document }, {where: {id:id}} )
                upd = await Employee.findByPk(id)
                return res.status(201).send({
                    message: 'Funcionário atualizado com sucesso!',
                    data: upd
                })
            } else {
                return res.status(400).send({ message: 'Nenhum Funcionário encontrada!' })
            }
        } catch (error) {
            return res.status(500).send({
                message: 'Erro ao atualizar Funcionário!',
                error: error.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params

        await Employee.destroy({
            where: { id: id }
        })

        return res.status(200).send({
            message: 'Funcionário deletado com sucesso'
        })
    }
}

module.exports = new EmployeeController();
