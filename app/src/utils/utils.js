const nodemailer = require('nodemailer');
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: "****@gmail.com",
      pass: "****"
  },
  tls: {
      rejectUnauthorized: false
  }
});

exports.makeInsertQuery = function(req, res) {
  var queryStr='';
  const ordered = {};
  Object.keys(req.body).sort().forEach(function(key) {
    ordered[key] = req.body[key];
  });
  for(key in ordered)
    if(key=='board_content') queryStr += '"'+mysql_real_escape_string(ordered[key])+'",';
    else queryStr += '"'+ordered[key] + '",';
  //console.log(queryStr.substr(0,queryStr.length-1))
  queryStr=queryStr.substr(0,queryStr.length-1);
  return queryStr;
};

exports.makeInsertFieldQuery = function(req, res) {
  var queryStr='';
  var ctntArr=['board_content', 'sen_cntnt', 'req_dtl'];
  const ordered = {};
  var fieldArr=req.body.fieldArr;
  Object.keys(req.body).sort().forEach(function(key) {
    if(fieldArr.indexOf(key)>-1)
      ordered[key] = req.body[key];
  });
  for(key in ordered)
    if(ctntArr.indexOf(key)>-1) queryStr += '"'+mysql_real_escape_string(ordered[key])+'",';
    else if(key.indexOf('_date')>-1) queryStr += '"'+ordered[key].replace(/-/g,'')+'",';
    else queryStr += '"'+ordered[key] + '",';
  //console.log(queryStr.substr(0,queryStr.length-1))
  if(fieldArr.indexOf('ins_id')>-1) queryStr += '"'+req.user.userid+'"';
  else queryStr=queryStr.substr(0,queryStr.length-1);
  return queryStr;
};

exports.makeUpdateQuery = function(req, res) {
  var queryStr='';
  var whereStr;
  const ordered = {};
  Object.keys(req.body).sort().forEach(function(key) {
    ordered[key] = req.body[key];
  });
  whereStr=' where id=\"'+req.params.id+'\"';
  for(key in ordered)
    queryStr += key+'=\"'+ordered[key] + '\",';
  queryStr=queryStr.substr(0,queryStr.length-1);
  //queryStr=queryStr+'updated_at=now()'+whereStr;
  queryStr=queryStr+whereStr;
  //console.log(queryStr)
  return queryStr;
};

exports.makeBoardUpdateQuery = function(req, res) {
  var queryStr='';
  var whereStr;
  var arr=['delFle'];
  const ordered = {};
  Object.keys(req.body).sort().forEach(function(key) {
    if(arr.indexOf(key)==-1)
      ordered[key] = req.body[key];
  });
  whereStr=' where board_idx=\"'+req.params.id+'\"';
  for(key in ordered) //queryStr += key+'=\"'+ordered[key] + '\",';
    if(key=='board_content' || key=='sen_cntnt') queryStr += key+'=\"'+mysql_real_escape_string(ordered[key]) + '\",';
    else queryStr += key+'=\"'+ordered[key] + '\",';
  queryStr=queryStr.substr(0,queryStr.length-1);
  //queryStr=queryStr+'updated_at=now()'+whereStr;
  queryStr=queryStr+whereStr;
  //console.log(queryStr)
  return queryStr;
};

exports.makeBoardUpdateFieldQuery = function(req, res) {
  var ctntArr=['board_content', 'sen_cntnt', 'req_dtl'];
  var queryStr='';
  var whereStr;
  const ordered = {};
  var fieldArr=req.body.fieldArr;
  Object.keys(req.body).sort().forEach(function(key) {
    if(fieldArr.indexOf(key)>-1)
      ordered[key] = req.body[key];
  });
  whereStr=' where board_idx=\"'+req.params.id+'\"';
  for(key in ordered) //queryStr += key+'=\"'+ordered[key] + '\",';
    if(ctntArr.indexOf(key)>-1) queryStr += key+'=\"'+mysql_real_escape_string(ordered[key]) + '\",';
    else if(key.indexOf('_date')>-1) queryStr += key+'=\"'+ordered[key].replace(/-/g,'') + '\",';
    else if(key.indexOf('data_cnt')>-1) queryStr += key+'='+ordered[key] + ',';
    else queryStr += key+'=\"'+ordered[key] + '\",';
  queryStr=queryStr.substr(0,queryStr.length-1);
  //queryStr=queryStr+'updated_at=now()'+whereStr;
  queryStr=queryStr+whereStr;
  //console.log(queryStr)
  return queryStr;
};

