import React from "react";
import { Link } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';
import "./CustomerPaymentNavbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheck, faClock, faReceipt, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';

const CustomerPaymentNavbar = () => {
    const navigate = useNavigate();
    return (
        <div className="customer-payment-navbar">
            <FontAwesomeIcon icon={faCircleChevronLeft} className="fa-icon-payment-back" onClick={() => navigate("/customer/")} />
            <ul className="customer-payment-navbar-menu">
                <li>
                    <Link to="/customer/payment/" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="customer-payment-navbar-menu-item">
                            <FontAwesomeIcon icon={faMoneyCheck} className="fa-icon" />
                            <span>Thanh Toán</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/payment/status" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="customer-payment-navbar-menu-item">
                            <FontAwesomeIcon icon={faClock} className="fa-icon" />
                            <span>Trạng thái</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/payment/bills" style={{ textDecoration: 'none', color: '#ececec' }}>
                        <span className="customer-payment-navbar-menu-item">
                            <FontAwesomeIcon icon={faReceipt} className="fa-icon" />
                            <span>Hóa đơn</span>
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default CustomerPaymentNavbar;
