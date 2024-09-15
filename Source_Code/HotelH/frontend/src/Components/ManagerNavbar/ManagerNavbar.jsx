import React from "react";
import { Link } from "react-router-dom";
import "./ManagerNavbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faBuildingUser, faFileLines} from '@fortawesome/free-solid-svg-icons';

const ManagerNavbar = () => {
    return (
        <div className="manager-navbar">
            <ul className="manager-navbar-menu">
                <li>
                    <Link to="/manager/" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="manager-menu-item">
                            <FontAwesomeIcon icon={faUserTie} className="fa-icon" />
                            <span>Nhân viên</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/manager/customers-management" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="manager-menu-item">
                            <FontAwesomeIcon icon={faBuildingUser} className="fa-icon" />
                            <span>Khách hàng</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/manager/report" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="manager-menu-item">
                            <FontAwesomeIcon icon={faFileLines} className="fa-icon" />
                            <span>Báo cáo</span>
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ManagerNavbar;
