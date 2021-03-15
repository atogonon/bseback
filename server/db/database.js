'use strict'

// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.

const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

let DATABASE_URL
if (process.env.DATABASE_URL) { DATABASE_URL = `${process.env.DATABASE_URL}?sslmode=require`}
else {DATABASE_URL=`postgres://localhost:5432/${databaseName}`}

console.log(chalk.yellow('Opening database connection'))

// create the database instance that can be used in other database files
const db = new Sequelize(DATABASE_URL, {
  logging: false // so we don't see all the SQL queries getting made
})

module.exports = db
