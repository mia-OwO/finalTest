import Button from "../component/Button";
import Header from "../component/Header";
import CalendarDiary from "../component/CalendarDiary";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import FloatingButton from "../component/FloatingButton";
import { useNavigate } from "react-router-dom";


const CalendarPage = () => {
  const data = useContext(DiaryStateContext); // 일기 데이터를 가져옴
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 달 관리
  const navigate= useNavigate();

  // 현재 월과 연도를 기반으로 헤더 타이틀 생성
  const headerTitle = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

  // 다음 달로 이동
  const onIncreaseMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  // 이전 달로 이동
  const onDecreaseMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };


  return (
    <div>
      <Header
        title={headerTitle}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <CalendarDiary currentDate={currentDate} /> 

      <FloatingButton
      subButtons={[
       
        {icon: "🌱", tooltip:"홈", onClick:()=>navigate('/home')},
        {icon:"📋", tooltip:"리스트", onClick:()=>navigate('/list')},
      ]}
      />
    
    </div>
  );
};

export default CalendarPage;


/* 대부분 수제작 */