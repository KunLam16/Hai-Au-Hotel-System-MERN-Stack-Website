import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentStatusCard from '../PaymentStatusCard/PaymentStatusCard';
import './PaymentStatusList.css';

const PaymentStatusList = () => {
    const [payments, setPayments] = useState([]);
    const customerId = localStorage.getItem('customerId');
  
    useEffect(() => {
      const fetchPayments = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/payments/${customerId}`);
          setPayments(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy danh sách thanh toán:', error);
        }
      };
  
      fetchPayments();
    }, [customerId]);
  
    return (
      <div className="payment-status-list">
        {payments.length === 0 ? (
          <p className="no-payments-message">Bạn chưa yêu cầu thanh toán phòng nào.</p>
        ) : (
          payments.map(payment => (
            <PaymentStatusCard key={payment._id} payment={payment} />
          ))
        )}
      </div>
    );
  };
  
export default PaymentStatusList;
