const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // .env 파일의 환경 변수 로드

const app = express();
const PORT = 3001;

// JSON 요청 본문을 처리할 수 있도록 설정
app.use(express.json());

// POST 엔드포인트 생성
app.post("/api/transform", async (req, res) => {
  const { inputText, style } = req.body; // 클라이언트로부터 받은 데이터
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API Key가 설정되지 않았습니다." });
  }

  try {
    // OpenAI API 요청
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant. Always respond in Korean." },
          { role: "user", content: `${style} Text: "${inputText}"` },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // OpenAI API 응답 데이터 반환
    res.json({ result: response.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API 호출 오류:", error.response?.data || error.message);
    res.status(500).json({ error: "문체 변환에 실패했습니다. 다시 시도해주세요." });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
