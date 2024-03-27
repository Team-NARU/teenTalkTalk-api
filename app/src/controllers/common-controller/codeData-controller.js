var code_service = require("../../services/codeData-service");

// 고차 함수
async function executeService(service, req, res, serviceName) {
  try {
    var result = await service(req, res);
    return result;
  } catch (error) {
    console.log(`code-controller ${serviceName} error: ${error}`);
  }
}
exports.fetchData = (req, res) => executeService(code_service.fetchData, req, res, 'fetchData');
exports.fetchPolicyData = (req, res) => executeService(code_service.fetchPolicyData, req, res, 'fetchPolicyData');
exports.getPolicyName = (req, res) => executeService(code_service.getPolicyName, req, res, 'getPolicyName');
exports.getCodeData = (req, res) => executeService(code_service.getCodeData, req, 'getCodeData');
exports.getUserCodeName = (req, res) => executeService(code_service.getUserCodeName, req, 'getUserCodeName');
exports.getCodedetail = (req, res) => executeService(code_service.getCodedetail, req, 'getCodedetail');
exports.getCodedetail_update = (req, res) => executeService(code_service.getCodedetail_update, req, 'getCodedetail_update');
exports.updateCodeDetail = (req, res) => executeService(code_service.updateCodeDetail, req, 'updateCodeDetail');
exports.insertCodeDetail = (req, res) => executeService(code_service.insertCodeDetail, req, 'insertCodeDetail');
exports.getCodeData_update = (req, res) => executeService(code_service.getCodeData_update, req, 'getCodeData_update');
exports.getEventDetail = (req, res) => executeService(code_service.getEventDetail, req, 'getEventDetail');
exports.getEventDetail_update = (req, res) => executeService(code_service.getEventDetail_update, req, 'getEventDetail_update');
exports.updateEventDetail = (req, res) => executeService(code_service.updateEventDetail, req, 'updateEventDetail');