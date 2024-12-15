import "./CalendarDiary.css";
import React, { useContext } from "react";
import { DiaryStateContext } from "../App"; // DiaryItem 데이터를 가져오는 컨텍스트
import { useNavigate } from "react-router-dom";

//캘린더의 각 날짜를 렌더링, 일기 데이터와 연동 + 일기가 있는 날과 없는 날 구분
const CalendarDiary = ({ currentDate = new Date()}) => {  //현재 날짜 전달
  const diaryData = useContext(DiaryStateContext); // 컨텍스트로 일기 데이터 가져오기 --> 특정 날짜에 일기가 있는지 없는지 표기
  const navigate=useNavigate();  //페이지 이동

  // 현재 달의 날짜 생성 함수
  const getMonthDates = (year, month) => { //특정 연도와 월을 기반으로 날짜 배열 생성
    const firstDay = new Date(year, month, 1); // 해당 달의 첫 번째 날짜(1)
    const lastDay = new Date(year, month + 1, 0); // 해당 달의 마지막 날짜(28 or 29 or30 or 31) -->0설정

    const daysInMonth = [];  //해당 달의 날짜 객체 생성. --> 배열에 저장
    for (let day = 1; day <= lastDay.getDate(); day++) {  //1일부터 마지막 날까지 반복
      daysInMonth.push(new Date(year, month, day)); // date 배열에 추가
    }

    // 빈칸 추가: 앞쪽, getDay: 요일 --> 첫번째 요일 앞까지 빈칸으로 채움
    const leadingEmptyDays = Array(firstDay.getDay()).fill(null);

    // 빈칸 추가: 뒤쪽, 6(주의 끝) -lastDay:  마지막 날요일 뒤 빈칸
    const trailingEmptyDays = Array(6 - lastDay.getDay()).fill(null);

    // 앞쪽 빈칸 + 날짜 + 뒤쪽 빈칸 반환
    return [...leadingEmptyDays, ...daysInMonth, ...trailingEmptyDays];
  };



  // 현재 연도/월 정보
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // 현재 달의 날짜들 생성
  const monthDates = getMonthDates(currentYear, currentMonth);

  // 오늘 날짜 비교 함수
  const today = new Date();
  const isToday = (date) => date && date.toDateString() === today.toDateString();
//isToday: 특정 date객체가 오늘인지 아닌지, date.toDateString:입력된 날짜, todo:오늘 날짜



  // 특정 날짜가 일기 날짜인지 확인하는 함수
  const getDiaryByDate = (date) => {
    if (!date) return null; //date가 없으면 null return
    return diaryData.find( //find: 조건에 맞는 데이터 find
      (entry) =>
        new Date(parseInt(entry.date)).toDateString() === date.toDateString()
    );//조건: diaryData의 각 항목(entry)에서 entry.date를 Date 객체로 변환한 뒤, 그 날짜(toDateString())가 입력된 date의 날짜와 같은지 비교
  };

  //데이터 있는 날 클릭: diary 이동 없는날: new 이동
  const handleDateClick = (date) => {
    const diary = getDiaryByDate(date);
    if (diary) {
      // 일기가 있는 경우 상세 페이지로 이동
      navigate(`/diary/${diary.id}`, {
        state: {  //특정 페이지로 이동하면서 데이터 전달
          id: diary.id,
          imgId: diary.imgId,
          content: diary.content,
          date: diary.date,
          dataUrl: diary.dataUrl,
        },
      });
    } else {
    
      const selectDate=date instanceof Date ? date.toISOString() : new Date().toISOString();//일기 데이터가 없는 날짜를 선택했을때 해당 날짜의 새일기쓰기로 넘어가기위해
      //date: 변수, 특정 데이터 저장 Date: 내장 객체
    
      navigate("/new",{  // 일기가 없는 경우 새 페이지로 이동
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


/*아이디어 수제작 */
