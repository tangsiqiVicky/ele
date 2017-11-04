var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port
var app = express()
var router = express.Router()

router.get('/', function (req, res, next) {
    req.url = '/index.html'
    next()
})

app.use(router)

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

const apiRouter = express.Router()
apiRouter.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

apiRouter.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

apiRouter.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})
var uri = 'http://localhost:' + port
app.use('/api', apiRouter)
app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('> Listening at ' + uri + '\n')
})
