import React, { useState } from "react";
import "./FloatingButton.css";

//메인: 클릭전 서브: 클릭후 position: 위치 기본값
const FloatingButton = ({ mainIcon, subButtons = [], position = { bottom: 20, right: 20 } }) => {
  //서브 버튼이 열렸는지 여부 저장
  const [isOpen, setIsOpen] = useState(false);
//메인 버튼 클릭시 토글: 상태 반전
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
//메인 버튼 위치 설정 만약 position이 제대로 전달 되지 않을 경우 20, 20
  const containerStyle = {
    position: "fixed",
    bottom: position?.bottom ?? 20,
    right: position?.right ?? 20,
  };

  return (
    <div className="floating-button-container" style={containerStyle}>
      {/* 클릭하면 메뉴 열/닫기 */}
      <button className="main-button" onClick={toggleMenu} aria-label="Toggle sub buttons">
       {/* 메인아이콘이 있다면 그 아이콘 표시, 없으면 저거 표시 */}
        {mainIcon || "☰"}
      </button>
     
     {/* 서브 버튼 렌더링 */}
     {/* isOpen==true 일 경우에만 => 클릭했을때만 */}
      {isOpen && (
        <div className="sub-buttons">
          {subButtons.map((button) => (
            <button

              key={button.id || button.icon} //id없으면 아이콘 사용해라
              className="sub-button"
              onClick={button.onClick}
              style={{ ...button.style }} 
              aria-label={`Sub button ${button.icon}`}//텍스트 레이블
            >
              {button.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
