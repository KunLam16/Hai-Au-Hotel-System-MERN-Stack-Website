import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './RoomDisplay.css';
import logo from '../Assets/Haiau.png';

const RoomDisplay = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/rooms/${id}`);
                setRoom(response.data);
            } catch (error) {
                console.error('Error fetching room:', error);
            }
        };

        fetchRoom();
    }, [id]);

    const handleBookRoom = async () => {
        // Kiểm tra trạng thái phòng
        if (room.status === 'not available') {
            setError('Phòng không còn trống để đặt.');
            return;
        }

        // Kiểm tra nếu ngày đến và ngày đi đã được chọn
        if (!checkInDate || !checkOutDate) {
            setError('Vui lòng chọn ngày đến và ngày đi.');
            return;
        }

        // Kiểm tra nếu ngày đi phải sau ngày đến
        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            setError('Ngày đi phải sau ngày đến.');
            return;
        }

        // Hiển thị hộp xác nhận
        const confirmBooking = window.confirm('Bạn có chắc chắn muốn đặt phòng không?');
        if (!confirmBooking) {
            return; // Nếu người dùng chọn "Không", không thực hiện đặt phòng
        }

        try {
            const customerId = localStorage.getItem('customerId'); // Lấy mã khách hàng từ localStorage

            if (!customerId) {
                alert('Bạn cần đăng nhập tài khoản khách để đặt phòng.');
                return;
            }

            const response = await axios.post('http://localhost:5000/book-room', {
                customerId,
                roomId: id,
                checkInDate,
                checkOutDate
            });

            alert(response.data.message);
            navigate('/customer/booked-rooms'); // Điều hướng về trang phòng đã đặt sau khi đặt phòng thành công
        } catch (error) {
            console.error('Error booking room:', error);
            setError('Lỗi khi đặt phòng. Vui lòng thử lại.');
        }
    };

    if (!room) {
        return <div className='not-found'>Không có dữ liệu</div>;
    }

    const getStatusText = (status) => {
        if (status === 'available') {
            return 'Còn phòng';
        } else if (status === 'not available') {
            return 'Hết phòng';
        } else {
            return 'Không xác định';
        }
    };
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN');
      };

    return (
        <div className="room-display">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="fa-icon-back" onClick={() => navigate(-1)} /> 
            <div className="room-display-logo">
                <img src={logo} alt="Hải Âu Hotel" title='Hải Âu Hotel' />
            </div>
            <div className="room-display-container">
                <img src={`http://localhost:5000/RoomImages/${room.image}`} alt={room.name} className="room-display-image" title={room.name}/>
                <div className="room-display-details">
                    <h1 className='name'>{room.name.toUpperCase()}</h1>
                    <p className='information'>Trạng thái: {getStatusText(room.status)}</p>
                    <p className='information'>Loại: {room.type}</p>
                    <p className='information'>Mô tả: {room.description}</p>
                    <p className='information'>Giá: {formatCurrency(room.price)} VNĐ/1 đêm</p>
                    <div className="date-inputs">
                        <label className='date-label'>
                            NGÀY ĐẾN:
                            <input 
                                type="date" 
                                value={checkInDate} 
                                onChange={(e) => setCheckInDate(e.target.value)} 
                            />
                        </label>
                        <label className='date-label'>
                            NGÀY ĐI:
                            <input 
                                type="date" 
                                value={checkOutDate} 
                                onChange={(e) => setCheckOutDate(e.target.value)} 
                            />
                        </label>
                    </div>
                    <button className='book-room' onClick={handleBookRoom}>Đặt phòng</button>
                    {error && <p className="error-message-display">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default RoomDisplay;
