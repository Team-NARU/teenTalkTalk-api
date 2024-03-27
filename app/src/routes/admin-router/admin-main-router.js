// const path = require("path");
var express = require("express");
var router = express.Router();
var main_controller = require("../../controllers/common-controller/main-controller");
var fs = require("fs");
var mime = require('mime-types');

// 파일 다운로드
router.get("/filedownload", async function(req, res) {
    try{
        var result;
        var filePath;
        var fileName;
        var mimetype;
        if(req.query.filename) {
            filePath = __dirname + "/../../public/upload/" + req.query.filename;
            console.log('filePath:'+filePath);
            fileName = req.query.filename; // 원본파일명​
        } 
        if(fs.existsSync(filePath)) {
            if(!mimetype) mimetype=mime.lookup(filePath);
            // 응답 헤더에 파일의 이름과 mime Type을 명시한다.(한글&특수문자,공백 처리)
            res.setHeader("Content-Disposition", "attachment;filename=\"" + encodeURI(fileName) + "\"");
            res.setHeader("Content-Type", mimetype);
            // filePath에 있는 파일 스트림 객체를 얻어온다.(바이트 알갱이를 읽어옵니다.)
            var fileStream = fs.createReadStream(filePath);
            // 다운로드 한다.(res 객체에 바이트알갱이를 전송한다)
            fileStream.pipe(res);
            fileStream.on("error", err => {
                console.log(err);
                res.status('404')
                    .header('Content-Type', "text/html")
                    .send(`
                    <!DOCTYPE html>
                    <html lang="en">
                        <head>
                        <script>
                            alert('파일읽기에 실패하였습니다.');
                            history.back()
                        </script>
                        </head>
                        <body>W
                        </body>
                    </html>`
                    )
            });
        }
        else res.status('404')
        .header('Content-Type', "text/html")
        .send(`
        <!DOCTYPE html>
          <html lang="en">
            <head>
              <script>
                alert('파일이 없습니다.');
                history.back()
              </script>
            </head>
            <body>
            </body>
          </html>`
        )

    } catch(error) {
        console.log('main-router filedownload error:'+error);
    }
});

module.exports = router;