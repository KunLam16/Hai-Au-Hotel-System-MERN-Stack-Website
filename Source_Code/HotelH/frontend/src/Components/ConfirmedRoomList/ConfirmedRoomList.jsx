import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmedRoomCard from '../ConfirmedRoomCard/ConfirmedRoomCard';
import './ConfirmedRoomList.css'; // Import CSS file

const ConfirmedRoomList = () => {
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchConfirmedBookings = async () => {
            try {
                const customerId = localStorage.getItem('customerId'); // Lấy mã khách hàng từ localStorage

                if (!customerId) {
                    setError('Bạn cần đăng nhập để xem các đặt phòng đã xác nhận.');
                    return;
                }

                // Lấy danh sách bookings đã xác nhận của customerId cùng thông tin phòng
                const bookingsResponse = await axios.get(`http://localhost:5000/bookings/${customerId}`);
                const confirmedBookings = bookingsResponse.data.filter(booking => booking.status === 'confirmed');
                setConfirmedBookings(confirmedBookings);
                
            } catch (error) {
                console.error('Error fetching confirmed bookings:', error);
                setError('Có lỗi xảy ra khi tải dữ liệu.');
            }
        };

        fetchConfirmedBookings();
    }, []);

    const handlePay = async (bookingId) => {
        try {
            // Kiểm tra xem roomsbookingsID đã tồn tại trong collection payments chưa
            const response = await axios.get(`http://localhost:5000/payments/check/${bookingId}`);
            if (response.data.exists) {
                alert('Bạn đã gửi yêu cầu thanh toán cho phòng này rồi.');
            } else {
                // Nếu không tồn tại thì điều hướng đến trang chi tiết thanh toán
                navigate(`/customer/payment-detail/${bookingId}`);
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
            setError('Có lỗi xảy ra khi kiểm tra trạng thái thanh toán.');
        }
    };

    if (error) {
        return <p className="error-message-confirmed">{error}</p>;
    }

    return (
        <div className="confirmed-room-list">
            {confirmedBookings.length === 0 ? (
                <p className="no-confirmed-bookings-message">Bạn chưa có phòng nào đã xác nhận.</p>
            ) : (
                confirmedBookings.map(booking => (
                    booking.room && (
                        <ConfirmedRoomCard
                            key={booking._id}
                            room={booking.room}
                            booking={booking}
                            onPay={handlePay}
                        />
                    )
                ))
            )}
        </div>
    );
};

export default ConfirmedRoomList;
