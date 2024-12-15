import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../component/HomeHeader";
import FloatingButton from "../component/FloatingButton";

const Home = () => {
  const navigate = useNavigate(); //페이지 이동(플로팅 버튼)
  const [plantData, setPlantData] = useState([]); //plantData: 등록되 식물 저장 setPlantData:상태 업뎃

  useEffect(() => {  // 처음 렌더링될때 한 번 실행
    const savedPlantData = localStorage.getItem("plantData"); //savedPlantData=> 스토리지에 저장된 식물 데이터
    if (savedPlantData) { //savedPlantData에 값이 저장되어있으면
      setPlantData(JSON.parse(savedPlantData)); // 데이터를 배열로 가져와plantData에 반영해라 
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex", //flexbox 활성화
        flexDirection: "column", // 수직 정렬
        alignItems: "center", //중앙정렬.      ==> 위에서 아래로 중앙에 요소를 배치
        backgroundColor: "#ffffff", //  흰색 배경
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          width: "100%",  
          backgroundColor: "#87e88b",
          color: "white",  //텍스트
          textAlign: "center",  //중앙에 배치
          padding: "10px 0", //내부 위아래 10px 여백
          position: "sticky", //스크롤을 내려도 헤더는 상단에 고정
          top: 0, //헤더 상단 0px에 고정
          zIndex: 1000, // 레이어 우선순위
          marginBottom:" 90px"  // 헤더 아래 90px 간격
        }}
      >
        <HomeHeader />
      </div>

      {/* 메인 콘텐츠 */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto", //0: 위아래 여백 없앰 ,auto: 좌우 여백 자동
          padding: "20px",
          overflowY: "auto", //세로높이 초과 -> 스크롤 활성화
        }}
      >
        {plantData.length > 0 ? ( //plantData값이 있으면 
          plantData.map((plant, index) => ( //데이터를 렌더링하고
            <div
              key={index}  // 항목을 식별
              style={{
                marginBottom: "40px",
                textAlign: "center", //div안의 텍스트, 이미지 중앙 정렬
              }}
            >
              {plant.image && (// 이미지가 이쓴 경우에만 아래코드 렌더링
                              // 이미지가 없으면 div항목 생성 x
                <div
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "200px",
                    margin: "0 auto 20px auto", // 0: 위쪽여백  auto:좌우 자동 설정  20px:아래
                  }}
                >
                  <img
                    src={plant.image}  //src: 이미지를 로드할 경로 지정
                                      // -> images파일 
                    alt="Plant"  //이미지를 로드하지 못 했을 때 표시되는 대체 텍스트(plant)
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // 이미지를 원본 비율로 축소하여 컨테이너에 맞게 표시
                    }}
                  />
                </div>
              )}

              {/*1.5rem : 기본 폰트의 1.5배 */}
              <h2 style={{ fontSize: "1.5rem", color: "#333", marginBottom: "10px" }}>
                🌱 정보 
              </h2> 

              <div    // 텍스트들(이름, 종류, 날, 메모)
                style={{
                  display:"flex",
                  flexDirection: "column",  //수직 정렬
                  alignItems: "flex-start", //왼쪽 정렬
                  marginLeft: "190px", 
                  marginRight: "auto",
                  maxWidth: "300px",
                  textAlign: "left",  // 텍스트 왼쪽 정렬
                  gap: "10px",   //요소들 간 10px 간격
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
                  whiteSpace: "pre-wrap",  // 공백과 줄바꿈은 유지 + 너비초과하면 자동 줄바꿈
                }}
              >
                <strong>메모:</strong>  {/* 굵게 표시 */}
{/* 실제 데이터 */}  <span      
                  style={{
                    display:"block",   //span: 인라인요소 but 블록 요소로 변환
                    paddingLeft:"3rem", // 들여쓰기
                    marginTop:"5px", //메모 사이 
                  }}


                >
                {plant.note}   {/* plantData에서 가져옴 */}
                </span>
              </p>
            </div>
            </div>
          ))
        ) : ( //없으면!!
          <div style={{ textAlign: "center", color: "#555", marginTop: "50px" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#888" }}>등록된 식물이 없습니다.</h2>
          </div>//등록된 식물이 없다는 메시지를 표시해
        )}
      </div>

      {/* 플로팅 버튼 추가 */}
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



/*



*/