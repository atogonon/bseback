'use strict'

const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

console.log(chalk.yellow('Opening database connection'))

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  protocol: 'postgres',
  logging: false
})

module.exports = db
