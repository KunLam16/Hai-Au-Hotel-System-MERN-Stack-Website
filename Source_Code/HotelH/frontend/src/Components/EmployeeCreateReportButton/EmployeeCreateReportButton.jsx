import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './EmployeeCreateReportButton.css';

const EmployeeCreateReportButton = () => {
    const navigate = useNavigate();
    const handleCustomerReport = async () => {
        try {
            const employeeId = localStorage.getItem('employeeId');
            const fullname = localStorage.getItem('fullname');
            const response = await axios.post('http://localhost:5000/create-customer-report', {
                employeeId: employeeId,
                fullname: fullname
            });
            alert(response.data.message);
            navigate('/employee/report/list');
        } catch (error) {
            console.error('Error generating customer report:', error);
            alert('Lỗi khi tạo báo cáo khách hàng.');
        }
    };

    const handleRevenueReport = async () => {
        try {
            const employeeId = localStorage.getItem('employeeId');
            const fullname = localStorage.getItem('fullname');
            const response = await axios.post('http://localhost:5000/create-revenue-report', {
                employeeId: employeeId,
                fullname: fullname
            });
            alert(response.data.message);
            navigate('/employee/report/list');
        } catch (error) {
            console.error('Error generating revenue report:', error);
            alert('Lỗi khi tạo báo cáo doanh thu.');
        }
    };

    return (
        <div className="report-container">
            <button onClick={handleCustomerReport} className="report-button customer-report-button">
                <FontAwesomeIcon icon={faFileSignature} className="fa-icon-create-report" /> Tạo báo cáo khách hàng
            </button>
            <button onClick={handleRevenueReport} className="report-button revenue-report-button">
                <FontAwesomeIcon icon={faFileSignature} className="fa-icon-create-report" /> Tạo báo cáo doanh thu
            </button>
        </div>
    );
};

export default EmployeeCreateReportButton;
