const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    success: '成功了',
    a: __dirname
  });
});

router.get('/Banner', function(req, res, next) {
  const list = [
    {id: '001',imgUrl: 'http://127.0.0.1:3000/images/swiper/lb1.jpg', link: 'https://www.baidu.com'},
    {id: '002',imgUrl: 'http://127.0.0.1:3000/images/swiper/lb2.jpg', link: 'https://www.baidu.com'},
    {id: '003',imgUrl: 'http://127.0.0.1:3000/images/swiper/lb3.jpg', link: 'https://www.baidu.com'},
    {id: '004',imgUrl: 'http://127.0.0.1:3000/images/swiper/lb4.jpg', link: 'https://www.baidu.com'}
  ]
  res.send(list);
});

router.get('/Recommend', function (req, res, next) {
  const list = [
    {title: '9.9包邮',imgUrl: 'http://127.0.0.1:3000/images/recommend/1.png', link: 'https://www.baidu.com'},
    {title: '特价清仓',imgUrl: 'http://127.0.0.1:3000/images/recommend/2.png', link: 'https://www.baidu.com'},
    {title: '1元福利',imgUrl: 'http://127.0.0.1:3000/images/recommend/3.png', link: 'https://www.baidu.com'},
    {title: '惊喜大礼',imgUrl: 'http://127.0.0.1:3000/images/recommend/4.png', link: 'https://www.baidu.com'}
    ]
  res.send(list)
})

router.get('/News', function (req, res, next) {
  const news = {
    imgUrl: 'http://127.0.0.1:3000/images/feature/view.jpg',
    link: 'https://www.baidu.com'
  }
  res.send(news)
})
module.exports = router;