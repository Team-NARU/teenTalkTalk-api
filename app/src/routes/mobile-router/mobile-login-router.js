const path = require("path");
var express = require("express");
var router = express.Router();
var mobile_login_controller = require("../../controllers/mobile-controller/mobile-login-controller");
const verifyToken = require("../../middleware/verify_token");
const generateJsonWebToken = require("../../lib/generate_jwt");



// 로그인
router.post("/login", async function(req, res) {
  try{
    // 로그인 확인을 위해 컨트롤러 호출
    // console.log('mobile-router', req.body);
    var result = await mobile_login_controller.SignIn(req, res);

    // console.log('login mobile-router result : ', result.data);

    var uid = result.data.uid;
    // console.log(uid);
    let token = generateJsonWebToken(uid);
    
    // console.log(token);
    if (result.code == 0){
      res.json({
        resp : true,
        message : '로그인 성공',
        token : token
      }) 
    } else if (result.code == 100) {
      res.json({
        resp : false,
        message : '비밀번호가 일치하지 않습니다',
        token : token
      })
    } else if (result.code == 200) {
      
        res.json({
          resp : false,
          message : '아이디가 일치하지 않습니다',
          token : token
        })
      
    }
    
  } catch(error) {
    console.log('mobile-router login:'+error);
  }
});


// 카카오 로그인
router.post("/kakao-signin", async function(req, res) {
  try{
    // 로그인 확인을 위해 컨트롤러 호출
    // console.log('mobile-router kakao-signin', req.body);
    var result = await mobile_login_controller.KakaoSignIn(req, res);

    // console.log('login mobile-router result : ', result.data);

    var uid = result.data.uid;
    // console.log(uid);
    let token = generateJsonWebToken(uid);
    
    // console.log(token);
    if (result.code == 0){
      res.json({
        resp : true,
        message : '로그인 성공',
        token : token
      }) 
    } else if (result.code == 200) {
      
        res.json({
          resp : false,
          message : '일치하는 사용자 정보를 찾을 수 없습니다.',
          token : token
        })
      
    }
    
  } catch(error) {
    console.log('mobile-router login:'+error);
  }
});



// 카카오 가입
router.post("/kakao-signup", async function(req, res) {
  try{
    // 사용자등록 컨트롤러 호출
    console.log('mobile-router kakao signup');
    
    var result = await mobile_login_controller.KakaoSignUp(req, res);
    // console.log(result);
    //res.send({errMsg:result});
    //if(result==0) res.json({success: true, msg:'등록하였습니다.'});
    //else res.json({success: false, msg:'등록실패하였습니다.'});
    if(result==0){
      console.log('mobile-router kakao signup success');
      // res.redirect('/mobile/auth/login');
      res.json({
        resp: true,
        message: '성공적으로 등록된 사용자'
      }); // kth
    }
    else if (result == 100){
      console.log('mobile-router kakao signup fail');
      // res.redirect('/mobile/auth/signup');
      res.json({
        resp: false,
        message: '등록 실패'
    }); // kth
    } 

  } catch(error) {
    console.log('mobile-router signup error:'+error);
  }
});

// 로그아웃
// router.get("/logout", function(req, res) {
//   res.clearCookie('userid'); // userid 쿠키 삭제
//   res.clearCookie('username'); // username 쿠키 삭제
//   req.session.destroy(); // 세션 정보 삭제
//   req.logout(); // 로그아웃 처리 (세션 또는 토큰 기반 로그인에 따라 필요한 경우 사용)

//   // 토큰 무효화 작업 추가
//   // 여기에 토큰을 무효화하는 로직을 구현합니다.
//   // 토큰을 저장하는 방식과 무효화하는 방식은 사용하는 토큰 시스템(예: JWT, Redis 등)에 따라 다를 수 있습니다.

