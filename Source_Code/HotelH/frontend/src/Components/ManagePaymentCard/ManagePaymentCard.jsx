import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './ManagePaymentCard.css';

const ManagePaymentCard = ({ payment, onConfirm }) => {
  const { roomBooking } = payment;
  const { room, customer } = roomBooking;

  const handleConfirm = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/manage-payment-confirm/${payment._id}`);
      alert('Xác nhận thanh toán thành công!');
      // window.open(response.data.invoicePath); // Mở hóa đơn sau khi xác nhận
      window.location.reload();
    } catch (error) {
      console.error('Lỗi khi xác nhận thanh toán:', error);
      alert('Có lỗi xảy ra khi xác nhận thanh toán!');
    }
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN');
  };
  const getMethodText = (text) => {
    if (text === 'cash') {
        return 'Tiền mặt';
    } else if (text === 'paypal') {
        return 'Trực tuyến';
    } else {
        return 'Lỗi không xác định';
    }
};

  return (
    <div className="manage-payment-card">
      <img src={`http://localhost:5000/RoomImages/${room.image}`} alt={room.name} className="manage-payment-card-image" />
      <div className="manage-payment-card-details">
        <h3 className="manage-payment-card-name">{room.name.toUpperCase()}</h3>
        <p className="manage-payment-card-price">Số tiền: <span className='custom-text-price'>{formatCurrency(payment.amount)}</span> VNĐ</p>
        <p className="manage-payment-card-booking-dates">Khách hàng: <span className='custom-text'>{customer.fullname}</span></p>
        <p className="manage-payment-card-booking-dates">Mã thanh toán: <span className='custom-text'>{payment._id}</span></p>
        <p className="manage-payment-card-booking-dates">Ngày đến: <span className='custom-text'>{new Date(roomBooking.checkInDate).toLocaleDateString()}</span></p>
        <p className="manage-payment-card-booking-dates">Ngày đi: <span className='custom-text'>{new Date(roomBooking.checkOutDate).toLocaleDateString()}</span></p>
        <p className="manage-payment-card-booking-dates">Ngày thanh toán: <span className='custom-text'>{new Date(payment.date).toLocaleDateString()}</span></p>
        <p className="manage-payment-card-booking-dates">Phương thức thanh toán: <span className='custom-text'>{getMethodText(payment.method)}</span></p>
        <div className="manage-payment-card-button-wrapper">
          <button onClick={handleConfirm} className="manage-payment-card-pay-button"> <FontAwesomeIcon icon={faCheck} className="fa-icon-confirm" />Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export default ManagePaymentCard;
