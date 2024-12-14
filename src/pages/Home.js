import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../component/HomeHeader";
import FloatingButton from "../component/FloatingButton";

const Home = () => {
  const navigate = useNavigate();
  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    const savedPlantData = localStorage.getItem("plantData");
    if (savedPlantData) {
      setPlantData(JSON.parse(savedPlantData)); // 데이터를 배열로 가져옴
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff", // 배경 흰색
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          width: "100%",
          
          backgroundColor: "#87e88b",
          color: "white",
          textAlign: "center",
          padding: "10px 0",
          position: "sticky",
          top: 0,
          zIndex: 1000,

          marginBottom:" 90px"
        }}
      >
        <HomeHeader />
      </div>

      {/* 메인 콘텐츠 */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {plantData.length > 0 ? (
          plantData.map((plant, index) => (
            <div
              key={index}
              style={{
                marginBottom: "40px",
                textAlign: "center",
              }}
            >
              {plant.image && (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "200px",
                    margin: "0 auto 20px auto", // 중앙 정렬 및 하단 간격
                  }}
                >
                  <img
                    src={plant.image}
                    alt="Plant"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              <h2 style={{ fontSize: "1.5rem", color: "#333", marginBottom: "10px" }}>
                🌱 정보
              </h2>

              <div
                style={{
                  display:"flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: "190px",
                  marginRight: "auto",
                  maxWidth: "300px",
                  textAlign: "left",
                  gap: "10px",
                }}
              
              >
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                <strong>식물 이름:</strong> {plant.name}
              </p>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                <strong>식물 종류:</strong> {plant.type}
              </p>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                <strong>파종 날:</strong> {plant.plantedDate}
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                  whiteSpace: "pre-wrap",
                }}
              >
                <strong>메모:</strong> 
                <span
                  style={{
                    display:"block",   //블로드로 바꿔 들여쓰기 추가
                    paddingLeft:"3rem", // 들여쓰기
                    marginTop:"5px",
                  }}


                >
                {plant.note}
                </span>
              </p>
            </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", color: "#555", marginTop: "50px" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#888" }}>등록된 식물이 없습니다.</h2>
          </div>
        )}
      </div>

      {/* 플로팅 버튼 */}
      <FloatingButton
        subButtons={[
          
          { icon: "🗓️", tooltip: "달력", onClick: () => navigate("/calendarPage") },
          { icon: "📋", tooltip: "리스트", onClick: () => navigate("/list") },
        ]}
      />
    </div>
  );
};

export default Home;  