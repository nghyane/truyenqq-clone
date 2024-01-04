import { Sequelize } from 'sequelize'

const sql = new Sequelize(
    process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
)

export default sql
