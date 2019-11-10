const express = require('express');
const router = express.Router();
const mysql = require('../config/connect');
const md5 = require('md5-node')


router.get('/',(req, res, next)=>{
  let userName = req.query.username
  let password = md5(req.query.password)
  let sex = req.query.sex
  let tele = req.query.tel
  let sql1 = 'SELECT * FROM m_shop_user WHERE user_name =' + "'" + userName + "'"
  let sql2 = 'INSERT INTO m_shop_user (user_name, user_pwd, user_phone, user_sex) VALUES (' + "'" + userName + "'" + "," + "'" + password + "'" + ',' + "'" + tele + "'" + ',' + "'" + sex + "')"

  new Promise((resolve, reject) => {
    mysql.query(sql1, (err, rows) => {
      if(err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  }).then(rows => {
    if (rows[0]) {
      res.send({
        state: 0,
        message: '该用户名已被注册！'
      })
    } else {
      new Promise((resolve, reject) => {
        mysql.query(sql2, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      }).then(rows => {
        res.send({
          state: 1,
          message: '注册成功'
        })
      },err => {
        console.log(err)
        res.send({
          state: 0,
          err: '密码不能含有特殊字符'})
      })
    }
  },err => {
    console.log(err)
    res.send({
      state: 0,
      err: '用户名不能含有特殊字符'})
  })
})

module.exports = router;