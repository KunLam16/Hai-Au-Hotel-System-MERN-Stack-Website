import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManagePaymentCard from '../ManagePaymentCard/ManagePaymentCard';
import './ManagePaymentList.css';

const ManagePaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manage-payment-pending');
        setPayments(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu thanh toán:', error);
      }
    };

    fetchPayments();
  }, []);

  const handleConfirm = async (paymentId) => {
    try {
      const response = await axios.put(`http://localhost:5000/manage-payment-confirm/${paymentId}`);
      alert('Xác nhận thanh toán thành công!');
      setPayments(payments.filter(payment => payment._id !== paymentId));
    } catch (error) {
      console.error('Lỗi khi xác nhận thanh toán:', error);
      alert('Có lỗi xảy ra khi xác nhận thanh toán!');
    }
  };

  return (
    <div className="manage-payment-list">
      {payments.length === 0 ? (
        <p className='no-payment-message'>Không có yêu cầu thanh toán.</p>
      ) : (
        payments.map(payment => (
          <ManagePaymentCard
            key={payment._id}
            payment={payment}
            onConfirm={handleConfirm}
          />
        ))
      )}
    </div>
  );
};

export default ManagePaymentList;
