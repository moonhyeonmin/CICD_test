const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("🚀 CI/CD 배포가 성공적으로 완료되었습니다! 제발 돼라");
});

app.listen(PORT, () => {
    console.log(`✅ 서버가 ${PORT} 포트에서 실행 중입니다. 123`);
});