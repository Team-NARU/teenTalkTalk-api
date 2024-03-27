const path = require("path");
var express = require("express");
var router = express.Router();
var mobile_codeData_controller = require("../../controllers/mobile-controller/mobile-codeData-controller")

const passport = require('passport');
const generateJsonWebToken = require("../../lib/generate_jwt");
const verifyToken = require("../../middleware/verify_token");

// 코드
router.get('/get-code-data', async function(req, res){
    try{
      var result = await mobile_codeData_controller.getCodeData(req, res);
      // console.log(result);
      res.json({
        resp:true,
        message : 'get code data',
        codes : result
      })
    } catch(error){
      console.log('policy-router get-code-data error:'+error);
      res.json({
        resp:false,
        message : 'Failure get code data'
      })
    }
  });

  // 이벤트 코드
  router.get('/get-event-data', async function(req, res){
    try{
      var result = await mobile_codeData_controller.getEventData(req, res);
      // console.log(result);
      res.json({
        resp:true,
        message : 'get event data',
        eventData : result
      })
    } catch(error){
      console.log('policy-router get-event data error:'+error);
      res.json({
        resp:false,
        message : 'Failure get event data'
      })
    }
  });
  
  module.exports = router;