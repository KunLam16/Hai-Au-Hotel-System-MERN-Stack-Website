import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BillTable.css'; // import file CSS
import BillCell from '../BillCell/BillCell';

const BillTable = () => {
    const [bills, setBills] = useState([]);
    const customerId = localStorage.getItem('customerId'); // Lấy customerId từ localStorage

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/bills/${customerId}`);
                setBills(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách hóa đơn:', error);
            }
        };

        fetchBills();
    }, [customerId]);

    return (
        <div className="bill-table">
            {bills.length === 0 ? (
                <p className='no-bill-message'>Không có hóa đơn nào</p>
            ) : (
                bills.map(bill => (
                    <BillCell key={bill._id} bill={bill} />
                ))
            )}
        </div>
    );
};

export default BillTable;
