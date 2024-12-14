import "./DiaryItem.css"; // CSS 스타일 파일 가져오기
import Button from "./Button"; // Button 컴포넌트 가져오기
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 훅 사용

const DiaryItem = ({ id, imgId, content, date, dataUrl }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 상세 페이지로 이동하는 함수
  const goDetail = () => {
    navigate(`/diary/${id}`, {
      state: { id, imgId, content, date, dataUrl }, // 상태 데이터 전달
    });
  };

  // 수정 페이지로 이동하는 함수
  const goEdit = () => {
    navigate(`/edit/${id}`); // URL에 id를 포함하여 이동
  };

  return (
    <div className="DiaryItem">
      {/* 이미지 섹션 */}
      <div
        onClick={goDetail} // 클릭 시 상세 페이지로 이동
        className={["img_section", `img_section_${imgId}`].join(" ")} // 동적 클래스 이름 설정
      >
        <img
          src={dataUrl} // 이미지 URL
          alt={`img${imgId}`} // 이미지 설명 (접근성)
          className="DiaryImg" // 스타일 클래스
        />
      </div>

      {/* 정보 섹션 */}
      <div onClick={goDetail} className="info_section">
        <div className="date_wrapper">
          {new Date(parseInt(date)).toLocaleDateString()} {/* 날짜 형식 변환 */}
        </div>
        <div className="content_wrapper">
          {content.slice(0, 25)} {/* 최대 25자만 표시 */}
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div className="button_section">
        <Button onClick={goEdit} text={"수정하기"} /> {/* 수정 페이지 이동 버튼 */}
      </div>
    </div>
  );
};

export default DiaryItem;
