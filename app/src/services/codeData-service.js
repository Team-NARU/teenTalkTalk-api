var db = require('../utils/db');
var bkfd2Password = require('pbkdf2-password');
var hasher = bkfd2Password();
var utils = require('../utils/utils');


exports.fetchData = async function(req, res) {
    try {
        // var result = await db.query('SELECT * FROM webdb.tb');
        return result;
    } catch (error) {
        console.log('codeData-controller fetchData error:'+error);
    }
};


exports.fetchPolicyData = async function(req, res) {
  var conn;
    try {
        conn = await db.getConnection();
        var query = "SELECT policy_target_code,policy_target_name,policy_institution_code,policy_institution_name FROM webdb.tb_policy_target_code, webdb.tb_policy_institution_code";
        var result = await conn.query(query);
        return result;
    } catch (error) {
        console.log('codeData-controller fetchPolicyData error:'+error);
    } finally {
      if (conn) conn.release();
    }
};


exports.getPolicyName = async function(req, res) {
  var conn;
    try {
        conn = await db.getConnection();
        var json = {};
        //정책 대상 코드
        var query = "SELECT code_detail_name, code_detail FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 6";
        json.policy_target_code = await conn.query(query);
        return json;
    } catch (error) {
        console.log('codeData-controller getPolicyName error:'+error);
    } finally {
      if(conn) conn.release();
    }
};

exports.getUserCodeName = async function(req, res) {
  var conn;
    try {
        conn = await db.getConnection();
        var json = {};
        //사용자 유형 코드
        var query = "SELECT code_detail_name, code_detail FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 1";
        json.user_type = await conn.query(query);
        var query = "SELECT code_detail_name, code_detail FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 5";
        json.emd_class_code = await conn.query(query);
        // //청소년,청소년 부모 나이 코드
        // var query = "SELECT code_detail_name, code_detail FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 2";
        // json.youthAge_code = await conn.query(query);
        // //학부모 나이 코드
        // var query = "SELECT code_detail_name, code_detail FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 3";
        // json.parentsAge_code = await conn.query(query);
        // //성별 코드
        // var query = "SELECT code_detail_name, code_detail FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 4";
        // json.sex_class_code = await conn.query(query);
        //읍면동 코드
        // console.log(json);
        return json;
    } catch (error) {
        console.log('codeData-controller getUserCodeName error:'+error);
    } finally {
      if(conn) conn.release();
    }
};

exports.getCodeData = async function(req, res) {
  var conn;
    try {
      conn = await db.getConnection();
      // 공통코드별로 상세코드를 가져와 json으로 만들어서 리턴
      var json = {};
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = '01'";
      json.user_type = await conn.query(query); // 쿼리 실행
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = '02'";
      json.youthAge_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = '03'";
      json.parentsAge_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = '04'";
      json.sex_class_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = '05'";
      json.emd_class_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = '06'";
      json.policy_target_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = '07'";
      json.policy_institution_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = '08'";
      json.policy_field_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = '09'";
      json.policy_character_code = await conn.query(query);
      var query = "select code,code_name,code_english_name, code_desc, code_use_yn from webdb.tb_common_code;"
      json.code_data_name = await conn.query(query);
      return json;
    } catch (error) {
        console.log('codeData-controller getCodeData error:'+error);
    } finally {
      if(conn) conn.release();
    }
};

exports.getCodedetail = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var code = req.params.id;
    var query = "SELECT code_detail, code_detail_name, code_detail_desc, code_detail_use_yn FROM webdb.tb_common_code_detail where code = '" + code + "'";
    var rows = await conn.query(query); // 쿼리 실행
    // console.log(rows[1].code_detail);
    // console.log(rows);
    return rows;
  }
  catch(error){
    console.log('codeData-controller getCodedetail error:'+error);
  } finally {
    if(conn) conn.release();
  }
};


