// src/components/ManageBookingList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManageBookingCard from '../ManageBookingCard/ManageBookingCard';
import './ManageBookingList.css';

const ManageBookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/manage-bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  const handleConfirm = (bookingId) => {
    setBookings(prevBookings => prevBookings.filter(booking => booking.bookingId !== bookingId));
  };

  return (
    <div className="manage-booking-list">
      {bookings.length === 0 ? (
        <p className='no-booking-message'>Không có yêu cầu đặt phòng.</p>
      ) : (
        bookings.map(booking => (
          <ManageBookingCard key={booking.bookingId} booking={booking} onConfirm={handleConfirm} />
        ))
      )}
    </div>
  );
};

export default ManageBookingList;