//   res.redirect('/'); // 로그아웃 후 홈페이지로 리다이렉트
// });



  
  // verfiy email
  router.get('/verify-email/:code/:email', async function(req, res) {
    let code = req.params.code;
    let email = req.params.email;
    
    console.log('mobile-router verifyEmail 실행');
    try{
      var result = await mobile_login_controller.verifyEmail(req, res);
      console.log('mobile-router verifyEmail result:', result);
      if (result == 0){
        res.json({
          resp : true,
          message: '성공적으로 검증되었습니다'
        });
      } else{
        res.json({
          resp : false,
          message : '확인 실패'
        })
      }
    } catch(err){
      res.json({
        resp : false,
        message : err
      })
    }
  });
  

  

  
  //이름 변경
  router.get("/loginSuccess", function(req, res) {
    res.render('dataif/mem'); 
    redirect('/mobile/login');
    //res.json({msg:'0'});
  });
  
  router.get("/loginFailure", function(req, res) {
    var rtnMsg;
    var err = req.flash('error');
    if(err) rtnMsg = err;
    //res.json({success: false, msg: rtnMsg})
    res.redirect('/mobile/login');
    //res.json({errMsg:msg});
    
  });
  
  
  router.post("/login-check", async function(req, res) {
    try{
      // 로그인 확인을 위해 컨트롤러 호출
      console.log('mobile-router login-check');
      var result = await mobile_login_controller.login_check(req, res);
      //console.log('mobile-router login-check result:'+result);
      switch(result){
        case 1 : res.json({success: false, msg: '해당 유저가 존재하지 않습니다.'}); break;
        //case 2 : res.json({success: false, msg: '해당 유저가 존재하지 않거나 비밀번호가 일치하지 않습니다.'}); break;
        case 2 : 
        case 3 : res.json({success: true}); break;
      }
    } catch(error) {
      console.log('mobile-router login-check error:'+error);
    }
  });
  
  router.post("/signup-check", async function(req, res) {
    try{
      // 회원 확인을 위해 컨트롤러 호출
      var result = await mobile_login_controller.login_check(req, res);
      //console.log('mobile-router signup-check result:'+result);
      switch(result){
        case 1 : res.json({success: true}); break;
        case 2 : 
        case 3 : res.json({success: false, msg: '해당 유저가 존재합니다.'}); break;
      }
    } catch(error) {
      console.log('mobile-router signup-check error:'+error);
    }
  });
  
  
  // 로그아웃
  router.get("/logout", function(req, res) {
    //console.log("clear cookie");
    // 로그아웃 쿠키 삭제
    res.clearCookie('userid');
    res.clearCookie('username');
    // 세션정보 삭제
    //console.log("destroy session");
    req.session.destroy();
    //res.sendFile(path.join(__dirname, "../public/login.html"));
    req.logout();
    res.redirect('/');
  });

  // 사용자등록(회원가입)
router.get("/signup", function(req, res) {
    res.render('dataif/signup');
  });
  

  // 회원가입 !!
  router.post("/signup", async function(req, res) {
    try{
      // 사용자등록 컨트롤러 호출
      
      var result = await mobile_login_controller.signUp(req, res);
      // console.log(result);
      //res.send({errMsg:result});
      //if(result==0) res.json({success: true, msg:'등록하였습니다.'});
      //else res.json({success: false, msg:'등록실패하였습니다.'});
      if(result==0){
        console.log('mobile-router signup success');
        // res.redirect('/mobile/auth/login');
        res.json({
          resp: true,
          message: '성공적으로 등록된 사용자'
        }); // kth
      }
      // else if (result == 100){
      //   console.log('mobile-router signup fail');
      //   // res.redirect('/mobile/auth/signup');
      //   res.json({
      //     resp: false,
      //     message: '등록 실패'
      // }); // kth
      // } 

    } catch(error) {
      console.log('mobile-router signup error:'+error);
    }
  });


  router.get("/checkDuplicateID/:userid", async function(req,res){
    try{
      var result = await mobile_login_controller.checkDuplicateID(req, res);
      if(result==0){
        console.log('mobile-login-router checkDuplicateID success');
        res.json({
          resp: false,
          message: '사용가능한 아이디입니다'
        }); // kth
      }
      else if (result == 100){
        console.log('');
        res.json({
          resp: true,
          message: '이미 존재하는 아이디입니다'
      }); // kth
      } 
    } catch(error) {
      console.log('mobile-router-checkDuplicateID:' + error);
    }

  });

  router.get("/renew-login", verifyToken, function(req, res) {
    // console.log('renew-login');
    try {

      const token = generateJsonWebToken( req.idPerson );

      return res.json({
          resp: true,
          message: '청소년 톡talk에 오신 걸 환영합니다.',
          token: token
      }); 
      
  } catch (err) {
      return res.status(500).json({
          resp: false,
          message: err
      });
  }
  });


  
  module.exports = router;