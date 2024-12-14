import { useLocation, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Button from "../component/Button";
import Editor from "../component/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { formatDate } from "../component/Editor";

const New = () => {
    const navigate = useNavigate();
    const location=useLocation();
   

//전달 받은 날짜
const selectedDate = location.state?.selectDate
  ? new Date(location.state.selectDate)
  : new Date(); // 전달받은 날짜가 없으면 오늘 날짜를 기본값으로 사용

  console.log("Selected date in New page:", selectedDate);

const goBack = () => {        
    navigate(-1);
    }


    const {onCreate} = useContext(DiaryDispatchContext);

    const onSubmit = (data) => {
        const {date, content,imgId,dataUrl} = data;
        onCreate(date, content,imgId ,dataUrl);
        navigate("/list", {replace: true});
    }

    return (
        <div>
          <Header
            title={"새 일기 쓰기"}
            leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
          />
          {/* Editor 호출 수정 */}
          <Editor
            onSubmit={onSubmit}
            initData={{ date: formatDate(selectedDate) }} // 선택된 날짜를 초기값으로 전달
          />
        </div>
      );
    };
export default New;


