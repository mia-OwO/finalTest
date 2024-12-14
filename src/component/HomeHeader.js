import React, { useEffect, useState } from 'react';
import './HomeHeader.css';

const HomeHeader = () => {
    const [plantedDate, setPlantedDate] = useState(null);

    useEffect(() => {
        // localStorage에서 데이터 가져오기
        const plantData = JSON.parse(localStorage.getItem("plantData")) || [];
        if (plantData.length > 0) {
            setPlantedDate(plantData[plantData.length - 1].plantedDate);
        }
    }, []);

    const calculateDays = (date) => {
        if (!date) return 'D+0';
        const today = new Date();
        const planted = new Date(date);

        // Reset time to 00:00:00 for accurate day comparison
        today.setHours(0, 0, 0, 0);
        planted.setHours(0, 0, 0, 0);

        const differenceInTime = today.getTime() - planted.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        return `D+${differenceInDays + 1}`;
    };

    return (
        <div className="HomeHeader">
            {plantedDate ? calculateDays(plantedDate) : 'D+0'}
        </div>
    );
};

export default HomeHeader;
