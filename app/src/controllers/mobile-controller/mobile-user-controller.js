var mobile_user_service = require("../../services/mobile-services/mobile-user-service");


exports.getUserById = async function(req, res) {
    try{
      var result = await mobile_user_service.getUserById(req, res);
      return result;
    } catch(error) {
      console.log('mobile-user-controller get user by id:'+error);
    }
  }

exports.changePassword = async function(req, res){
  try{
    var result = await mobile_user_service.changePassword(req, res);
    return result;
  } catch(error) {
    console.log('mobile-user-controller change password:'+error);
  }
}

exports.changeEmail = async function(req, res){
  try{
    var result = await mobile_user_service.changeEmail(req, res);
    return result;
  } catch(error) {
    console.log('mobile-user-controller change email:'+error);
  }
}

exports.changeExtraInfo = async function(req, res){
  try{
    var result = await mobile_user_service.changeExtraInfo(req, res);
    return result;
  } catch(error) {
    console.log('mobile-user-controller change extra info:'+error);
  }
}

exports.getFigCount = async function(req, res){
  try{
    var result = await mobile_user_service.getFigCount(req, res);
    return result;
  } catch(error) {
    console.log('mobile-user-controller get fig count:'+error);
  }
}

exports.saveWithdrawalLog =  async function(req, res){
  try{
    var result = await mobile_user_service.saveWithdrawalLog(req, res);
    return result;
  } catch(error) {
    console.log('mobile-user-controller save withdrawal log:'+error);
  }
}

exports.deleteUser = async function(req, res){
  try{
    var result = await mobile_user_service.deleteUser(req, res);
    return result;
  } catch(error) {
    console.log('mobile-user-controller delete user:'+error);
  }
}