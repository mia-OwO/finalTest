import Button from "./Button";
import "./DiaryList.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import FloatingButton from "./FloatingButton";

const sortOptionList = [   //정렬옵션
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const DiaryList = ({ data }) => { //dataL list컴포넌트에서 가져옴
  const [sortType, setSortType] = useState("latest"); // 정렬 기본은 최신순, 정렬방식 관리
  const [sortedData, setSortedData] = useState([]); // 정렬후 데이터 저장

  // sortType 변경 시 데이터 정렬
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


    //sortedList: 복ㄷ사된배열 정렬
    const sortedList = data.slice().sort(compare); //slice: 배열을 복사해 새 배열 생성 --> 원본 배열 변형x
    setSortedData(sortedList); //sortedList(정렬된 데이터)를 sortedData 로 설정
}, [data, sortType]);   // data와 srotType이 바뀔때만 수행하겠다




  // 정렬 방식 변경 핸들러
  const onChangeSortType = (e) => {
    setSortType(e.target.value);  //sortType을 e.target.value(사용자가 선택한 값)으로 없뎃
  };

  // 페이지 이동 핸들러
  const navigate = useNavigate();
  const onClickNew = () => {
    navigate("/new");
  };  //새 일기 쓰기 버튼을 클릭하면 /new페이지로 이동

  /*const changeCalendar=()=>{
    navigate("/CalendarPage")
  }  //플로팅 버튼 클릭: /calendarPage로 이동
*/
  return (
    <div className="DiaryList">
      {/* 상단 메뉴 */}
      <div className="menu_wrapper"> {/* select와 새일기버튼 */}
        <div className="left_col"> {/* 왼쪽*/}
          <select value={sortType} onChange={onChangeSortType}>
            {sortOptionList.map((it, idx) => ( //sortOptionList배열을 반복하여 option요소 생성
              <option key={idx} value={it.value}> {/*idx:배열 인덱스 value: latest or oldest */}
                {it.name}  {/* 사용자에게 표시되는 텍스트(최신순, 오래된 순) */}
              </option>
            ))}
          </select>
        </div>
        <div className="right_col"> {/*오른쪽 부분 */}
          <div className="DiaryButton">
            <Button type={"positive"} text={"새 일기 쓰기"} onClick={onClickNew} />
            
          </div>
        </div>
      </div>

      {/* 정렬된 데이터 렌더링 */}
      <div className="list_wrapper">
        {sortedData.map((it) => (  //배열을 순회하며 각 데이터를 DiaryItem컴포넌트로 변환
          <DiaryItem key={it.id} {...it} />  //DiaryItem에 데이터 전달
        ))}
      </div>

   { /*  <FloatingButton
      onClick={changeCalendar}
      icon="🗓️"
      tooltip="달력"

      /> */}
    </div>
  );
};

export default DiaryList;

