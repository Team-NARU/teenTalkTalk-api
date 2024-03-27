const path = require("path");
var express = require("express");
var router = express.Router();
var code_controller = require("../../controllers/common-controller/codeData-controller");

const ensureAuth = require("../../utils/middleware/ensureAuth");
const asyncHandler = require("../../utils/middleware/asyncHandler");

router.get('/show', ensureAuth, asyncHandler(async function (req, res) {
    var code_data = await code_controller.getCodeData(req, res);
    res.render('codeData/show', {
        code_data:code_data,
    });
}, 'codeData-router show/ error:'));

router.get('/update/:id', ensureAuth, asyncHandler(async function (req, res) {
    var code_data = await code_controller.getCodeData_update(req, res);
    res.render('codeData/update', {
        code_data:code_data,
        params:req.params.id,
    });
}, 'codeData-router update/ error:'));

router.get('/detail/update/:id', ensureAuth, asyncHandler(async function (req, res) {
    var code_data = await code_controller.getCodedetail_update(req, res);
    var common_code = req.params.id.split(':')[1]; //공통 코드
    var detail_code = req.params.id.split(':')[2]; //상세 코드
    res.render('codeData/detailUpdate', { //상세 코드 수정 페이지
        code_data:code_data,
        params:req.params.id,
        common_code:common_code,
        detail_code:detail_code,
    });
}, 'codeData-router detailUpdate/ error:'));

router.post('/detail/update/:id', asyncHandler(async function (req, res) {
    var code_data = await code_controller.updateCodeDetail(req, res);
    var common_code = req.params.id.split(':')[1];
    var detail_code = req.params.id.split(':')[2];
    res.redirect('/admin/codeData/detail/'+common_code+'');
}, 'codeData-router detailUpdate/ error:'));

router.get('/detail/:id', ensureAuth, asyncHandler(async function (req, res) {
    var code_data = await code_controller.getCodedetail(req, res);
    res.render('codeData/detail', {
        code_data:code_data,
        params:req.params.id,
    });
}, 'codeData-router detail/ error:'));

router.post('/detail/insert/:id', asyncHandler(async function (req, res) {
    var code_data = await code_controller.insertCodeDetail(req, res);
    res.redirect('/admin/codeData/detail/'+req.params.id.split(':')[1]+'');
}, 'codeData-router detail insert/ error:'));

router.get('/eventDetail', ensureAuth, asyncHandler(async function (req, res) {
    var code_data = await code_controller.getEventDetail(req, res);
    res.render('codeData/eventDetail', {
        code_data:code_data,
    });
}, 'codeData-router eventDetail/ error:'));

router.get('/eventDetail/update/:id', ensureAuth, asyncHandler(async function (req, res) {
    var code_data = await code_controller.getEventDetail_update(req, res);
    // 접수 기간
    var start_month = code_data[0].event_start_date.getMonth()+1;
    if(start_month < 10) start_month = '0'+start_month;
    var start_date = code_data[0].event_start_date.getDate();
    if(start_date < 10) start_date = '0'+start_date;
    var start_day = code_data[0].event_start_date.getFullYear()+'-'+start_month+'-'+start_date;
    var end_month = code_data[0].event_end_date.getMonth()+1;
    if(end_month < 10) end_month = '0'+end_month;
    var end_date = code_data[0].event_end_date.getDate();
    if(end_date < 10) end_date = '0'+end_date;
    var end_day = code_data[0].event_end_date.getFullYear()+'-'+end_month+'-'+end_date;
    res.render('codeData/eventDetailUpdate', {
        code_data:code_data,
        params:req.params.id,
        start_date:start_day,
        end_date:end_day,
    });
}, 'codeData-router eventDetailUpdate/ error:'));
router.post('/eventDetail/update/:id', asyncHandler(async function (req, res) {
    var code_data = await code_controller.updateEventDetail(req, res);
    res.redirect('/admin/codeData/eventDetail');
}, 'codeData-router eventDetailUpdate/ error:'));

module.exports = router;