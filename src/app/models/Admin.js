const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs')


class Admin extends Model {
    static init(sequelize) {
        return super.init({
          name: DataTypes.STRING,
          email: DataTypes.STRING,
          password: DataTypes.STRING 
        }, {
            sequelize,
            tableName: 'admins',
            hooks: {
                beforeCreate: async (admin) => {
                    const salt = await bcrypt.genSalt();
                    admin.password = await bcrypt.hash(admin.password, salt);
                },
            },
        });
    }
    static associate(models) {
            // this.belongsTo(models.Admin_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', as: 'NOME_DA_TABELA' });
            // this.hasMany(models.Admin_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', as: 'NOME_DA_TABELA' });
            // // RELACIONAMENTO DE MUITOS PRA MUITOS
            // this.belongsToMany(models.Admin_O_MESMO_DA_TABELA, { foreignKey: 'CHAVE_ESTRAGEIRA', through: 'NOME_DA_TABELA_DE_RELACINAMENTO', as: 'NOME_DA_TABELA' });
        }
}

module.exports = Admin;
