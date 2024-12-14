import Button from "./Button";
import "./Editor.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PhotoUploader from "./PhotoUploader";

export const formatDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
};

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();
    const photoInputRef = useRef();

    const [state, setState] = useState({
        date: initData?.date || formatDate(new Date()),
        imgId: initData?.imgId || null,
        dataUrl: initData?.dataUrl || "",
        content: initData?.content || "",
    });

    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    const handleImageUpload = ({ imgId, dataUrl }) => {
        setState({
            ...state,
            imgId,
            dataUrl,
        });
    };

    const handleSubmit = () => {
        onSubmit(state);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleImageClick = () => {
        if (photoInputRef.current) {
            photoInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                handleImageUpload({ imgId: file.name, dataUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="Editor">
            <div className="editor_section">
                <h3>오늘의 날짜</h3>
                <div className="input_wrapper">
                    <input
                        type="date"
                        value={state.date}
                        onChange={handleChangeDate}
                    />
                </div>
            </div>

            <div className="editor_section">
                <h3>오늘의 새싹</h3>
                <input
                    type="file"
                    ref={photoInputRef}
                    className="hidden_file_input"
                    onChange={handleFileChange}
                />
                {!state.dataUrl ? (
                    <PhotoUploader
                        onImageUpload={handleImageUpload}
                        inputRef={photoInputRef}
                    />
                ) : (
                    <div
                        className="uploaded_image_preview"
                        onClick={handleImageClick}
                    >
                        <h5>선택된 이미지</h5>
                        <img
                            src={state.dataUrl}
                            alt="Uploaded Preview"
                            className="image_preview"
                        />
                    </div>
                )}
            </div>

            <div className="editor_section">
                <h3>오늘의 일기</h3>
                <div className="input_wrapper">
                    <textarea
                        placeholder="오늘의 새싹"
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>

            <div className="editor_section_bottom_section">
                <Button text={"취소하기"} onClick={handleGoBack} />
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Editor;
