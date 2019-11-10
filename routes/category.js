const express = require('express');
const router = express.Router();
let mysql = require('../config/connect');

//返回分类商品
router.get('/',(req,res)=>{
  let sql="SELECT id, category_id, category_name, name, primary_pic_url FROM m_shop_goods"
  mysql.query(sql,(err,rows)=>{
    if(err){
      res.send(err)
    }
    else{
      res.send(rows)
    }
  })
})

module.exports = router;