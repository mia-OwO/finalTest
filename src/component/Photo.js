import React from "react"; // React 가져오기


//  컴포넌트는 업로드된 이미지 목록을 렌더링합니다.
const Photo = ({ images }) => {
  return (
    <div className="Photo"> {/* 전체 Photo 컨테이너 */}
      <h2>Uploaded Images</h2> {/* 타이틀 */}
      <div className="imageList"> {/* 이미지 리스트를 감싸는 컨테이너 */}
        {images.map((image, index) => ( // images 배열을 순회하며 각 이미지를 렌더링
          <div key={index} className="image-item"> {/* 이미지 아이템 컨테이너 */}
            <p>{image.imgId}</p> {/* 파일 이름 출력 */}
            <img
              src={image.dataUrl} // 이미지 데이터 URL
              alt={image.imgId} // 대체 텍스트 (접근성)
              className="imageDisplay" // 이미지 스타일 클래스
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photo; // Phto 컴포넌트 내보내기