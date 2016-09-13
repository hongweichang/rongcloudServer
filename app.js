var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var userTokenRouter=require('./routes/server.js');

var app = express();
var AV =require('leanengine');

AV.init({

    appId: process.env.LEANCLOUD_APP_ID || 'y1KkcjF85x9lUfUql65GAXap-gzGzoHsz', // 你的 app id
    appKey: process.env.LEANCLOUD_APP_KEY || '75RfYQQlCrA3hXC8NDQTDLkp', // 你的 app key
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'awfx3dYCleNRAoN5vKI88Eph' // 你的 master key
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/token',userTokenRouter);


// 健康监测 router
app.use('/__engine/1/ping', function(req, res) {
    res.end(JSON.stringify({
        "runtime": "nodejs-" + process.version,
        "version": "custom"
    }));
});

// 云函数列表
app.get('/1.1/_ops/functions/metadatas', function(req, res) {
    res.end(JSON.stringify([]));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
