import Button from "./Button";
import "./DiaryList.css";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DiaryItem from "./DiaryItem";
import FloatingButton from "./FloatingButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const DiaryList = ({ data }) => {
  //const data = useContext(DiaryStateContext); // 컨텍스트에서 다이어리 데이터를 가져옴
  const [sortType, setSortType] = useState("latest"); // 정렬 상태 관리
  const [sortedData, setSortedData] = useState([]); // 정렬된 데이터 저장

  // 정렬 로직: sortType 변경 시 데이터 정렬
  useEffect(() => {
    if (!data || data.length === 0) {
        setSortedData([]); // 데이터가 없으면 빈 배열 설정
        return;
    }

    const compare = (a, b) => {
        return sortType === "latest"
            ? Number(b.date) - Number(a.date)
            : Number(a.date) - Number(b.date);
    };

    const sortedList = data.slice().sort(compare);
    console.log("Sorted Data:", sortedList); // 디버깅 추가
    setSortedData(sortedList);
}, [data, sortType]);

console.log("Received Data in DiaryList:", data); // 디버깅 추가


  // 정렬 방식 변경 핸들러
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  // 페이지 이동 핸들러
  const navigate = useNavigate();
  const onClickNew = () => {
    navigate("/new");
  };

  const changeCalendar=()=>{
    navigate("/CalendarPage")
  }

  return (
    <div className="DiaryList">
      {/* 상단 메뉴 */}
      <div className="menu_wrapper">
        <div className="left_col">
          <select value={sortType} onChange={onChangeSortType}>
            {sortOptionList.map((it, idx) => (
              <option key={idx} value={it.value}>
                {it.name}
              </option>
            ))}
          </select>
        </div>
        <div className="right_col">
          <div className="DiaryButton">
            <Button type={"positive"} text={"새 일기 쓰기"} onClick={onClickNew} />
            
          </div>
        </div>
      </div>

      {/* 정렬된 데이터 렌더링 */}
      <div className="list_wrapper">
        {sortedData.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>

      <FloatingButton
      onClick={changeCalendar}
      icon="🗓️"
      tooltip="달력"

      />
    </div>
  );
};

export default DiaryList;

