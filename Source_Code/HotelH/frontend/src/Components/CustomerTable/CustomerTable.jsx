import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerCell from '../CustomerCell/CustomerCell';
import './CustomerTable.css';

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/manage-customer');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleDelete = async (id) => {
        console.log('Attempting to delete customer with ID:', id); // Debugging
        try {
            const response = await axios.delete(`http://localhost:5000/manage-customer/${id}`);
            console.log('Response from server:', response.data); // Debugging
            alert(response.data.message);
            setCustomers(customers.filter(customer => customer._id !== id));
        } catch (error) {
            console.error('Error deleting customer:', error); // Log lỗi chi tiết
            console.error('Error details:', error.response?.data); // Log chi tiết lỗi
            alert('Có lỗi xảy ra khi xóa khách hàng!');
        }
    };

    const handleUpdate = () => {
        fetchCustomers();
    };

    return (
        <div className="customer-table">
            {customers.length > 0 ? (
                customers.map(customer => (
                    <CustomerCell
                        key={customer._id}
                        customer={customer}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))
            ) : (
                <p className='no-customer-message'>Không có khách hàng nào.</p>
            )}
        </div>
    );
};

export default CustomerTable;
