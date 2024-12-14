import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [plantName, setPlantName] = useState('');
    const [plantType, setPlantType] = useState('');
    const [plantDate, setPlantDate] = useState('');
    const [note, setNote] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [showImageSelector, setShowImageSelector] = useState(false);
    const navigate = useNavigate();

    const imageOptions = [
        '/images/img1.jpg', '/images/img2.jpg', '/images/img3.jpg', '/images/img4.jpg',
        '/images/img5.jpg', '/images/img6.jpg', '/images/img7.jpg', '/images/img8.jpg',
        '/images/img9.jpg', '/images/img10.jpg','/images/img11.jpg', '/images/img12.jpg',
        '/images/img13.jpg', '/images/img14.jpg', '/images/img15.jpg', '/images/img16.jpg',
        '/images/img17.jpg', '/images/img18.jpg', '/images/img19.jpg', '/images/img20.jpg',
        '/images/img21.jpg'

    ];

    const handleImageSelect = (image) => {
        setSelectedImage(image);
        setShowImageSelector(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const plantData = {
            name: plantName,
            type: plantType,
            plantedDate: plantDate,
            note,
            image: selectedImage
        };

        const existingData = JSON.parse(localStorage.getItem("plantData")) || [];
        const updatedData = [...existingData, plantData];
        localStorage.setItem("plantData", JSON.stringify(updatedData));

        navigate('/home');

        setPlantName('');
        setPlantType('');
        setPlantDate('');
        setNote('');
        setSelectedImage('');
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '20px' }}>🌱 식물 등록</h2>

            <div
                onClick={() => setShowImageSelector(!showImageSelector)}
                style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    cursor: 'pointer',
                    padding: '10px',
                    border: selectedImage ? '2px solid #4CAF50' : '2px dashed #aaa',
                    borderRadius: '10px',
                    backgroundColor: selectedImage ? '#eaffea' : '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '120px'
                }}
            >
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt="Selected Plant"
                        style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
                        }}
                    />
                ) : (
                    <div style={{ color: '#aaa', fontSize: '14px' }}>이미지 선택</div>
                )}
            </div>

            {showImageSelector && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '20px',
                    justifyContent: 'center'
                }}>
                    {imageOptions.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Option ${index + 1}`}
                            onClick={() => handleImageSelect(image)}
                            style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                                cursor: 'pointer',
                                border: selectedImage === image ? '2px solid #4CAF50' : '1px solid #ccc',
                                borderRadius: '6px',
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>식물 이름:</label>
                    <input
                        type="text"
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>파종 날:</label>
                    <input
                        type="date"
                        value={plantDate}
                        onChange={(e) => setPlantDate(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>식물 종류:</label>
                    <input
                        type="text"
                        value={plantType}
                        onChange={(e) => setPlantType(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>메모:</label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                            resize: 'none'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                >
                    등록하기
                </button>
            </form>
        </div>
    );
};

export default Registration;