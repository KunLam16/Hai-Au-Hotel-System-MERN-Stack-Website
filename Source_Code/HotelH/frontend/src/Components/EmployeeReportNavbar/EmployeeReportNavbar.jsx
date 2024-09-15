import React from "react";
import { Link } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';
import "./EmployeeReportNavbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature, faList, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';

const EmployeeReportNavbar = () => {
    const navigate = useNavigate();
    return (
        <div className="employee-report-navbar">
            <FontAwesomeIcon icon={faCircleChevronLeft} className="fa-icon-report-back" onClick={() => navigate("/employee/")} />
            <ul className="employee-report-navbar-menu">
                <li>
                    <Link to="/employee/report/" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="employee-report-navbar-menu-item">
                            <FontAwesomeIcon icon={faFileSignature} className="fa-icon" />
                            <span>Tạo báo cáo</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/employee/report/list" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="employee-report-navbar-menu-item">
                            <FontAwesomeIcon icon={faList} className="fa-icon" />
                            <span>Danh sách báo cáo</span>
                        </span>
                    </Link>
                </li>
               
            </ul>
        </div>
    );
};

export default EmployeeReportNavbar;
