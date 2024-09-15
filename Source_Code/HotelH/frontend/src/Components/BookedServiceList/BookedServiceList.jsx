import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookedServiceCard from '../BookedServiceCard/BookedServiceCard';
import './BookedServiceList.css'; // Import CSS file

const BookedServiceList = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const customerId = localStorage.getItem('customerId'); // Lấy mã khách hàng từ localStorage
    
                if (!customerId) {
                    setError('Bạn cần đăng nhập để xem các đặt dịch vụ.');
                    return;
                }
    
                // Lấy danh sách bookings của customerId cùng thông tin phòng
                const bookingsResponse = await axios.get(`http://localhost:5000/sbookings/${customerId}`);
                console.log('Bookings Response:', bookingsResponse.data); // Log dữ liệu trả về
                setBookings(bookingsResponse.data);
            } catch (error) {
                console.error('Error fetching bookings or services:', error);
                setError('Có lỗi xảy ra khi tải dữ liệu.');
            }
        };
    
        fetchBookings();
    }, []);
    

    

    if (error) {
        return <p className="error-message-booked">{error}</p>;
    }

    return (
        <div className="booked-service-list">
            {bookings.length === 0 ? (
                <p className="no-bookings-message">Bạn chưa đặt dịch vụ nào.</p>
            ) : (
                bookings.map(booking => (
                    booking.service && (
                        <BookedServiceCard
                            key={booking._id}
                            service={booking.service}
                            booking={booking}
                            
                        />
                    )
                ))
            )}
        </div>
    );
};

export default BookedServiceList;
