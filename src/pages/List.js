import Button from "../component/Button";
import Header from "../component/Header";
import DiaryList from "../component/DiaryList";
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import FloatingButton from "../component/FloatingButton";
import { useNavigate } from "react-router-dom";

const List = () => {
    const navigate= useNavigate();
    const data = useContext(DiaryStateContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const headerTitle = `${currentDate.getFullYear()}년
                       ${currentDate.getMonth()+1}월`;

    useEffect(() => {
        if (!data) return;
                    
        const filtered = data.filter((entry) => {
            const diaryDate = new Date(Number(entry.date));
                            // 현재 달과 비교
            const isSameYear = diaryDate.getFullYear() === currentDate.getFullYear();

            const isSameMonth = diaryDate.getMonth() === currentDate.getMonth();
            
            return isSameYear && isSameMonth;
        });
    console.log("FilterData: ", filtered);
    setFilteredData(filtered);
},[data, currentDate]);

    console.log("Currnet Date",currentDate);

    const onIncreaseMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(),currentDate.getMonth()+1));
    };

    const onDecreaseMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() -1 ));
    };

    return(
        <div>
            <Header title={headerTitle} 
                leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
            />
           <DiaryList data={filteredData} />

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


