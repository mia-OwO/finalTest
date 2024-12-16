import React, { useState } from "react";
//파일 ->URL
//onImageUploade: imgID,URL 전달
//inputRef:input에 접근
const PhotoUploader = ({ onImageUpload, inputRef }) => {
  const [fileCounter, setFileCounter] = useState(1); // 파일 번호를 관리하는 상태

  // 파일 업로드 이벤트 처리 함수
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // 사용자가 업로드한 첫 번째 파일 가져오기
    if (file) {
      // 현재 날짜를 기반으로 고유한 파일 이름 생성
      const now = new Date();   // 연도 -> 문자열 -> 두자리만 , 월 + 1-> 문자열 -> 두자리, 한자리면 앞에 0
      const dateString = `${now.getFullYear().toString().slice(2)}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`; // YYMMDD 형식

      const imgId = `${dateString}_${fileCounter}`; // 고유 파일 ID 생성
      setFileCounter((prev) => prev + 1); // 파일 번호 증가

      // FileReader를 사용하여 파일 데이터를 읽어 브라우저에서 표시 가능한 URL 생성
      const reader = new FileReader();
      reader.onload = () => {  //파일 읽기가 완료되면 실행 reader.result에 데이터 저장
        // 부모 컴포넌트로 이미지 정보 전달
        onImageUpload({ imgId, dataUrl: reader.result });
      };
      reader.readAsDataURL(file); // 파일 읽기 (Base64 URL 생성)
    }
  };

  return (
    <div className="PhotoUploader"> {/* 컨테이너 스타일 클래스 */}
      <input 
        ref={inputRef} //inputRef를 통해 dom요소 접근
        type="file" 
        accept="image/*"  //이미지 파일만
        onChange={handleImageUpload} 
        style={{display:"none"}} //버튼만 입력필드x
      /> {/* 이미지 파일 선택 */}

      <button
      onClick={() => inputRef?.current?.click()} // 파일창 열ㄹ기, inputRef.current 존재 x: click() 실행 x 있으면 실행 
      style={{cursor:"pointer"}} />

    </div>
  );
};

export default PhotoUploader;
