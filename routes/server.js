var express = require('express');

var bodyParser = require('body-parser');
var userTokenRouter = express.Router();

var rongcloudSdk = require('rongcloud-sdk');
//rongcloudSdk.init('uwd1c0sxdu7b1', 'ObBMPjIPNx');
//QBmk3Xp01Gvc

rongcloudSdk.init('uwd1c0sxdu7b1', 'ObBMPjlPNx');



userTokenRouter.use(bodyParser.json());

userTokenRouter.route('/')
    .post(function(req, res, next) {
        var userId = req.body.xiaoqiangId;
        var userName = req.body.xiaoruiName;
        var url = req.body.url;
        console.log(userId + userName + url);
        rongcloudSdk.user.getToken(userId, userName, url, function(err, resultText) {
            if (err) {
                console.log(err);
            } else {
                var result = JSON.parse(resultText);
                if (result.code == 200) {
                    res.end(resultText);
                }
            }
        });

    })
    .get(function(req, res, next) {
        res.end('wtf');
    });

module.exports = userTokenRouter;
