import "./Viewer.css";

const Viewer=({content,imgId,dataUrl}) => {
    return(
        <div className="Viewer">
            <section>
                <h4>오늘의 새싹</h4>
                <div className={["img_wrapper", `img_wrapper_${imgId}`].join(" ")}>
                   {dataUrl ? (
                    <img 
                    className="uploaded_img"
                    src={dataUrl} 
                    alt="Uploaded Preview" 
                     />
                   ):(
                    <p>이미지가 없습니다.</p>
                   )} 
                   </div>
            </section>

            <section>
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{content || "내용이 없습니다."}</p>
                </div>
            </section>

        </div>
    );
}

export default Viewer;