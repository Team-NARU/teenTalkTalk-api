exports.policy_code_to_name = function (policy_target_code,code_data){
    var json = {};
    // console.log(code_data.policy_target_code[0].code_detail_name);
    json.policy_target_code = code_data.policy_target_code;
    for(var i = 0; i < json.policy_target_code.length; i++){
        // policy_target_code는 코드값이고, json.policy_target_code[i].code_detail는 코드값에 해당하는 이름이다.
        if(json.policy_target_code[i].code_detail == policy_target_code){
            json.policy_target_code_name = json.policy_target_code[i].code_detail_name;
        }
    }
    return json;
};

exports.user_type_to_name = function (user_code,code_data){
    // console.log(code_data.policy_target_code[0].code_detail_name);
    var user_type = code_data.user_type;
    for(var i = 0; i < user_type.length; i++){
        // policy_target_code는 코드값이고, json.policy_target_code[i].code_detail는 코드값에 해당하는 이름이다.
        if(user_type[i].code_detail == user_code){
            return user_type[i].code_detail_name;
        }
    }
    return "정보 없음";
};

exports.emd_code_to_name = function (emd_class_code,code_data){
    // console.log(code_data.policy_target_code[0].code_detail_name);
    var emd_class = code_data.emd_class_code;
    for(var i = 0; i < emd_class.length; i++){
        // policy_target_code는 코드값이고, json.policy_target_code[i].code_detail는 코드값에 해당하는 이름이다.
        if(emd_class[i].code_detail == emd_class_code){
            return emd_class[i].code_detail_name;
        }
    }
    return "정보 없음";
};
    


// 권한코드 -> 권한
exports.role_code_to_class =  function (role_code){
    if(role_code == 0) return "일반 회원";
    else if(role_code == 1) return "최고관리자";
    else if(role_code == 2) return "부관리자";
    else if(role_code == 3) return "정책관리자";
    else return "정보 없음";
}