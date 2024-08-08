const { Model, DataTypes } = require('sequelize');

class Shop extends Model {
    static init(sequelize) {
        return super.init({

            name: DataTypes.STRING,
            cnpj_cpf: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING

        }, {
            sequelize,
            tableName: 'shops',
           
        });
    }
    static associate(models) {
            this.belongsTo(models.Manager, { foreignKey: 'manager_id', as: 'managers' });
            // this.hasMany(models.Manager, { foreignKey: 'manager_id', as: 'managers' });
            // // RELACIONAMENTO DE MUITOS PRA MUITOS
            // this.belongsToMany(models.Shop_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', through: 'NOME_DA_TABELA_DE_RELACINAMENTO', as: 'NOME_DA_TABELA' });
        }
}

module.exports = Shop;
