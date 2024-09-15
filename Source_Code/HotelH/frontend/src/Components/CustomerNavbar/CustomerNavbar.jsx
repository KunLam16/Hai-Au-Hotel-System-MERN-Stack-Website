import React from "react";
import { Link } from "react-router-dom";
import "./CustomerNavbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faBellConcierge, faDoorOpen, faMartiniGlassCitrus, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';

const CustomerNavbar = () => {
    return (
        <div className="customer-navbar">
            <ul className="customer-navbar-menu">
                <li>
                    <Link to="/customer/" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="menu-item">
                            <FontAwesomeIcon icon={faHotel} className="fa-icon" />
                            <span>Phòng</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/services" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="menu-item">
                            <FontAwesomeIcon icon={faBellConcierge} className="fa-icon" />
                            <span>Dịch vụ</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/booked-rooms" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="menu-item">
                            <FontAwesomeIcon icon={faDoorOpen} className="fa-icon" />
                            <span>Phòng đã đặt</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/booked-services" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="menu-item">
                            <FontAwesomeIcon icon={faMartiniGlassCitrus} className="fa-icon" />
                            <span>Dịch vụ đã đặt</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/payment" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="menu-item">
                            <FontAwesomeIcon icon={faMoneyCheckDollar} className="fa-icon" />
                            <span>Thanh toán</span>
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default CustomerNavbar;
