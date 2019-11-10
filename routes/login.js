const express = require('express');
const router = express.Router();
const mysql = require('../config/connect');
const md5 = require('md5-node')


router.get('/',(req, res, next)=>{
  let userName = req.query.username
  let password = md5(req.query.password)
  let sql = 'select user_pwd from m_shop_user where user_name = ' + "'" + userName + "'"
  mysql.query(sql,(err,rows)=>{
    if(err){
      res.send(err)
    }
    else{
      if (rows.length != 0) {
        if (rows[0].user_pwd == password) {
          res.send({
            state: 1,
            message: '登陆成功',
            user: userName
          })
        } else res.send({
          state: 0,
          message: '用户名或密码不正确'
        })
      } else res.send({
        state: 0,
        message: '无此用户'
      })
    }
  })
})

module.exports = router;