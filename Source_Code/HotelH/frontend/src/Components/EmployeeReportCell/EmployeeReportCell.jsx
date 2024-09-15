import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import './EmployeeReportCell.css'; // import file CSS

const EmployeeReportCell = ({ report }) => {
    const viewReport = () => {
        const reportUrl = `http://localhost:5000${report.reportPath}`;
        window.open(reportUrl, '_blank');
    };

    return (
        <div className="employee-report-cell">
            <p className="report-id">Mã báo cáo: <span className='report-text-custom'>{report._id}</span></p>
            <p className="report-name">Tên báo cáo: <span className='report-text-custom'>{report.name}</span></p>
            <p className="report-date">Ngày tạo: <span className='report-text-custom'>{new Date(report.date).toLocaleString()}</span></p>
            <div className="report-actions">
                <button className="button-view" onClick={viewReport}>Xem báo cáo<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className='fa-icon-view-report' /></button>
            </div>
        </div>
    );
};

export default EmployeeReportCell;