exports.getCodedetail_update = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var code = req.params.id.split(":")[1];
    var detail = req.params.id.split(":")[2];
    var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn from webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = '" + code + "' and b.code_detail = '" + detail + "'";
    var rows = await conn.query(query); // 쿼리 실행
    // console.log(rows);
    return rows;
  }
  catch(error){
    console.log('codeData-controller getCodedetail_update error:'+error);
  } finally {
    if(conn) conn.release();
  }
};

exports.updateCodeDetail = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var code = req.params.id.split(":")[1];
    var detail = req.params.id.split(":")[2];
    // console.log(req.params.id);
    var { code_detail_name, code_detail_desc, code_detail_use_yn } = req.body;
    var query = "update webdb.tb_common_code_detail set code_detail_name = '" + code_detail_name + "', code_detail_desc = '" + code_detail_desc + "', code_detail_use_yn = '" + code_detail_use_yn + "' where code = '" + code + "' and code_detail = '" + detail + "'";
    // console.log(query);
    var rows = await conn.query(query); // 쿼리 실행
    // console.log(rows);
    return rows;
  } catch(error){
    console.log('codeData-controller updateCodeDetail error:'+error);
    } finally {
      if(conn) conn.release();
    }
  };

exports.insertCodeDetail = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var code = req.params.id.split(":")[1];
    var { code_detail_name, code_detail_desc, code_detail_use_yn } = req.body;
    // code_detail 최댓값 받아 오기
    var query = "select max(code_detail) from webdb.tb_common_code_detail where code = '" + code + "'";
    var max_codeDetail = await conn.query(query);
    max_codeDetail = Number(max_codeDetail[0]['max(code_detail)']) + 1;
    // console.log(max_codeDetail);
    var query = "insert into webdb.tb_common_code_detail (code, code_detail, code_detail_name, code_detail_desc, code_detail_use_yn) values ('" + code + "', '" + max_codeDetail + "', '" + code_detail_name + "', '" + code_detail_desc + "', '" + code_detail_use_yn + "')";    
    // console.log(query);
    var rows = await conn.query(query); // 쿼리 실행
    // console.log(rows);
    return rows;
  } catch(error){
    console.log('codeData-controller insertCodeDetail error:'+error);
    } finally {
      if(conn) conn.release();
    }
  };

exports.getCodeData_update = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var code = req.params.id;
    var query = "select code,code_name,code_english_name, code_desc, code_use_yn from webdb.tb_common_code where code = '" + code + "'";
    var rows = await conn.query(query); // 쿼리 실행
    // console.log(rows);
    return rows;
  } catch(error){
    console.log('codeData-controller getCodeData_update error:'+error);
    } finally {
      if(conn) conn.release();
    }
  };

exports.getEventDetail = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var event_code = req.params.id;
    var query = "select * from webdb.tb_event";
    var rows = await conn.query(query); // 쿼리 실행
    // console.log(rows);
    return rows;
  } catch(error){
    console.log('codeData-controller getEventDetail error:'+error);
  } finally {
    if(conn) conn.release();
  }
};

exports.getEventDetail_update = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var event_code = req.params.id;
    var query = "select * from webdb.tb_event where eid = '" + event_code + "'";
    var rows = await conn.query(query); // 쿼리 실행
    return rows;
  }catch(error){
    console.log('codeData-controller getEventDetail_update error:'+error);
  } finally {
    if(conn) conn.release();
  }
};

exports.updateEventDetail = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var eid = req.params.id.split(":")[1];
    var { event_name, fig_payment, event_start_date, event_end_date } = req.body;
    var query = "update webdb.tb_event set event_name = '" + event_name + "', fig_payment = '" + fig_payment + "', event_start_date = '"+event_start_date+"', event_end_date = '"+event_end_date+"' where eid = '" + eid + "'";
    var rows = await conn.query(query); // 쿼리 실행
    return rows;
  } catch(error){
    console.log('codeData-controller updateEventDetail error:'+error);
  } finally {
    if(conn) conn.release();
  }
};