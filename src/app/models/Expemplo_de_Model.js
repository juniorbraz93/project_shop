const { Model, DataTypes } = require('sequelize');

class NOME_DO_MODEL extends Model {
    static init(sequelize) {
        return super.init({
          
        }, {
            sequelize,
            tableName: 'NOME_DA_TABELA',
            
        });
    }
    static associate(models) {
            // this.belongsTo(models.NOME_DO_MODEL_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', as: 'NOME_DA_TABELA' });
            // this.hasMany(models.NOME_DO_MODEL_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', as: 'NOME_DA_TABELA' });
            // // RELACIONAMENTO DE MUITOS PRA MUITOS
            // this.belongsToMany(models.NOME_DO_MODEL_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', through: 'NOME_DA_TABELA_DE_RELACINAMENTO', as: 'NOME_DA_TABELA' });
        }
}

module.exports = NOME_DO_MODEL;
