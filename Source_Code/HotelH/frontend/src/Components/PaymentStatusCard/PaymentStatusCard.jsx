import React from 'react';
import './PaymentStatusCard.css';

const PaymentStatusCard = ({ payment }) => {
    const { roomDetails } = payment;
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN');
    };
    const getStatusText = (status) => {
        if (status === 'pending') {
            return 'Chờ xác nhận';
        } else if (status === 'confirmed') {
            return 'Đã xác nhận';
        } else {
            return 'Không xác định';
        }
    };
    const getMethodText = (status) => {
        if (status === 'cash') {
            return 'Tiền mặt';
        } else if (status === 'paypal') {
            return 'Trực tuyến qua Paypal';
        } else {
            return 'Không xác định';
        }
    };

    return (
        <div className="payment-status-card">
            {roomDetails && roomDetails.room && (
                <div className="payment-status-card-content">
                    <div className="payment-status-card-image">
                        <img src={`http://localhost:5000/RoomImages/${roomDetails.room.image}`} alt={roomDetails.room.name} />
                    </div>
                    <div className="payment-status-card-info">
                         <h2 className='payment-status-card-room-name'> {roomDetails.room.name.toUpperCase()}</h2>
                        <p className='payment-status-card-detail'>Mã thanh toán: <span>{payment._id}</span> </p>
                        <p className='payment-status-card-detail'>Ngày đến: <span>{new Date(roomDetails.checkInDate).toLocaleDateString()}</span></p>
                        <p className='payment-status-card-detail'>Ngày đi: <span>{new Date(roomDetails.checkOutDate).toLocaleDateString()}</span></p>
                        <p className='payment-status-card-detail'>Ngày thanh toán: <span>{new Date(payment.date).toLocaleDateString()}</span></p>
                        <p className='payment-status-card-detail'>Số tiền: <span>{formatCurrency(payment.amount)} </span>VNĐ</p>
                        <p className='payment-status-card-status'>Phương thức: {getMethodText(payment.method)}</p>
                        <p className='payment-status-card-status'>Trạng thái: {getStatusText(payment.status)}</p>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentStatusCard;
