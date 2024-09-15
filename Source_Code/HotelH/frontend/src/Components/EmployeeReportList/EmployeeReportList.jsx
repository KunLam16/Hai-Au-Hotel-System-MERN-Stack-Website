import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeReportCell from '../EmployeeReportCell/EmployeeReportCell';
import './EmployeeReportList.css'; // import file CSS

const EmployeeReportList = () => {
    const [reports, setReports] = useState([]);
    const employeeId = localStorage.getItem('employeeId');

    useEffect(() => {
        const fetchReports = async () => {
            if (employeeId) {
                try {
                    const response = await axios.get(`http://localhost:5000/employee-report?employeeId=${employeeId}`);
                    setReports(response.data);
                } catch (error) {
                    console.error('Error fetching reports:', error);
                }
            }
        };

        fetchReports();
    }, [employeeId]);

    return (
        <div className="employee-report-list">
            {reports.length > 0 ? (
                reports.map(report => (
                    <EmployeeReportCell key={report._id} report={report} />
                ))
            ) : (
                <p className="no-reports-message">Bạn chưa tạo báo cáo nào</p>
            )}
        </div>
    );
};

export default EmployeeReportList;
