const Sequelize = require('sequelize');
const db = require('../database')

module.exports = db.define('team', {
  team: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  g: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  mp: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  fg: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  fga: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  fgp: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  thr: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  thrA: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  thrP: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  two: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  twoA: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  twoP: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ft: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ftA: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ftP: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  orb: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  drb: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  trb: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ast: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  stl: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  blk: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  tov: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  pf: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  pts: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ortg: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  drtg: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  pace: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imgURL: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.STRING,
  },
})