exports.bytesToSize = function(bytes) { // 1
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

exports.makeInsertFileQuery = function(req, res) {
  var arr=['originalname', 'filename', 'mimetype', 'path', 'size'];
  var fileNo=0;
  if(req.params.file_no) fileNo=req.params.file_no;
  var boardIdx=req.params.id;
  var boardType=req.params.board_type;
  var reqUser=req.user.userid;
  var queryStrs=[];
  var queryStr='';
  const ordered = {};
  var inputGroupFile01=req.files.inputGroupFile01;
  if(inputGroupFile01){
    for(idx in inputGroupFile01){
      Object.keys(inputGroupFile01[idx]).sort().forEach(function(key) {
        if(arr.indexOf(key)>-1)
          ordered[key] = inputGroupFile01[idx][key];
      });
      //console.log(ordered)
      for(key in ordered)
        if(key=='path') queryStr += '"'+mysql_real_escape_string(ordered[key])+'",';
        else queryStr += '"'+ordered[key] + '",';
      queryStr += boardIdx+',"'+boardType+'",'+fileNo+',"fle","'+reqUser+'"';
      queryStrs[fileNo]=queryStr;
      queryStr='';
      fileNo++;
    }
  }
  queryStr='';
  var inputGroupFile02=req.files.inputGroupFile02;
  if(inputGroupFile02){
      inputGroupFile02=inputGroupFile02[0];
      Object.keys(inputGroupFile02).sort().forEach(function(key) {
        if(arr.indexOf(key)>-1)
          ordered[key] = inputGroupFile02[key];
      });
      for(key in ordered)
        if(key=='path') queryStr += '"'+mysql_real_escape_string(ordered[key])+'",';
        else queryStr += '"'+ordered[key] + '",';
      queryStr += boardIdx+',"'+boardType+'",'+fileNo+',"img","'+reqUser+'"';
      queryStrs[fileNo]=queryStr;
      fileNo++
  }
  queryStr='';
  var inputGroupFile03=req.files.inputGroupFile03;
  if(inputGroupFile03){
    inputGroupFile03=inputGroupFile03[0];
    Object.keys(inputGroupFile03).sort().forEach(function(key) {
      if(arr.indexOf(key)>-1)
        ordered[key] = inputGroupFile03[key];
    });
    for(key in ordered)
      if(key=='path') queryStr += '"'+mysql_real_escape_string(ordered[key])+'",';
      else queryStr += '"'+ordered[key] + '",';
    queryStr += boardIdx+',"'+boardType+'",'+fileNo+',"spc","'+reqUser+'"';
    queryStrs[fileNo]=queryStr;
    fileNo++
  }
  queryStrs = queryStrs.filter((elem) => elem !== undefined);
  return queryStrs;
};
   
function mysql_real_escape_string(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
          case "\0":
              return "\\0";
          case "\x08":
              return "\\b";
          case "\x09":
              return "\\t";
          case "\x1a":
              return "\\z";
          case "\n":
              return "\\n";
          case "\r":
              return "\\r";
          case "\"":
          case "'":
          case "\\":
          case "%":
              return "\\"+char; // prepends a backslash to backslash, percent,
                                // and double/single quotes
      }
  });
}

