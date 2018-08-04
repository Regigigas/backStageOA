var mongoose = require('../utils/dataBase.js')

var Position = mongoose.model('Position', { 
  company: String,
  position: String,
  salary: String,
  address: String
});

module.exports = {
  addPosition (company, position, salary, address, cb) {
    var position = new Position({company, position, salary, address});

    position.save(function (err) {
      cb(err)
    });
  },
  getPosition (params, cb) {
    Position.find({}).then((result) => {
      cb(result);
    }).catch(() => {
      cb('error');
    })
  },
  getPositionByPage (page, size, cb) {
    // 先将
    let _size = parseInt(size, 10),
        _page = parseInt(page, 10);
    Position.find({}).limit(_size).skip((_page - 1) * _size).then((result) => {
      cb(result);
    }).catch(() => {
      cb('error');
    })
  },
  getPositionById (id, cb) {
    Position.findById(id).then((result) => {
      cb(result);
    }).catch(() => {
      cb('error');
    })
  },
  updatePositionById (id, params, cb) {
    Position.findByIdAndUpdate(id, params).then((result) => {
      cb(result);
    }).catch(() => {
      cb("error");
    })
  }
}