$('#frm_login').validate({
    onkeyup: false,
    submitHandler: function () {
      return true;
    },
    rules: {
      userid: {
        required: true,
        minlength: 6
      },
      password: {
        required: true,
        minlength: 8,
        remote: {
          url: '/login',
          type: 'post',
          data: {
            userid: function () {
              return $('#userid').val();
            }
          },
          dataFilter: function (data) {
            var data = JSON.parse(data);
            alert(data.success)
            if (data.success) {
              return true
            } else {
              return "\"" + data.msg + "\"";
            }
          }
        }
      }
    }
  });