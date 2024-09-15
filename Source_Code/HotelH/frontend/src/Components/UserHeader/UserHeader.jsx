import React,{ useEffect, useState } from "react";
import './UserHeader.css';
import logo from '../Assets/Haiau.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const UserHeader = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const fullnameFromStorage = localStorage.getItem('fullname');
        if (fullnameFromStorage) {
            setFullname(fullnameFromStorage);
        }
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting("Chào buổi sáng");
        } else if (currentHour < 18) {
            setGreeting("Chào buổi chiều");
        } else {
            setGreeting("Chào buổi tối");
        }
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
        if (confirmLogout) {
            localStorage.removeItem('token'); // Xóa token
            localStorage.removeItem('fullname');// Xóa fullname
            localStorage.removeItem('customerId'); // Xóa customerId
            localStorage.removeItem('__paypal_storage__');
            localStorage.removeItem('employeeId'); // Xóa employeeId
            navigate('/'); // Điều hướng đến trang chủ
        }
    };
    return (
        <div className="user-header">
            <div className="user-header-logo">
                <img src={logo} title="Hải Âu Hotel" alt="Hải Âu Hotel" />
            </div>
            
            <div className="logout-button">
                <FontAwesomeIcon icon={faCircleUser} className="fa-icon-user" title={fullname} />
                <span className="greeting">{greeting}, {fullname}!</span>
               {/* <button onClick={handleLogout}>Đăng xuất</button> */}
               <FontAwesomeIcon icon={faRightFromBracket} className="fa-icon" onClick={handleLogout} title="Đăng xuất"/>
            </div>
        </div>
    );
}
export default UserHeader;