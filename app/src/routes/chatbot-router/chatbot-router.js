const path = require("path");
var express = require("express");
var router = express.Router();
var iconv  = require('iconv-lite');

const ensureAuth = require("../../utils/middleware/ensureAuth");
const asyncHandler = require("../../utils/middleware/asyncHandler");

const { spawn } = require('child_process');

router.get('/', asyncHandler(async function (req, res) {
    res.render('chatbot/main');
}, 'chatbot-router/ error:'));

// Chatbot 요청을 처리하는 라우트 추가

router.post('/get-response', asyncHandler(async function (req, res) {
    var userQuery = req.body.query;
    userQuery = iconv.encode(userQuery, 'euc-kr');
    try {
        const pythonProcess = spawn('python', [__dirname + '/HuggingFace_ChatBot_Result.py', userQuery], {
            stdio: ['pipe', 'pipe', 'pipe'], // stdin, stdout, stderr
            encoding: 'utf-8', // 인코딩 설정
          });
        pythonProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        
        pythonProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
        // 파이썬 코드의 출력을 수신
        let botResponse = '';
        pythonProcess.stdout.on('data', (data) => {
            botResponse += data.toString();
        });
        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            // 클라이언트에 응답을 전달
            res.json({ response: botResponse });
        });
    } catch (error) {
        console.error('Error while communicating with the chatbot:', error);
        res.status(500).json({ error: 'An error occurred while communicating with the chatbot.' });
    }
}));

module.exports = router;