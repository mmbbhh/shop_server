const express = require('express');
const router = express.Router();
let mysql = require('../config/connect');

/*router.get('/test',(req,res)=>{
  let sql="select * from m_shop_goods where id = 1006013"
  mysql.query(sql,(err,rows)=>{
    if(err){
      res.send(err)
    }
    else{
      res.send(rows)
    }
  })
})*/

router.get('/',(req,res)=>{
  const type = req.query.type
  const pages = parseInt(req.query.pages)
  let sql="select * from m_shop_goods where goods_type = " + "'" + type + "' ORDER BY goods_brief"
  mysql.query(sql,(err,rows)=>{
    if(err){
      res.send(err)
    }
    else{
      res.send(rows.slice((pages - 1) * 20,pages * 20))
    }
  })
})

//获取指定商品id信息
router.get('/detail', (req,res) => {
  const id = req.query.id
  let sql = 'select * from m_shop_goods where id =' + "'" + id + "'"
  mysql.query(sql,(err,rows)=>{
    if(err){
      res.send(err)
    }
    else{
      res.send(rows[0])
    }
  })
})

//获取随机推荐商品
router.get('/random', (req,res) => {
  const page = parseInt(req.query.page)
  let sql = 'SELECT * FROM `m_shop_goods` WHERE id >= (SELECT floor(RAND() * (SELECT MAX(id) FROM `m_shop_goods`))) ORDER BY id LIMIT 60;'
  mysql.query(sql,(err,rows)=>{
    if(err){
      res.send(err)
    }
    else{
      res.send(rows.slice((page - 1) * 20,page * 20))
    }
  })
})

//判断是否用户收藏
router.get('/collect', (req,res) => {
  const user = req.query.user
  const id = parseInt(req.query.id)
  let sql = 'SELECT * FROM m_shop_collect WHERE user_name = ' + "'" + user + "'" + ' AND goods_id = ' + "'" + id + "'"
  mysql.query(sql, (err, rows) => {
    if(err){
      res.send(err)
    }
    else{
      if (rows.length != 0) {
        res.send({
          state: 1
        })
      } else {
        res.send({
          state: 0
        })
      }
    }
  })
})

//添加收藏记录
router.get('/like', (req,res) => {
  const user = req.query.user
  const id = parseInt(req.query.id)
  let sql = 'INSERT INTO m_shop_collect (user_name, goods_id) VALUES (' + "'" + user + "', " + id + ")"
  mysql.query(sql, (err, rows) => {
    if(err){
      res.send({
        state: 0,
        message: '收藏失败'
      })
    }
    else{
      res.send({
        state: 1,
        message: '收藏成功'
      })
    }
  })
})

//删除收藏记录
router.get('/dislike', (req,res) => {
  const user = req.query.user
  const id = parseInt(req.query.id)
  let sql = 'DELETE FROM m_shop_collect WHERE user_name = ' + "'" + user + "'" + 'AND goods_id = ' + "'" + id + "'"
  mysql.query(sql, (err, rows) => {
    if(err){
      res.send({
        state: 0,
        message: '取消收藏失败'
      })
    }
    else{
      if (rows.affectedRows == 0) {
        res.send({
          state: 0,
          message: '取消收藏失败'
        })
      } else {
        res.send({
          state: 1,
          message: '取消收藏成功'
        })
      }
    }
  })
})

//获取用户收藏的商品集
router.get('/collection', (req,res) => {
  const user = req.query.user
  let sql = 'SELECT id, list_pic_url, name, market_price, retail_price, sell_volume FROM m_shop_collect LEFT JOIN m_shop_goods ON m_shop_collect.goods_id = m_shop_goods.id WHERE user_name = ' + "'" + user + "'"
  mysql.query(sql, (err, rows) => {
    if(err){
      res.send({
        state: 0,
        message: '获取失败'
      })
    }
    else{
      res.send(rows)
    }
  })
})

//添加购买记录
router.get('/buy', (req,res) => {
  const user = req.query.user
  const id = parseInt(req.query.id)
  const num = parseInt(req.query.num)
  let sql = 'INSERT INTO m_shop_order (user_name, goods_id, goods_num) VALUES (' + "'" + user + "', " + id + ',' + num + ")"
  mysql.query(sql, (err, rows) => {
    if(err){
      res.send({
        state: 0,
        message: '购买失败'
      })
    }
    else{
      res.send({
        state: 1,
        message: '购买成功'
      })
    }
  })
})

//获取用户订单记录
router.get('/order', (req,res) => {
  const user = req.query.user
  let sql = "SELECT date, list_pic_url, name, retail_price, goods_num FROM m_shop_order LEFT JOIN m_shop_goods ON m_shop_order.goods_id = m_shop_goods.id WHERE user_name = '" + user + "'"
  mysql.query(sql, (err, rows) => {
    if(err){
      res.send({
        state: 0,
        message: '获取失败'
      })
    }
    else{
      res.send(rows)
    }
  })
})
module.exports = router;