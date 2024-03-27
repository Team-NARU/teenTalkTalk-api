var policy_service = require("../../services/policy-service");

// 고차 함수
async function executeService(service, req, res, serviceName) {
  try {
    var result = await service(req, res);
    return result;
  } catch (error) {
    console.log(`policy-controller ${serviceName} error: ${error}`);
  }
}

exports.upload = (req, res) => executeService(policy_service.upload, req, res, 'upload');

exports.fetchpolicyByidx = (req, res) => executeService(policy_service.fetchpolicyByidx, req, res, 'fetchpolicyByidx');

exports.updatePolicy = (req, res) => executeService(policy_service.updatePolicy, req, res, 'updatePolicy');

exports.deletePolicy = (req, res) => executeService(policy_service.deletePolicy, req, res, 'deletePolicy');

exports.fetchpolicyImgByidx = (req, res) => executeService(policy_service.fetchpolicyImgByidx, req, res, 'fetchpolicyImgByidx');

exports.banner = (req, res) => executeService(policy_service.banner, req, res, 'banner');

exports.fetchBannerData = (req, res) => executeService(policy_service.fetchBannerData, req, res, 'fetchBannerData');

exports.deleteBanner = (req, res) => executeService(policy_service.deleteBanner, req, res, 'deleteBanner');

exports.fetchBannerImg = (req, res) => executeService(policy_service.fetchBannerImg, req, res, 'fetchBannerImg');

exports.fetchData = (req, res) => executeService(policy_service.fetchData, req, res, 'fetchData');

exports.fetchCodeData = (req, res) => executeService(policy_service.fetchCodeData, req, res, 'fetchCodeData');

exports.regTest = (req, res) => executeService(policy_service.regTest, req, res, 'regTest');

exports.fetchpolicy = (req, res) => executeService(policy_service.fetchpolicy, req, res, 'fetchpolicy');