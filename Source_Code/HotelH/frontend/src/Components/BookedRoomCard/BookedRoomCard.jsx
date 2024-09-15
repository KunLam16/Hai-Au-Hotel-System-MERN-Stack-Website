
import React from 'react';
import './BookedRoomCard.css'; // CSS

const BookedRoomCard = ({ room, booking, onCancel }) => {
    const getStatusText = (status) => {
        if (status === 'pending') {
            return 'Chờ xác nhận';
        } else if (status === 'confirmed') {
            return 'Đã xác nhận';
        } else {
            return 'Không xác định';
        }
    };
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN');
      };
    return (
        <div className="booked-room-card">
            <img src={`http://localhost:5000/RoomImages/${room.image}`} alt={room.name} />
            <p className="room-card-name">{room.name.toUpperCase()}</p>
            <p className="room-card-price">Giá: {formatCurrency(room.price)} VNĐ/1 đêm</p>
            <p className="booking-dates">Ngày đến: {new Date(booking.checkInDate).toLocaleDateString()}</p>
            <p className="booking-dates">Ngày đi: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
            <p className="booking-status">Tình trạng: {getStatusText(booking.status)}</p>
            <button onClick={() => onCancel(booking._id)} className="cancel-button">Hủy đặt phòng</button>
        </div>
    );
};

export default BookedRoomCard;
