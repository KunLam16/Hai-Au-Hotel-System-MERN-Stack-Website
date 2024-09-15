import React from 'react';
import axios from 'axios';
import './ManageBookingCard.css';

const ManageBookingCard = ({ booking, onConfirm }) => {
  const handleConfirm = () => {
    axios.post(`http://localhost:5000/confirm-booking/${booking.bookingId}`)
      .then(response => {
        alert(response.data.message);
        onConfirm(booking.bookingId);  // Gọi hàm callback khi xác nhận thành công
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          console.error('Error confirming booking:', error);
          alert('Có lỗi xảy ra khi xác nhận đặt phòng.');
        }
      });
  };

  return (
    <div className="manage-booking-card">
      <img src={`http://localhost:5000/RoomImages/${booking.roomImage}`} alt={booking.roomName} className="manage-booking-card-image" />
      <div className="manage-booking-card-details">
        <h2 className='manage-booking-card-details-name'>{booking.roomName}</h2>
        <p className='manage-booking-card-details-information'>Khách hàng: {booking.customerName}</p>
        <p className='manage-booking-card-details-information'>Ngày đến: {new Date(booking.checkInDate).toLocaleDateString()}</p>
        <p className='manage-booking-card-details-information'>Ngày đi: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
        <button onClick={handleConfirm} className="confirm-button">Xác nhận</button>
      </div>
    </div>
  );
};

export default ManageBookingCard;
