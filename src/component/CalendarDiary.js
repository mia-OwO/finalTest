import "./CalendarDiary.css";
import React, { useContext } from "react";
import { DiaryStateContext } from "../App"; // DiaryItem 데이터를 가져오는 컨텍스트
import { useNavigate } from "react-router-dom";


const CalendarDiary = ({ currentDate = new Date()}) => {
  const diaryData = useContext(DiaryStateContext); // 컨텍스트로 DiaryItem 데이터 가져오기
  const navigate=useNavigate();  //페이지 이동

  // 현재 달의 날짜 생성 함수
  const getMonthDates = (year, month) => {
    const firstDay = new Date(year, month, 1); // 해당 달의 첫 번째 날짜
    const lastDay = new Date(year, month + 1, 0); // 해당 달의 마지막 날짜

    const daysInMonth = [];
    for (let day = 1; day <= lastDay.getDate(); day++) {
      daysInMonth.push(new Date(year, month, day));
    }

    // 빈칸 추가: 앞쪽
    const leadingEmptyDays = Array(firstDay.getDay()).fill(null);

    // 빈칸 추가: 뒤쪽
    const trailingEmptyDays = Array(6 - lastDay.getDay()).fill(null);

    // 앞쪽 빈칸 + 날짜 + 뒤쪽 빈칸 반환
    return [...leadingEmptyDays, ...daysInMonth, ...trailingEmptyDays];
  };

 // console.log("currentDate: ",currentDate);

  // 현재 월/년 정보
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // 현재 달의 날짜들 생성
  const monthDates = getMonthDates(currentYear, currentMonth);

  // 오늘 날짜 비교 함수
  const today = new Date();
  const isToday = (date) => date && date.toDateString() === today.toDateString();

  /* 현재 달에 작성된 일기 데이터 필터링
  const diaryDates = diaryData
    .filter((entry) => {
      const diaryDate = new Date(parseInt(entry.date));
      return (
        diaryDate.getFullYear() === currentYear &&
        diaryDate.getMonth() === currentMonth
      );
    })
    .map((entry) => new Date(parseInt(entry.date))); // Date 객체로 변환
*/
  // 특정 날짜가 일기 날짜인지 확인하는 함수
  const getDiaryByDate = (date) => {
    if (!date) return null;
    return diaryData.find(
      (entry) =>
        new Date(parseInt(entry.date)).toDateString() === date.toDateString()
    );
  };

  const handleDateClick = (date) => {
    const diary = getDiaryByDate(date);
    if (diary) {
      // 일기가 있는 경우 상세 페이지로 이동
      navigate(`/diary/${diary.id}`, {
        state: {
          id: diary.id,
          imgId: diary.imgId,
          content: diary.content,
          date: diary.date,
          dataUrl: diary.dataUrl,
        },
      });
    } else {
      // 일기가 없는 경우 새 페이지로 이동
      const selectDate=date instanceof Date ? date.toISOString() : new Date().toISOString();
      //console.log("Navigating to /new with selectDate:", selectDate); // 디버깅 로그 추가
      navigate("/new",{
        state: { selectDate },
      });
    }
  };


  return (
    <div className="calendar-container">
      <div className="calendar-grid">
        {/* 요일 헤더 */}
        <div className="day-header sunday">일</div>
        <div className="day-header">월</div>
        <div className="day-header">화</div>
        <div className="day-header">수</div>
        <div className="day-header">목</div>
        <div className="day-header">금</div>
        <div className="day-header saturday">토</div>

        {/* 날짜 렌더링 */}
        {monthDates.map((date, index) => (
          <div
            key={index}
            className={`calendar-date ${
              date ? (isToday(date) ? "selected" : "") : "empty"
            } ${
              date
                ? date.getDay() === 0
                  ? "sunday"
                  : date.getDay() === 6
                  ? "saturday"
                  : ""
                : ""
            }`}
            onClick={()=>handleDateClick(date)}
          >
            {date ? (
              <>
                {date.getDate()} {/* 날짜 숫자 */}
                {getDiaryByDate(date) && <span className="diary-icon">🌱</span>} 
              </>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDiary;



