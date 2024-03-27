"use strict";
const id = document.getElementById('id');
const pw = document.getElementById('password');
const loginBtn = document.getElementById('btn');
loginBtn.addEventListener('click', login);
function login(){
  const req = {
    id: id.value,
    pw: pw.value
  };
  fetch("/",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
    })
    .then((response) => response.json())
    .then((res) => {
        if(res.success){ //로그인 시 조회화면으로
            location.href = "/admin";
        }else{
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("로그인 중 에러 발생");
    });
}