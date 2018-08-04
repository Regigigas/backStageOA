var mongoose = require('../utils/dataBase.js')

var User = mongoose.model('User', { 
  userName: String,
  password: String
});

module.exports = {
  register (userName, password, cb) {
    var regUser = new User({
      userName: userName,
      password: password
    });

    regUser.save(function (err) {
      cb(err)
    });
  },
  findUser (findParams, cb) {
    User.findOne(findParams).then((result) => {
      console.log(result);
      cb(result);
    }).catch(() => {
      cb("error");
    })
  }
}