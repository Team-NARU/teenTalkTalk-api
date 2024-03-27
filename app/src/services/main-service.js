const { on } = require('../utils/db');
var db = require('../utils/db');
var utils = require('../utils/utils');

/*
exports.GetJsonList = async function(req, res) {
    var conn = await db.getConnection();
    var rows = await conn.query('SELECT * FROM cin'); // 쿼리 실행
    var rtnRslt = rows[0];
    //console.log(rows[0]);
    if(rtnRslt==undefined) rtnRslt = 0;
    return rtnRslt;
};
*/

// 게시판
exports.dashboard = async function(req, res) {
  var resultcode = 0;
  var conn;
  try{
    conn = await db.getConnection();
    var userid = req.body.userid;
    var password = req.body.password;
    var name = req.body.name;
    var query = "SELECT userid, userpw, user_name, salt FROM webdb.member where userid='" + userid + "';";
    var rows = await conn.query(query); // 쿼리 실행
    if (rows[0] == undefined) {
      resultcode = 1;
    } else {
      if (rows[0].userpw == undefined) resultcode = 2;
      else resultcode = 3;
    }
  } catch(error) {
    console.log('main-service dashboard:'+error);
  } finally {
    if (conn) conn.release();
  }
  
  return resultcode;
};

exports.getFile = async function(req, res) {
  var resultData;
  var conn;
  try{
    conn = await db.getConnection();
    var queryStr = [req.query.board_idx, req.query.file_no, req.query.board_type];

    var query = "SELECT mime_type, org_file_name, file_size, file_path FROM webdb.tb_file where board_idx=? and file_no=? and board_type=?";
    var rows = await conn.query(query, queryStr); // 쿼리 실행
    resultData=rows[0];
  } catch(error) {
    console.log('main-service getFile:'+error);
  } finally {
    if (conn) conn.release();
  }
  
  return resultData;
};

exports.getProject = async function(req, res) {
  var resultData;
  var conn;
  try{
    conn = await db.getConnection();
    var query = "SELECT board_idx, board_subject FROM webdb.tb_project order by board_idx desc";

    if(req.user)
      if(req.user.user_type=="9")
        query = 'SELECT board_idx, board_subject FROM webdb.tb_project order by board_idx desc';
      else
        query = 'SELECT distinct a.board_idx, a.board_subject FROM webdb.tb_project a left outer join webdb.tb_file b on a.board_idx=b.board_idx and board_type="tb_project" '
            +'where EXISTS(SELECT 1 FROM webdb.tb_project where ins_id="'+req.user.userid+'" and board_idx=a.board_idx) or a.ins_id="'+req.user.userid+'" or EXISTS(SELECT 1 FROM webdb.tb_usergrp e inner join webdb.tb_usergrpdtl b on e.board_idx=b.usergrp_board_idx inner join webdb.tb_user c on b.usr_board_idx=c.board_idx inner join webdb.tb_access d on d.usergrp_board_idx=e.board_idx and d.board_type="tb_project" where c.userid="'+req.user.userid+'" and d.access_type in ('+utils.auth('sub').join()+') and d.tb_board_idx=a.board_idx) order by a.board_idx desc';

    var rows = await conn.query(query); // 쿼리 실행
    resultData=rows;
  } catch(error) {
    console.log('main-service getProject:'+error);
  } finally {
    if (conn) conn.release();
  }
  
  return resultData;
};

exports.getSubproject = async function(req, res) {
  var resultData;
  var conn;
  try{
    conn = await db.getConnection();
    var queryStr = [req.params.id];

    var query = "SELECT board_idx, board_subject FROM webdb.tb_subproject where prj_board_idx=? order by board_idx desc";
    var rows = await conn.query(query, queryStr); // 쿼리 실행
    resultData=rows;
  } catch(error) {
    console.log('main-service getSubproject:'+error);
  } finally {
    if (conn) conn.release();
  }
  
  return resultData;
};

exports.getPowersave = async function(req, res) {
  var resultData;
  var conn;
  try{
    conn = await db.getConnection();
    var query = "SELECT senid, sendatetime, sendata FROM appdb.sensor where sendata!='' order by transid desc limit 30";
    var rows = await conn.query(query); // 쿼리 실행

    //console.log(JSON.parse(rows[0].sendata)[0].MsgID);

    resultData=rows;
  } catch(error) {
    console.log('main-service getSubproject:'+error);
  } finally {
    if (conn) conn.release();
  }
  
  return resultData;
};

exports.getSensorName = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var query = 'SELECT board_idx, sen_name FROM webdb.tb_device where sen_grp="'+req.body.sen_grp+'" and prj_grp="'+req.body.prj_grp+'"';
    var rows = await conn.query(query); // 쿼리 실행
    var post=rows;

    return post;
  } catch(error) {
    console.log('main-service getSensorName:'+error);
  } finally {
    if (conn) conn.release();
  }
};

