import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useReducer, useRef, useState, useEffect } from 'react';
import List from './pages/List';
import Edit from './pages/Edit';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import CalendarPage from './pages/CalendarPage';
import Registration from './pages/Registration';


// Context 생성 --> 상태 및 액션을 다른 컴포넌트에 전달
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// Reducer 함수 --> 초기화,생성,수정,삭제 할때의 함수들

//state: 모든 데이터를 담은 배열 
function reducer(state, action) {
  switch (action.type) {
    case 'INIT': {
      //초기화 --> localStorage에서 가져온 데이터
      return action.data;
    }
    case 'CREATE': {
      //생성 --> 새로운 데이터를 추가, 스토리지에 저장
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case 'UPDATE': {
      //수정 --> 데이터 수정, 스토리지 저장
      const newState = state.map((it) =>//state.map: 배열 요소(it)을 순회하면서 새로운 배열(newState)을 만듦
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );  // it.id, action.data.id 비교 // 문자열인 이유: 수월한 비교
      //참(it.id==action.data.id): 새 객체를 펼쳐서 복사(새 데이터로 교체)
      //거짓: 그대로
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
      
    }
    case 'DELETE': {
      //삭제 ---> 데이터 삭제, 스토리지에서 제거
      const newState = state.filter( //filter: 1~n 하나씩 순회 + 조건 평가 
        (it) => String(it.id) !== String(action.targetId)
      );//배열의 각 id(it.id)와 삭제하려는 id(action.targetId)비교 -->조건
      //참일때만 새로운 배열에 추가  -> 없는id제거 --> 데이터 제거
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;  
    }
  }
}

function App() {

  //navigate: 이동 관리
  const navigate = useNavigate(); // useNavigate 훅 가져오기
  
  //isDataLoaded(현재 상태(True or False)), setIsDataLoaded(업데이트)
 const [isDataLoaded, setIsDataLoaded] = useState(false); //false(초기값): 데이터 로드 x 
                                                         // true가 되면 업로드 완료
  // data(현상태) dispatch(업데이트 함수)                                                        
  const [data, dispatch] = useReducer(reducer, []); //[]: 초기상태값
  //Reducer: dispatch로 전달된 액션(action.type + 데이터)에 따라 업뎃  --> create, update, delete,default
 

//useRef:  변경 가능한 값 저장, 관리  -> 렌더링과 관계없이 값 유지
//idRef: 일기의 고유 id관리
  const idRef = useRef(0);  //초기값 0


  //등록되 식물이 있냐
  //isDataUmu: plantData 존재 유무를 확인
  //setIsDataUmu: 상태 변경 함수 -> setISsDataUmu(true): isDataUmu=true
  const [isDataUmu, setIsDataUmu] = useState(false); // false: data x true: data o
/* 이건 수제작 활용한것도 수제작 */




 //초기 상태 설정 + 스토리지에 저장된 데이터를 로드하고 상태를 초기화할거냐 어디로 보낼거냐(경로 결정) 
  useEffect(() => {
    const rawData = localStorage.getItem("diary"); //diary라는 데이터를 스토리지에서 가져옴 (일기 요소)
    const plantData = localStorage.getItem("plantData"); // plantData라는 데이터를 스토리지에서 가져옴(등록 요소)

     //diary데이터(rawData)가 없다면
    if (!rawData || JSON.parse(rawData).length === 0) {
     
      setIsDataUmu(false); // 데이터 없음 상태로 설정하고

      //데이터가 아직 로딩 되지 않았다면  --> 한번만 경로 설정을 수행하도록
      if(!isDataLoaded){  
      setIsDataLoaded(true); // 아래 작업을 한번 실행해라
      navigate(plantData ? "/home" : "/registration"); 
      }//plantData가 있으면 home으로 이동 없으면 registration으로 이동 --> 첫 화면 registration
      return; 
    }  
/*플로팅 버튼을 눌러도 계속 home으로 이동되길래 처음 한번만 실행하기위해 만듦 */
    
      //rawData가 있다면
      const localData = JSON.parse(rawData);//rawData를 배열로 변환
      localData.sort((a, b) => Number(b.id) - Number(a.id));
      //id 값 기준 내림차순 
      idRef.current = localData[0].id + 1; // 고유 ID 생성
      dispatch({ type: "INIT", data: localData }); //상태를 초기화함 --> 재 실행될때 불러옴 --> 데이터 없어지지 x
      setIsDataUmu(true); // 데이터 유무 상태 설정
    

      if(!isDataLoaded){// (rawData가있는경우)만약 데이터가 로딩 되지 않았다면 --> rawData를 처리하고 상태를 초기화 한 뒤 한 번만 경로 이동을 수행
        setIsDataLoaded(true);
        navigate(plantData ? "/home" : "/registration");
      }
    

/*

1. if (!isDataLoaded) 

      rawData 없거나 비었을 경우 처리 -->데이터 없음으로 상태 설정, 경로로 이동 --> 플로팅 버튼을 눌러도 home으로의 이동 제한

2. if (!isDataLoaded) 

      rawData 있을 경우 처리 --> 데이터를 로드하고 상태를 초기화한 뒤, 경로 설정을 한 번만 수행 


*/






     
  }, [isDataLoaded, navigate]);  
// 의존성 배열 --> isDataLoaded or navigate 값이 변경될 때 이 코드 실행




/* 완전히 로드하기전 불완전한 렌더링 방지 */
  if (!isDataLoaded) {  // isDataLoaded == false이면
    return null; // 아무것도 렌더링 하지않도록 null 반환
  }



/* 새로운 데이터를 생성하고 전역상태에 추가 */
  const onCreate = (date, content, imgId, dataUrl) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        imgId,
        dataUrl,
      },
    });
    idRef.current += 1; // 고유 ID를 관리하는 현장!
  };





  /* 특정 id(targetId)의 데이터 수정 */
  const onUpdate = (targetId, date, content, imgId, dataUrl) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        imgId,
        dataUrl,
      },
    });
  };



   /* 특정 id(targetId)의 데이터 삭제 */
  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId,
    });
  };

  return (
     /* 현 데이터 제공 --> 하위 컴포넌트에서 읽을때 사용 */
    <DiaryStateContext.Provider value={data}>
{/* 상태를 변경하는 함수(onCreate, onUpdate, onDelete)제공 --> 하위 컴포넌트에서 상태 업데이트할때 사용*/} 
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onUpdate,
          onDelete,
        }}
      >
        <div className="App">
          {/* 라우트 설정  -> 특정 url경로와 해당 컴포넌트 연결*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/home" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path='/calendarPage' element={<CalendarPage />} />
            <Route path='/registration' element={<Registration />} />
          </Routes>

         
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;