var dataif_service = require("../../services/dataif-service");

// 고차 함수
async function executeService(service, req, res, serviceName) {
  try {
    var result = await service(req, res);
    return result;
  } catch (error) {
    console.log(`dataif-controller ${serviceName} error: ${error}`);
  }
}

// 인자가 여러 개인 경우에 실행하는 고차 함수
async function executeMultipleArgsService(service, serviceName, ...args) {
  try {
    var result = await service(...args);
    return result;
  } catch (error) {
    console.log(`dataif-controller ${serviceName} error: ${error}`);
  }
}

exports.fetchData = (req, res) => executeService(dataif_service.fetchData, req, res, 'fetchData');

exports.fetchFigUsageByUid = (req, res) => executeService(dataif_service.fetchFigUsageByUid, req, res, 'fetchFigUsageByUid');

exports.fetchEventPartByUid = (req, res) => executeService(dataif_service.fetchEventPartByUid, req, res, 'fetchEventPartByUid');

exports.resetPW = (req, res) => executeService(dataif_service.resetPW, req, res, 'resetPW');

exports.fetchDataByUserid = (req, res) => executeService(dataif_service.fetchDataByUserid, req, res, 'fetchDataByUserid');

exports.fetchTermData = (req, res) => executeService(dataif_service.fetchTermData, req, res, 'fetchTermData');

exports.updateTermData = (req, res) => executeService(dataif_service.updateTermData, req, res, 'updateTermData');

exports.fetchDataUserUpdate = (req, res) => executeService(dataif_service.fetchDataUserUpdate, req, res, 'fetchDataUserUpdate');

exports.update = (req, res) => executeService(dataif_service.update, req, res, 'update');


exports.deleteUser = (req, res) => executeService(dataif_service.deleteUser, req, res, 'deleteUser');

exports.excelData = (...args) => executeMultipleArgsService(dataif_service.excelData, 'excelData', ...args);

// 개발 제안 이메일 전송
// exports.sendSuggestionEmail = (req, res) => executeService(dataif_service.sendSuggestionEmail, req, res, 'sendSuggestionEmail');
exports.sendSuggestionEmail = async function(req, res){
  try{
    var result = await dataif_service.sendSuggestionEmail(req);
    return result;
  } catch(error) {
    console.log('dataif-controller sendSuggestionEmail:'+error);
  }
}


// 문의사항 등록
exports.submitInquiry = (req, res) => executeService(dataif_service.submitInquiry, req, res, 'submitInquiry');


// 테스트
exports.findID = (req, res) => executeService(dataif_service.findID, req, res, 'findID');