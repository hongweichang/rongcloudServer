var express = require('express');

var bodyParser = require('body-parser');
var userTokenRouter=express.Router();

var rongcloudSdk = require('rongcloud-sdk');
rongcloudSdk.init('uwd1c0sxdu7b1', 'ObBMPjIPNx');



userTokenRouter.use(bodyParser.json());

useTockenRouter.route('/')
    .post(function(req,res,next){
        var userId = req.body.xiaoqiangId + "";
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

    });

module.exports=userTokenRouter;