exports.sensorData = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var query = '(SELECT file_type, a.*, file_no, mime_type, org_file_name, file_size, file_path, board_type FROM webdb.tb_device a left outer join webdb.tb_file b on a.board_idx=b.board_idx and board_type="tb_device" and file_type="img" where sen_grp="0001" order by board_idx desc limit 2)'
    +' union '
    + '(SELECT file_type, a.*, file_no, mime_type, org_file_name, file_size, file_path, board_type FROM webdb.tb_device a left outer join webdb.tb_file b on a.board_idx=b.board_idx and board_type="tb_device" and file_type="img" where sen_grp="0002" order by board_idx desc limit 2)';
    var rows = await conn.query(query); // 쿼리 실행
    var posts=[];
    var arr=['board_idx', 'sen_cntnt', 'sen_name', 'ins_id', 'ins_date', 'manufact', 'model_nm', 'sen_type', 'sen_url', 'prj_grp', 'sen_grp'];
    var flearr=['file_type', 'file_no', 'mime_type', 'org_file_name', 'file_size', 'file_path', 'board_type'];
    var board_idx='';
    var row_board_idx='';
    var file_type='';
    var post={};
    var file={};
    var postNo=0;
    var fileNo=0;
    for(var idx=0;idx<rows.length;idx++){
      var rowdata=rows[idx];
      row_board_idx=rowdata.board_idx;
      if(board_idx!=row_board_idx && post.board_idx){
        posts[postNo]=post;
        postNo++;
        fileNo=0;
        post={};
      }

      for(key in rowdata)
        if(arr.indexOf(key)>-1){
          post[key]=rowdata[key];
          board_idx=rowdata.board_idx;
        }
        else{
          file_type=rowdata.file_type;
          if(flearr.indexOf(key)>-1 && file_type=='img') post[key]=rowdata[key];
          else if(flearr.indexOf(key)>-1 && file_type=='spc') {
            if(post.spc==undefined) post.spc={}
            post.spc[key]=rowdata[key];
          }
          else file[key]=rowdata[key];
        }

      if(fileNo==0) post.file=[];
      if(file.file_type) post.file.push(file);
      fileNo++;
      file={};
    }
    if(post.board_idx) posts[postNo]=post;
    //console.log(posts)
    return posts;
  } catch(error) {
    console.log('main-service sensorData:'+error);
  } finally {
    if (conn) conn.release();
  }

};

exports.prjectData = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var query = 'SELECT file_type, a.*, file_no, mime_type, org_file_name, file_size, file_path, board_type FROM webdb.tb_project a left outer join webdb.tb_file b on a.board_idx=b.board_idx and board_type="tb_project" where read_auth="Y" order by a.board_idx desc';

    var rows = await conn.query(query); // 쿼리 실행
    var posts=[];
    var arr=['access_type', 'board_idx', 'board_content', 'board_subject', 'cnt', 'ins_id', 'ins_date'];
    var flearr=['file_type', 'file_no', 'mime_type', 'org_file_name', 'file_size', 'file_path', 'board_type'];
    var board_idx='';
    var row_board_idx='';
    var file_type='';
    var post={};
    var file={};
    var postNo=0;
    var fileNo=0;
    for(var idx=0;idx<rows.length;idx++){
      var rowdata=rows[idx];
      row_board_idx=rowdata.board_idx;
      if(board_idx!=row_board_idx && post.board_idx){
        posts[postNo]=post;
        postNo++;
        fileNo=0;
        post={};
        if(postNo==2) break;
      }
      for(key in rowdata)
        if(arr.indexOf(key)>-1){
          if(key=='access_type'){
            var acty=rowdata[key];
            if(acty>7) post.readauth=true;
            if(utils.auth('mod').indexOf(Number(acty))>-1) post.modiauth=true;
            if(utils.auth('del').indexOf(Number(acty))>-1) post.delauth=true;
            if(utils.auth('sub').indexOf(Number(acty))>-1) post.subregauth=true;
          } else if(key=='ins_id') {
            if(req.user)
              if(rowdata[key]==req.user.userid) {
                post.readauth=true;
                post.modiauth=true;
                post.delauth=true;
                post.subregauth=true;
              }
          }
          post[key]=rowdata[key];
          board_idx=rowdata.board_idx;
        }
        else{
          if(key=='file_type') file_type=rowdata[key];
          if(flearr.indexOf(key)>-1 && file_type=='img') post[key]=rowdata[key];
          else file[key]=rowdata[key];
        }

      if(fileNo==0) post.file=[];
      if(file.file_type) post.file.push(file);
      fileNo++;
      file={};
    }
    if(post.board_idx) posts[postNo]=post;
    //console.log(posts)
    return posts;
  } catch(error) {
    console.log('projectboard-service fetchData:'+error);
  } finally {
    if (conn) conn.release();
  }
};

exports.getControlCommand = async function(req, res) {
  var conn;
  try{
    conn = await db.getConnection();
    var query = 'SELECT ctrl_cmd FROM webdb.tb_sensor where sen_mng_no="'+req.body.sensorid+'"';
    var rows = await conn.query(query); // 쿼리 실행
    var post=rows[0];

    return post;
  } catch(error) {
    console.log('main-service getControlCommand:'+error);
  } finally {
    if (conn) conn.release();
  }
};