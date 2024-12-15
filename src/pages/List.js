import Button from "../component/Button";
import Header from "../component/Header";
import DiaryList from "../component/DiaryList";
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import FloatingButton from "../component/FloatingButton";
import { useNavigate } from "react-router-dom";
 
//특정 월의 일기 목록

const List = () => {
    const navigate= useNavigate();
    const data = useContext(DiaryStateContext);   //DiaryStateContext에서 데이터 가져옴
    const [currentDate, setCurrentDate] = useState(new Date()); //현재 연도와 월 저장, 초기값: 현재 날짜(new Date())
    const [filteredData, setFilteredData] = useState([]); // 현재 월에 해당하는 일기 데이터 저장
    const headerTitle = `${currentDate.getFullYear()}년
                       ${currentDate.getMonth()+1}월`;  //헤더에 표시하기 위한 문자



// 현재 월기준으로 필터링                  
    useEffect(() => {
        if (!data) return;   //만약 data가 빈 값일 경우엔 필터링 x
                    
        const filtered = data.filter((entry) => {  //entry: 배열에 대한 각 요소
            const diaryDate = new Date(Number(entry.date));  //배열에서 date값을 가져와 number로 변환
                            
            const isSameYear = diaryDate.getFullYear() === currentDate.getFullYear();
            //isSameYear: 두 날짜의 연도 비교    diaryDate.getFullyYear: diaryDate의 연도 추출 currentDate:현재 연도
            const isSameMonth = diaryDate.getMonth() === currentDate.getMonth();
             //isSameMonth: 두 날짜의 월 비교
            return isSameYear && isSameMonth;
        });
    
    setFilteredData(filtered); //filteredDate에 해당 연도,월을 가진 데이터만 저장

},[data, currentDate]); //data, currentDate가 바뀔때 마다

    

    const onIncreaseMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(),currentDate.getMonth()+1));
    };//다음 월

    const onDecreaseMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() -1 ));
    }; //전월

    return(
        <div>
            <Header title={headerTitle} 
                leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
            />
           <DiaryList data={filteredData} /> {/*DiayrList에 data 전달 */}

           <FloatingButton
                subButtons={[
                    {icon: "🌱", tooltip:"홈", onClick:()=>navigate('/home')},
                    {icon:"🗓️", tooltip:"달력", onClick:()=>navigate('/calendarPage')},
                ]}
            />
    
        </div>
    );
}
export default List;


//플로팅버튼 부분 수제작