
import React from 'react';
import './BookedServiceCard.css'; // CSS

const BookedServiceCard = ({ service, booking}) => {
    const getStatusText = (status) => {
        if (status === 'paid') {
            return 'Đã thanh toán';
        } else if (status === 'not paid') {
            return 'Chưa thanh toán';
        } else {
            return 'Không xác định';
        }
    };
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN');
      };
    return (
        <div className="booked-service-card">
            <img src={`http://localhost:5000/ServiceImages/${service.image}`} alt={service.name} />
            <p className="booked-service-card-name">{service.name.toUpperCase()}</p>
            <p className="booked-service-card-price">{formatCurrency(service.price)} VNĐ</p>
            <p className="booked-service-card-booking-date">Ngày đặt: {new Date(booking.date).toLocaleDateString()}</p>
            <p className="booked-service-card-booking-status">Tình trạng: {getStatusText(booking.status)}</p> 
        </div>
    );
};

export default BookedServiceCard;
