import React, { useState } from "react";
import axios from "axios";
import "./Transformer.css";

const Transformer = ({ content }) => { // content를 props로 전달받음
  const [inputText, setInputText] = useState(content || ""); // 전달받은 content를 초기값으로 설정
  const [transformedText, setTransformedText] = useState("");
  const [style, setStyle] = useState("letter");
  const [loading, setLoading] = useState(false);

  const styles = {
    letter: "Rewrite the text as a heartfelt letter in Korean.",
    horror: "Rewrite the text with a suspenseful, horror tone in Korean.",
    humor: "Make the text funny and light-hearted in Korean.",
    fairyTale: "Rewrite the text as a whimsical fairy tale in Korean.",
    poetic: "Rewrite the text in a poetic tone in Korean.",
    romantic: "Rewrite the text in a romantic tone in Korean.",
  };

  const transformText = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant. Always respond in Korean." },
            { role: "user", content: `${styles[style]} Text: "${inputText}"` },
          ],
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTransformedText(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error transforming text:", error);
      alert("문체 변환에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transformer-container">
     
      <div className="select-container">
        <label>문체 선택:</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="select"
        >
          <option value="letter">편지 문체</option>
          <option value="horror">호러 문체</option>
          <option value="humor">유머 문체</option>
          <option value="fairyTale">동화 문체</option>
          <option value="poetic">시적 문체</option>
          <option value="romantic">로맨틱 문체</option>
        </select>
      </div>
      <button onClick={transformText} disabled={loading || !inputText} className="button">
        {loading ? "변환 중..." : "변환하기"}
      </button>
      <div className="output-container">
        <h4>변환된 텍스트:</h4>
        <p>{transformedText || "변환된 내용이 여기에 표시됩니다."}</p>
      </div>
    </div>
  );
};

export default Transformer;
