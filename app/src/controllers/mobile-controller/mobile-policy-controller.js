var db = require('../../utils/db');
var mobile_policy_service = require("../../services/mobile-services/mobile-policy-service");



exports.getAllPolicy = async function(req, res) {
    try{
        var result = await mobile_policy_service.getAllPolicy(req,res);
        // console.log(result);
        return result;
      } catch(error) {
        console.log('policy-controller getAllPolicy:'+error);
      }
    };

exports.getPolicyById = async function(req, res) {
  try{
      var result = await mobile_policy_service.getPolicyById(req,res);
      // console.log(result);
      return result;
    } catch(error) {
      console.log('policy-controller getPolicyById:'+error);
    }
  };





exports.getSearchPolicy = async function(req, res) {
  try{
    var result = await mobile_policy_service.getSearchPolicy(req, res);
    // console.log('mobile-policy-controller getSearchPolicy:');
    return result;
  } catch (error){
    console.log('policy-controller getSearchPolicy:'+error);
  }
}

exports.getPolicyBySelect = async function(req, res) {
  try{
    var result = await mobile_policy_service.getPolicyBySelect(req, res);
    // console.log('mobile-policy-controller getPolicyBySelect');
    return result;
  } catch (error){
    console.log('policy-controller getPolicyBySelect:'+error);
  }
}

exports.getAllPolicyForSearch = async function(req, res) {
  try{
      var result = await mobile_policy_service.getAllPolicyForSearch(req,res);
      // console.log(result);
      return result;
    } catch(error) {
      console.log('policy-controller getAllPolicyForSearch:'+error);
    }
  };



exports.scrapOrUnscrapPolicy = async function(req, res) {
  try{
    var result = await mobile_policy_service.scrapOrUnscrapPolicy(req, res);
    return result;
  } catch(error) {
    console.log('mobile-policy-controller scrapOrUnscrapPolicy:'+error);
  }
};

exports.getScrappedPolicy = async function(req, res) {
  try{
      var result = await mobile_policy_service.getScrappedPolicy(req,res);
      // console.log(result);
      return result;
    } catch(error) {
      console.log('policy-controller getAllPolicy:'+error);
    }
  };

  exports.checkPolicyScrapped = async function(req, res) {
    try{
        var result = await mobile_policy_service.checkPolicyScrapped(req,res);
        // console.log(result);
        return result;
      } catch(error) {
        console.log('policy-controller checkPolicyScrapped:'+error);
      }
    };

  
