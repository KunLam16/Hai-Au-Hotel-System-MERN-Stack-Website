import React from 'react';
import './ConfirmedRoomCard.css'; // CSS

const ConfirmedRoomCard = ({ room, booking, onPay }) => {
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN');
      };
    return (
        <div className="confirmed-room-card">
            <img src={`http://localhost:5000/RoomImages/${room.image}`} alt={room.name} />
            <p className="confirmed-room-card-name">{room.name.toUpperCase()}</p>
            <p className="confirmed-room-card-price">Giá: {formatCurrency(room.price)} VNĐ/1 đêm</p>
            <p className="confirmed-room-card-booking-dates">Ngày đến: {new Date(booking.checkInDate).toLocaleDateString()}</p>
            <p className="confirmed-room-card-booking-dates">Ngày đi: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
            {/* <p className="confirmed-room-card-booking-status">Tình trạng: Đã xác nhận</p> */}
            <button onClick={() => onPay(booking._id)} className="confirmed-room-card-pay-button">THANH TOÁN</button>
        </div>
    );
};

export default ConfirmedRoomCard;
