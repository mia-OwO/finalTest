import { useParams , useNavigate} from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import Viewer from "../component/Viewer";
import { formatDate } from "../component/Editor";
import Transformer from "../component/Transformer";

const Diary = () => {
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    }
    const goEdit = () => {
        navigate(`/edit/${id}`);
    }
    if (!data) {
        return <div>일기를 불러오고 있습니다...</div>;
    } else {
        const { date,content ,imgId, dataUrl } = data;
        const title = `${formatDate(new Date(Number(date)))} 기록`
        return (
            <div>
                <Header title={title} leftChild={<Button text={"<뒤로가기>"} onClick={goBack}/>} rightChild={<Button text={"수정하기"} onClick={goEdit}/>} />
                <Viewer content={content} imgId={imgId} dataUrl={dataUrl} />
                <Transformer content={content} /> 
            </div>
        );
    }
};
export default Diary;