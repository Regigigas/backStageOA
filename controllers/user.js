const userModel = require('../models/user.js')
const crypto = require("crypto");

module.exports = {
  register: (req, res) => {
    const {userName, password} = req.body;
    const hash = crypto.createHash("sha256");
    hash.update(password);

    userModel.findUser({userName: userName}, (result) => {
      if (result && result !== "error") {
        res.json({
          ret: true,
          data: {
            register: false
          }
        })
      } else {
        userModel.register(userName, hash.digest('hex'), (err) => {
          if (!err) {
            console.log('注册成功');
            res.json({
              ret: true,
              data: {
                register: !err
              }
            })
          }
        })
      }
    })
  },
  login: (req, res) => {
    const {userName, password} = req.body;
    const hash = crypto.createHash("sha256");

    hash.update(password);

    userModel.findUser({
      userName: userName,
      password: hash.digest('hex')
    }, (result) => {
      if (result && result !== "error") {
        req.session.userName = userName;
      }
      res.json({
        ret: true,
        data: {
          login: (result && result !== "error") ? true : false
        }
      })
    })
  },
  isLogin: (req, res) => {
    res.json({
      ret: true,
      data: {
        isLogin: req.session.userName ? true : false
      }
    })
  },
  logout: function(req, res) {
    req.session = null; // 清空session_id
    res.json({
      ret: true,
      data: {
        logout: true
      }
    })
  }
}