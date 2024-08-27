const { Model, DataTypes } = require('sequelize');

class Client extends Model {
    static init(sequelize) {
        return super.init({

        name: DataTypes.STRING ,
        phone: DataTypes.INTEGER,
        email: DataTypes.STRING,
        cpf: DataTypes.INTEGER,
        address: DataTypes.STRING,
        district: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING

        }, {
            sequelize,
            tableName: 'clients',
            
        });
    }
    static associate(models) {
            this.belongsTo(models.Client, { foreignKey: 'shops_id', as: 'shops' });
            // this.hasMany(models.Client_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', as: 'NOME_DA_TABELA' });
            // // RELACIONAMENTO DE MUITOS PRA MUITOS
            // this.belongsToMany(models.Client_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', through: 'NOME_DA_TABELA_DE_RELACINAMENTO', as: 'NOME_DA_TABELA' });
        }
}

module.exports = Client;
