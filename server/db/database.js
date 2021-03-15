'use strict'

// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.

const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

console.log(chalk.yellow('Opening database connection'))

// create the database instance that can be used in other database files
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, {
  logging: false, // so we don't see all the SQL queries getting made
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
})

module.exports = db
