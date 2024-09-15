import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookedRoomCard from '../BookedRoomCard/BookedRoomCard';
import './BookedRoomList.css'; // Import CSS file

const BookedRoomList = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const customerId = localStorage.getItem('customerId'); // Lấy mã khách hàng từ localStorage
    
                if (!customerId) {
                    setError('Bạn cần đăng nhập để xem các đặt phòng.');
                    return;
                }
    
                // Lấy danh sách bookings của customerId cùng thông tin phòng
                const bookingsResponse = await axios.get(`http://localhost:5000/bookings/${customerId}`);
                console.log('Bookings Response:', bookingsResponse.data); // Log dữ liệu trả về
                setBookings(bookingsResponse.data);
                
            } catch (error) {
                console.error('Error fetching bookings or rooms:', error);
                setError('Có lỗi xảy ra khi tải dữ liệu.');
            }
        };
    
        fetchBookings();
    }, []);
    

    const handleCancel = async (bookingId) => {
        const booking = bookings.find(b => b._id === bookingId);
    
        if (booking.status === 'confirmed') {
            alert('Không thể hủy đặt phòng đã được xác nhận.');
            return; // Dừng hàm nếu trạng thái là 'confirmed'
        }
        const confirmCancel = window.confirm('Bạn có chắc chắn muốn hủy đặt phòng này không?');

        if (confirmCancel) {
            try {
                await axios.delete(`http://localhost:5000/cancel-booking/${bookingId}`);
                setBookings(bookings.filter(b => b._id !== bookingId));
                alert('Hủy đặt phòng thành công!');
            } catch (error) {
                console.error('Error cancelling booking:', error);
                setError('Có lỗi xảy ra khi hủy đặt phòng.');
            }
        }
    };

    if (error) {
        return <p className="error-message-booked">{error}</p>;
    }

    return (
        <div className="booked-room-list">
            {bookings.length === 0 ? (
                <p className="no-bookings-message">Bạn chưa đặt phòng nào.</p>
            ) : (
                bookings.map(booking => (
                    booking.room && (
                        <BookedRoomCard
                            key={booking._id}
                            room={booking.room}
                            booking={booking}
                            onCancel={handleCancel}
                        />
                    )
                ))
            )}
        </div>
    );
};

export default BookedRoomList;
