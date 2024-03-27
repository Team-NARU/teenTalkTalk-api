var db = require('../../utils/db');
// var bkfd2Password = require('pbkdf2-password');
// var utils = require('../../utils/utils');


exports.fetchData = async function(req, res) {
    try {
        // var result = await db.query('SELECT * FROM webdb.tb');
        return result;
    } catch (error) {
        console.log('codeData-controller fetchData error:'+error);
    } finally {
      if(conn) conn.release();
    }
};


exports.fetchPolicyData = async function(req, res) {
    try {
        var result = await db.query('SELECT policy_target_code,policy_target_name,policy_institution_code,policy_institution_name FROM webdb.tb_policy_target_code, webdb.tb_policy_institution_code');
        // var result = await db.query('SELECT policy_target_code,policy_target_name FROM webdb.tb_policy_target_code,webdb.tb_policy_institution_code,webdb.tb_policy_character_code,webdb.tb_policy_field_code');
        return result;
    } catch (error) {
        console.log('codeData-controller fetchPolicyData error:'+error);
    } finally {
      if(conn) conn.release();
    }
}


exports.getCodeData = async function(req, res) {
    try {
      conn = await db.getConnection();
      // 공통코드별로 상세코드를 가져와 json으로 만들어서 리턴
      var json = {};
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 1";
      json.user_type = await conn.query(query); // 쿼리 실행
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 2";
      json.youthAge_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 3";
      json.parentsAge_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 4";
      json.sex_class_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 5";
      json.emd_class_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 6";
      json.policy_target_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 7";
      json.policy_institution_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 8";
      json.policy_field_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 9";
      json.policy_character_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 10";
      json.withdrawal_reason_code = await conn.query(query);
      var query = "SELECT b.code_detail, b.code_detail_name, b.code_detail_desc, b.code_detail_use_yn , a.code_english_name, a.code_desc, a.code_name, a.code_use_yn  FROM webdb.tb_common_code as a inner join webdb.tb_common_code_detail as b on a.code = b.code where a.code = 11";
      json.question_type_code = await conn.query(query);
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

exports.getEventData = async function(req, res) {
  try{
    conn = await db.getConnection();
    var eid = req.params.eid;
    // console.log('getEventData db connection');
    var query = "SELECT eid, event_name, fig_payment, event_start_date, event_end_date FROM webdb.tb_event";
    var rows = await conn.query(query); // 쿼리 실행
    // console.log(rows);
    return rows;
  }
  catch(error){
    console.log('codeData-controller getEvents error:'+error);
  } finally {
    if(conn) conn.release();
  }
};


