module.exports = function asyncHandler(fn, routeName) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(err => {
        // 라우터 이름, 에러 내역 로그로 남기기
        console.error(`${routeName} error: ${err.message}`);
        next(err);
      });
  };
};