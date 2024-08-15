const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs')


class Manager extends Model {
    static init(sequelize) {
        return super.init({

          name: DataTypes.STRING,
          email: DataTypes.STRING,
          password: DataTypes.STRING,
          document: DataTypes.STRING,
          address: DataTypes.STRING

        }, {
            sequelize,
            tableName: 'managers',
            hooks: {
                beforeCreate: async (admin) => {
                    const salt = await bcrypt.genSalt();
                    admin.password = await bcrypt.hash(admin.password, salt);
                },
            },
        });
    }
    static associate(models) {
            this.belongsTo(models.Admin, { foreignKey: 'admin_id', as: 'admins' });
            this.hasMany(models.Employee, { foreignKey: 'manager_id', as: 'employees' });
            // // RELACIONAMENTO DE MUITOS PRA MUITOS
            // this.belongsToMany(models.NOME_DO_MODEL_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', through: 'managers_DE_RELACINAMENTO', as: 'NOME_DA_TABELA' });
        }
}

module.exports = Manager;
