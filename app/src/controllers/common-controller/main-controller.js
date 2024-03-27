var main_service = require("../../services/main-service");

// 고차 함수
async function executeService(service, req, res, serviceName) {
  try {
    var result = await service(req, res);
    return result;
  } catch (error) {
    console.log(`main_controller ${serviceName} error: ${error}`);
  }
}

exports.dashboard = (req, res) => executeService(main_service.dashboard, req, res, 'dashboard');

exports.getFile = (req, res) => executeService(main_service.getFile, req, res, 'getFile');

exports.getProject = (req, res) => executeService(main_service.getProject, req, res, 'getProject');

exports.getSubproject = (req, res) => executeService(main_service.getSubproject, req, res, 'getSubproject');

exports.getPowersave = (req, res) => executeService(main_service.getPowersave, req, res, 'getPowersave');

exports.getSensorName = (req, res) => executeService(main_service.getSensorName, req, res, 'getSensorName');

exports.sensorData = (req, res) => executeService(main_service.sensorData, req, res, 'sensorData');

exports.prjectData = (req, res) => executeService(main_service.prjectData, req, res, 'prjectData');

exports.getControlCommand = (req, res) => executeService(main_service.getControlCommand, req, res, 'getControlCommand');
