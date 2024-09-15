import React from "react";
import './Header.css';
import logo from '../Assets/Haiau.png';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="header-logo">
                <img src={logo} alt="Hải Âu Hotel" />
            </div>
            <div className="quote">
                <span>HAI AU HOTEL</span>
            </div>
            <div className="button-container">
                <div className="login-button">
                    <Link to='/login'><button>Đăng nhập</button></Link> 
                </div>
                <div className="signup-button">
                    <Link to='/signup' style={{ textDecoration: 'none', color: '#ececec' }}><span>Đăng ký</span></Link>
                </div>
            </div>
            
        </div>
    );
}
export default Header;
