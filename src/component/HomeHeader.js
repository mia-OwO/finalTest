import React, { useEffect, useState } from 'react';
import './HomeHeader.css';

//D+n
const HomeHeader = () => {
    // plantedAte: 등록 식물의 파종 날 저장 
    const [plantedDate, setPlantedDate] = useState(null);

    useEffect(() => {
        // localStorage에서 데이터 가져오기
        const plantData = JSON.parse(localStorage.getItem("plantData")) || [];
     
     
        if (plantData.length > 0) { // 만약 plantData값이 있다면
            setPlantedDate(plantData[plantData.length - 1].plantedDate);
        } //plantedData 마지막 값(마지막에 등록한 식물정보)을 가져와 plantedDate값을 넘겨줌
    }, []);

    const calculateDays = (date) => {
        if (!date) return 'D+0';
        //날짜 비교
        const today = new Date();
        const planted = new Date(date);

        //각 시간 0으로 설정
        today.setHours(0, 0, 0, 0);
        planted.setHours(0, 0, 0, 0);



        //두 날짜 간의 밀리초 차이 계산
        const differenceInTime = today.getTime() - planted.getTime();
       //밀리초를 일 단위로 변환
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        return `D+${differenceInDays + 1}`; //당일은 1일이니까 +1
    };

    return (
        <div className="HomeHeader">
            {plantedDate ? calculateDays(plantedDate) : 'D+0'}
        </div>
    );
};

export default HomeHeader;
