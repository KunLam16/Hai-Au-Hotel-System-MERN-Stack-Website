import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManagerReportCell from '../ManagerReportCell/ManagerReportCell';
import './ManagerReportList.css';

const ManagerReportList = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:5000/manager-reports');
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="manager-report-list">
            {reports.length === 0 ? (
                <p className='no-report-mess'>Không có báo cáo</p>
            ) : (
                reports.map(report => (
                    <ManagerReportCell key={report._id} report={report} />
                ))
            )}
        </div>
    );
};

export default ManagerReportList;
