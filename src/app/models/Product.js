const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(sequelize) {
        return super.init({
        name:DataTypes.STRING,
        description:DataTypes.STRING,
        value:DataTypes.STRING
        }, {
            sequelize,
            tableName: 'products',
            
        });
    }
    static associate(models) {
            this.belongsTo(models.Shop, { foreignKey: 'shop_id', as: 'shops' });
            // this.hasMany(models.Product_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', as: 'NOME_DA_TABELA' });
            // // RELACIONAMENTO DE MUITOS PRA MUITOS
            // this.belongsToMany(models.Product_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', through: 'NOME_DA_TABELA_DE_RELACINAMENTO', as: 'NOME_DA_TABELA' });
        }
}

module.exports = Product;
