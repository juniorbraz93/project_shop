const { Model, DataTypes } = require('sequelize');

class Employee extends Model {
    static init(sequelize) {
        return super.init({

          name: DataTypes.STRING,
          address:DataTypes.STRING,
          phone: DataTypes.STRING,
          document: DataTypes.STRING

        }, {
            sequelize,
            tableName: 'employees', 
          
        });
    }
    static associate(models) {
            this.belongsTo(models.Shop, { foreignKey: 'manager_id', as: 'managers' });
            // this.hasMany(models.Shop, { foreignKey: 'manager_id', as: 'shops' });
            // // RELACIONAMENTO DE MUITOS PRA MUITOS
            // this.belongsToMany(models.Employee_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', through: 'NOME_DA_TABELA_DE_RELACINAMENTO', as: 'shops' });
        }
}

module.exports = Employee;
