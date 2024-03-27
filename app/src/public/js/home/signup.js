$(function () {
    $('#frm_signup').validate({
        onkeyup: false,
    //      debug: true,
        rules: {
            userid: {
                required: true,
                //email: true,
                remote: {
                    url: '/auth/signup-check',
                    type: 'post',
                    data: {
                        userid: function () {
                            return $('#userid').val();
                        }
                    },
                    dataFilter: function (data) {
                        var data = JSON.parse(data);
                        if (data.success) {
                            return true
                        } else {
                            return "\"" + data.msg + "\"";
                        }
                    }
                }
            },
            password: {
                required: true,
                //minlength: 8,
            }
        },
        messages: {
            userid: {
                required: '이메일 필수 항목입니다',
                //email: '이메일 형식에 맞게'
            },
            password: {
                required: '비밀번호 필수 항목입니다',
                //minlength: '4자이상',
            }
        },
        submitHandler: function (form) {
            var ajax = $.ajax({
                url: "/auth/signup",
                data: "userid=" + $("#userid").val() + "&password=" + $("#password").val(),
                type: 'POST',
                success: function(result) {
                    if(typeof result === "object") {                
                        //result = JSON.parse(JSON.stringify(result));
                        if(result.errMsg=='0') form.submit();
                        else alert(result.errMsg);
                    }
                    //$("#test").html("<%=errMsg%>");
                    //alert('<%=errMsg%>');
                }
            });
            //form.submit();
        }
    });
})