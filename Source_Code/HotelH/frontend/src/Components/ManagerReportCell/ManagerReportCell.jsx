import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import './ManagerReportCell.css';

const ManagerReportCell = ({ report }) => {
    const viewReport = () => {
        const reportUrl = `http://localhost:5000${report.reportPath}`;
        window.open(reportUrl, '_blank');
    };

    return (
        <div className="manager-report-cell">
            <p className="manager-report-id">Mã báo cáo: <span className='manager-report-text-custom'>{report._id}</span></p>
            <p className="manager-report-name">Tên báo cáo: <span className='manager-report-text-custom'>{report.name}</span></p>
            <p className="manager-report-date">Ngày tạo: <span className='manager-report-text-custom'>{new Date(report.date).toLocaleString()}</span></p>
            <p className="manager-report-employee">Nhân viên tạo: <span className='manager-report-text-custom'>{report.employeeName}</span></p>
            <div className="manager-report-actions">
                <button className="manager-button-view" onClick={viewReport}>Xem báo cáo<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className='manager-fa-icon-view-report' /></button>
            </div>
        </div>
    );
};

export default ManagerReportCell;