//https://pracon.tistory.com/154
function addslashes(string) {
  return string.replace(/\\/g, '\\\\').
      replace(/\u0008/g, '\\b').
      replace(/\t/g, '\\t').
      replace(/\n/g, '\\n').
      replace(/\f/g, '\\f').
      replace(/\r/g, '\\r').
//      replace(/'/g, '\\\'').
//      replace(/"/g, '\\"').
      replace(/&/g, '&amp;').
      replace(/'/g, '&apos;').
      replace(/"/g, '&quot;').
      replace(/\\/g, '\\\\').
      replace(/</g, '&lt;').
      replace(/\'/g,"&#39;").
      replace(/>/g, '&gt;').replace(/\u0000/g, '\\0');
}

exports.to_date_format = function(date_str, gubun) {
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0,4);
    var sMonth = yyyyMMdd.substring(4,6);
    var sDate = yyyyMMdd.substring(6,8);

    return sYear + gubun + sMonth + gubun + sDate;
}

exports.auth = function(char) {
  var arr1=[4,5,6,7,12,13,14,15];
  var arr2=[2,3,6,7,10,11,14,15];
  var arr3=[1,3,5,7,9,11,13,15];
  switch (char) {
    case "mod": return arr1;
    case "del": return arr2;
    default: return arr3;
  }
}

exports.sendData = function(req) {
  var unirest = require('unirest');
  var url='http://210.94.199.140:7579/Mobius/dgusc_210/actuator_data';
  //var data=prmData(req);
  var data=prmDataNew(req);
  var req = unirest('POST', url)
  .headers({
    'Accept': 'applicaton/xml','Content-Type': 'application/vnd.onem2m-res+xml;ty=4',
    'X-M2M-RI': '12345',
    'X-M2M-Origin': 'SOrigin'
  })
  .send(makeXML(data))
  .end(function (res) {
    //console.log('############################send to noti');
  });
}

function makeXML(content) {
  var xml = "";

  xml += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
  xml += "<m2m:cin ";
  xml += "xmlns:m2m=\"http://www.onem2m.org/xml/protocols\" ";
  xml += "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">";
  xml += "<cnf>text</cnf>";
  xml += "<con>" + content + "</con>";
  xml += "</m2m:cin>";

  return xml;
}

function prmData(req, res) {
  var prmData = '<ctname>11</ctname><head><gateway>';
  var proc_type = req.body.proc_type; //air scon
  var sensorid = req.body.sensorid;
  var ser_type = req.body.ser_type;

  if(sensorid<8) prmData += 'ep20390020</gateway><body>';
  else if(sensorid>7 && sensorid<26) prmData += 'ep20390042</gateway><body>';
  else if(sensorid>25 && sensorid<32) prmData += 'ep20390083</gateway><body>';
  else if(sensorid>31 && sensorid<35) prmData += 'ep20390013</gateway><body>';
  else if(sensorid>34 && sensorid<60) prmData += 'ep20390482</gateway><body>';
  else if(sensorid>59) prmData += 'ep20390498</gateway><body>';

  if(proc_type=="air"){
    prmData += '<setAircon><object>';
    switch(Number(sensorid)){
      case 6: prmData += '000D6F00152679EA'; break;
      case 7: prmData += '000D6F001526727F'; break;
      case 12: prmData += '000D6F0015268409'; break;
      case 13: prmData += '000D6F0015266C05'; break;
      case 18: prmData += '000D6F0015254E82'; break;
      case 19: prmData += '000D6F00152671F0'; break;
      case 24: prmData += '000D6F0015266933'; break;
      case 25: prmData += '000D6F00152683E7'; break;
      case 31: prmData += '000D6F00152665CD'; break;
      case 33: prmData += '000D6F001524F5C8'; break;
      case 34: prmData += '000D6F0015266844'; break;
      case 39: prmData += '000D6F0015267DF1'; break;
      case 40: prmData += '000D6F001526A8F7'; break;
      case 46: prmData += '000D6F0015267549'; break;
      case 47: prmData += '000D6F001526781C'; break;
      case 53: prmData += '000D6F001525389C'; break;
      case 59: prmData += '000D6F00152670B6'; break;
    }
    prmData += '</object><endpoint>1</endpoint>';
    if(ser_type=='mode') prmData += '<mode>'+req.body.mode+'</mode>';
    else if(ser_type=='fan') prmData += '<fan>'+req.body.fan+'</fan>';
    else if(ser_type=='set') prmData += '<setpoint>'+req.body.mode+'</setpoint>';
    prmData += '</setAircon></body></head>';
  } else if(proc_type=="scon"){
    prmData += '<setAction><object>';
    switch(Number(sensorid)){
      case 1: prmData += '000D6F00125775DF'; break;
      case 2: prmData += '000D6F0014155231'; break;
      case 3: prmData += '000D6F0014155231'; break;
      case 4: prmData += '000D6F0014155A78'; break;
      case 5: prmData += '000D6F0014155A78'; break;
      case 8: prmData += '000D6F00139FFC84'; break;
      case 9: prmData += '000D6F0014155843'; break;
      case 10: prmData += '000D6F0014155843'; break;
      case 11: prmData += '000D6F0014155843'; break;
      case 14: prmData += '000D6F001257D66B'; break;
      case 15: prmData += '000D6F001652FDE1'; break;
      case 16: prmData += '000D6F001652FDE1'; break;
      case 17: prmData += '000D6F001652FDE1'; break;
      case 20: prmData += '000D6F0012575934'; break;
      case 21: prmData += '000D6F001415530D'; break;
      case 22: prmData += '000D6F001415530D'; break;
      case 23: prmData += '000D6F001415530D'; break;
      case 26: prmData += '000D6F0012575C5B'; break;
      case 27: prmData += '000D6F000F74AF54'; break;
      case 28: prmData += '000D6F000F74AF54'; break;
      case 29: prmData += '000D6F000F74AF54'; break;
      case 30: prmData += '000D6F000F74AF54'; break;
      case 32: prmData += '000D6F00125745B1'; break;
      case 35: prmData += '000D6F0014155EB0'; break;
      case 36: prmData += '000D6F0014155EB0'; break;
      case 37: prmData += '000D6F0014155399'; break;
      case 38: prmData += '000D6F0014155399'; break;
      case 41: prmData += '000D6F00139DB113'; break;
      case 42: prmData += '000D6F001415A40B'; break;
      case 43: prmData += '000D6F001415A40B'; break;
      case 44: prmData += '000D6F001652ED0F'; break;
      case 45: prmData += '000D6F001652ED0F'; break;
      case 48: prmData += '000D6F00139DAA08'; break;
      case 49: prmData += '000D6F0014152ECB'; break;
      case 50: prmData += '000D6F0014152ECB'; break;
      case 51: prmData += '000D6F001652ECA5'; break;
      case 52: prmData += '000D6F001652ECA5'; break;
      case 54: prmData += '000D6F0013A00151'; break;
      case 55: prmData += '000D6F0014155AA9'; break;
      case 56: prmData += '000D6F0014155AA9'; break;
      case 57: prmData += '000D6F0014154338'; break;
      case 58: prmData += '000D6F0014154338'; break;
    }
    if(sensorid==3 || sensorid==5 || sensorid==10 || sensorid==16 || sensorid==22 || sensorid==28 || sensorid==36 || sensorid==38 || sensorid==43 || sensorid==45 || sensorid==50 || sensorid==52 || sensorid==56 || sensorid==58) prmData += '</object><endpoint>2</endpoint>';
    else if(sensorid==11 || sensorid==17 || sensorid==23 || sensorid==29) prmData += '</object><endpoint>3</endpoint>';
    else if(sensorid==30) prmData += '</object><endpoint>4</endpoint>';
    else prmData += '</object><endpoint>1</endpoint>';
    prmData += '<action>'+req.body.sel+'</action></setAction></body></head>';
  }

  return prmData;
}

function prmDataNew(req, res) {
  var prmData = '<ctname>11</ctname><head><gateway>';
  var proc_type;
  var sensorid = req.body.sensorid;
  var mode = req.body.mode;
  if(mode=="sel") proc_type="scon";
  else proc_type="air";

  if(sensorid<8) prmData += 'ep20390020</gateway><body>';
  else if(sensorid>7 && sensorid<26) prmData += 'ep20390042</gateway><body>';
  else if(sensorid>25 && sensorid<32) prmData += 'ep20390083</gateway><body>';
  else if(sensorid>31 && sensorid<35) prmData += 'ep20390013</gateway><body>';
  else if(sensorid>34 && sensorid<60) prmData += 'ep19010482</gateway><body>';
  else if(sensorid>59 && sensorid<63) prmData += 'ep20390048</gateway><body>';
  else if(sensorid>62) prmData += 'ep19010498</gateway><body>';

  if(proc_type=="air"){
    prmData += '<setAircon><object>';
    switch(Number(sensorid)){
      case 6: prmData += '000D6F00152679EA'; break;
      case 7: prmData += '000D6F001526727F'; break;
      case 12: prmData += '000D6F0015268409'; break;
      case 13: prmData += '000D6F0015266C05'; break;
      case 18: prmData += '000D6F0015254E82'; break;
      case 19: prmData += '000D6F00152671F0'; break;
      case 24: prmData += '000D6F0015266933'; break;
      case 25: prmData += '000D6F00152683E7'; break;
      case 31: prmData += '000D6F00152665CD'; break;
      case 33: prmData += '000D6F001524F5C8'; break;
      case 34: prmData += '000D6F0015266844'; break;
      case 39: prmData += '000D6F0015267DF1'; break;
      case 40: prmData += '000D6F001526A8F7'; break;
      case 46: prmData += '000D6F0015267549'; break;
      case 47: prmData += '000D6F001526781C'; break;
      case 53: prmData += '000D6F001525389C'; break;
      case 59: prmData += '000D6F00152670B6'; break;
      case 62: prmData += '000D6F0015266D42'; break;
      case 68: prmData += '000D6F001526770A'; break;
      case 69: prmData += '000D6F00152678AF'; break;
      case 75: prmData += '000D6F00152668EC'; break;
      case 76: prmData += '000D6F0015266B4F'; break;
      case 81: prmData += '000D6F0015252132'; break;
      case 82: prmData += '000D6F0015267E7D'; break;
    }
    prmData += '</object><endpoint>1</endpoint>';
    if(mode=='mode') prmData += '<mode>'+req.body.val+'</mode>';
    else if(mode=='fan') prmData += '<fan>'+req.body.val+'</fan>';
    else if(mode=='set') prmData += '<setpoint>'+req.body.val+'</setpoint>';
    prmData += '</setAircon></body></head>';
  } else if(proc_type=="scon"){
    prmData += '<setAction><object>';
    switch(Number(sensorid)){
      case 1: prmData += '000D6F00125775DF'; break;
      case 2: prmData += '000D6F0014155231'; break;
      case 3: prmData += '000D6F0014155231'; break;
      case 4: prmData += '000D6F0014155A78'; break;
      case 5: prmData += '000D6F0014155A78'; break;
      case 8: prmData += '000D6F00139FFC84'; break;
      case 9: prmData += '000D6F0014155843'; break;
      case 10: prmData += '000D6F0014155843'; break;
      case 11: prmData += '000D6F0014155843'; break;
      case 14: prmData += '000D6F001257D66B'; break;
      case 15: prmData += '000D6F001652FDE1'; break;
      case 16: prmData += '000D6F001652FDE1'; break;
      case 17: prmData += '000D6F001652FDE1'; break;
      case 20: prmData += '000D6F0012575934'; break;
      case 21: prmData += '000D6F001415530D'; break;
      case 22: prmData += '000D6F001415530D'; break;
      case 23: prmData += '000D6F001415530D'; break;
      case 26: prmData += '000D6F0012575C5B'; break;
      case 27: prmData += '000D6F000F74AF54'; break;
      case 28: prmData += '000D6F000F74AF54'; break;
      case 29: prmData += '000D6F000F74AF54'; break;
      case 30: prmData += '000D6F000F74AF54'; break;
      case 32: prmData += '000D6F00125745B1'; break;
      case 35: prmData += '000D6F0014155EB0'; break;
      case 36: prmData += '000D6F0014155EB0'; break;
      case 37: prmData += '000D6F0014155399'; break;
      case 38: prmData += '000D6F0014155399'; break;
      case 41: prmData += '000D6F00139DB113'; break;
      case 42: prmData += '000D6F001415A40B'; break;
      case 43: prmData += '000D6F001415A40B'; break;
      case 44: prmData += '000D6F001652ED0F'; break;
      case 45: prmData += '000D6F001652ED0F'; break;
      case 48: prmData += '000D6F00139DAA08'; break;
      case 49: prmData += '000D6F0014152ECB'; break;
      case 50: prmData += '000D6F0014152ECB'; break;
      case 51: prmData += '000D6F001652ECA5'; break;
      case 52: prmData += '000D6F001652ECA5'; break;
      case 54: prmData += '000D6F0013A00151'; break;
      case 55: prmData += '000D6F0014155AA9'; break;
      case 56: prmData += '000D6F0014155AA9'; break;
      case 57: prmData += '000D6F0014154338'; break;
      case 58: prmData += '000D6F0014154338'; break;
      case 60: prmData += '000D6F001414F64F'; break;
      case 61: prmData += '000D6F001414F64F'; break;
      case 63: prmData += '000D6F00139DAE88'; break;
      case 64: prmData += '000D6F00141559FE'; break;
      case 65: prmData += '000D6F00141559FE'; break;
      case 66: prmData += '000D6F001652ED23'; break;
      case 67: prmData += '000D6F001652ED23'; break;
      case 70: prmData += '000D6F00125770DF'; break;
      case 71: prmData += '000D6F001652ED26'; break;
      case 72: prmData += '000D6F001652ED26'; break;
      case 73: prmData += '000D6F001652ED1D'; break;
      case 74: prmData += '000D6F001652ED1D'; break;
      case 77: prmData += '000D6F0014156788'; break;
      case 78: prmData += '000D6F0014156788'; break;
      case 79: prmData += '000D6F0014155A2C'; break;
      case 80: prmData += '000D6F0014155A2C'; break;
    }
    if(sensorid==3 || sensorid==5 || sensorid==10 || sensorid==16 || sensorid==22 || sensorid==28 || sensorid==36 || sensorid==38 || sensorid==43 || sensorid==45 || sensorid==50 || sensorid==52 || sensorid==56 || sensorid==58 || sensorid==61 || sensorid==65 || sensorid==67 || sensorid==72 || sensorid==74 || sensorid==78 || sensorid==80) prmData += '</object><endpoint>2</endpoint>';
    else if(sensorid==11 || sensorid==17 || sensorid==23 || sensorid==29) prmData += '</object><endpoint>3</endpoint>';
    else if(sensorid==30) prmData += '</object><endpoint>4</endpoint>';
    else prmData += '</object><endpoint>1</endpoint>';
    prmData += '<action>'+req.body.val+'</action></setAction></body></head>';
  }

  return prmData;
}

exports.sendDataApi = function(req) {
  var unirest = require('unirest');
  var url='http://210.94.199.140:7579/Mobius/dgusc_210/actuator_data';
  var data=prmDataApi(req);
  var req = unirest('POST', url)
  .headers({
    'Accept': 'applicaton/xml','Content-Type': 'application/vnd.onem2m-res+xml;ty=4',
    'X-M2M-RI': '12345',
    'X-M2M-Origin': 'SOrigin'
  })
  .send(makeXML(data))
  .end(function (res) {
    //console.log('############################send to noti');
  });
}

function prmDataApi(req, res) {
  var valStr;
  var ctrl_cmd = '<ctname>11</ctname>'+req.body.ctrl_cmd;
  var mode = req.body.mode;
  if(mode=='mode') valStr = '<mode>'+req.body.val+'</mode>';
  else if(mode=='fan') valStr = '<fan>'+req.body.val+'</fan>';
  else if(mode=='set') valStr = '<setpoint>'+req.body.val+'</setpoint>';
  else if(mode=="sel") valStr = req.body.val;
  ctrl_cmd=ctrl_cmd.replace('endval', req.body.endpoint);
  ctrl_cmd=ctrl_cmd.replace('val', valStr);
  
  return ctrl_cmd;
}

exports.sendEmail = function(req) {
  const mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text.replace(/\+/g, '-')//.replace(/\//g, '_')
  };

  smtpTransport.sendMail(mailOptions, (error, responses) =>{
      if(error){
          console.log(error)
      }else{
          //res.json({msg:'sucess'});
      }
      smtpTransport.close();
  });
}