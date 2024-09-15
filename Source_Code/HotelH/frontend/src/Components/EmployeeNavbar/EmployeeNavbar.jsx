import React from "react";
import { Link } from "react-router-dom";
import "./EmployeeNavbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faListCheck, faMoneyBillTransfer, faFilePen } from '@fortawesome/free-solid-svg-icons';

const EmployeeNavbar = () => {
    return (
        <div className="employee-navbar">
            <ul className="employee-navbar-menu">
                <li>
                    <Link to="/employee/" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="employee-menu-item">
                            <FontAwesomeIcon icon={faCalendarDays} className="employee-fa-icon" />
                            <span>Quản lý đặt phòng</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/employee/manage-service" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="employee-menu-item">
                            <FontAwesomeIcon icon={faListCheck} className="fa-icon" />
                            <span>Quản lý dịch vụ</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/employee/manage-payment" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="employee-menu-item">
                            <FontAwesomeIcon icon={faMoneyBillTransfer} className="fa-icon" />
                            <span>Quản lý thanh toán</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/employee/report" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="employee-menu-item">
                            <FontAwesomeIcon icon={faFilePen} className="fa-icon" />
                            <span>Báo cáo</span>
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default EmployeeNavbar;
