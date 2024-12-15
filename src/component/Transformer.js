import React, { useState } from "react";
import axios from "axios";
import "./Transformer.css";


//선택된 스타일로 문체 변환
const Transformer = ({ content }) => { // content를  초기값 
  const [inputText, setInputText] = useState(content || ""); // inputText: content 초기값, 없으면 빈문자열 
  const [transformedText, setTransformedText] = useState("");//transformedText: 변환된 텍스트 저장
  const [style, setStyle] = useState("letter"); //style: 문체 , 초기값: letter(편지 문체)
  const [loading, setLoading] = useState(false); //api호출 상태

  const styles = {  // 각 문체에 대한 명령 정의
    letter: "Rewrite the text as a heartfelt letter in Korean.",
    horror: "Rewrite the text with a suspenseful, horror tone in Korean.",
    humor: "Make the text funny and light-hearted in Korean.",
    fairyTale: "Rewrite the text as a whimsical fairy tale in Korean.",
    poetic: "Rewrite the text in a poetic tone in Korean.",
    romantic: "Rewrite the text in a romantic tone in Korean.",
  };



  //GPT API를 호출하 + 텍스트 변환
  const transformText = async () => {  //async: 비동기 함수 정의, await사용
    if (loading) return; //loading이 true이면 실행 중단--> 중복 호출 방지
    setLoading(true);

    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;  //api키 가져옴(보안상)
      const response = await axios.post( //openAI API호출
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant. Always respond in Korean." }, //시스쳄이 해야할 일 정의
            { role: "user", content: `${styles[style]} Text: "${inputText}"` }, //사용자 입력
          ],
          max_tokens: 1000, //응답에서 받을 최대 토큰
        },
        {
          headers: {  //요청 헤더
            Authorization: `Bearer ${apiKey}`,  //api요청 인증 : bearer방식으로 api키 전달
            "Content-Type": "application/json", // 요청 데이터가 json형식임을 명시
          },
        }
      );

      setTransformedText(response.data.choices[0].message.content.trim());
      //성공시) response(api결과)를 양쪽 공백 제거 후 출력

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
        {/* disabled: 버튼 활성화 조건 --> loading === false 상태 + 텍스트 존재 */}
        {loading ? "변환 중..." : "변환하기"}
      </button>
      <div className="output-container">
        <h4>변환된 텍스트:</h4>
        <p>{transformedText || "변환된 내용이 여기에 표시됩니다.(API KEY 필요해요 .env파일을 설정(?하세요)"}</p>
      </div>
    </div>
  );
};

export default Transformer;


/* 아이디어 수제작 */