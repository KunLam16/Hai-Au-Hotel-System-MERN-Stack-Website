import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../Assets/Haiau.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import "./AddEmployeePage.css";

const AddEmployeePage = () => {
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    // Dùng regex để kiểm tra email
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        // Kiểm tra mật khẩu phải có ít nhất 8 ký tự
        return password.length >= 8;
    };
    //Dùng regex để kiểm tra số điện thoại
    const validatePhone = (phone) => {
        const re = /^\d{10}$/;  // Kiểm tra số điện thoại 10 số
        return re.test(phone);
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("Email không hợp lệ");
            return;
        }

        if (!validatePassword(password)) {
            setError("Mật khẩu phải có ít nhất 8 ký tự");
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu và xác nhận mật khẩu không khớp");
            return;
        }
        if (!validatePhone(phone)) {
            setError("Số điện thoại không hợp lệ! Phải là 10 số và không chứa ký tự chữ");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/add-employee', 
                { _id: id, username, fullname, email, phone, password },
                { withCredentials: true }
            );
            alert("Thêm nhân viên thành công!");
            navigate('/manager/');
        } catch (error) {
            console.log('Thêm nhân viên thất bại', error.message);
            setError("Thêm nhân viên thất bại: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>
            <div className="add-employee">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="fa-icon-back" onClick={() => navigate('/manager/')} /> 
            <div className="add-employee-logo">
                <img src={logo} alt="Hải Âu Hotel" title='Hải Âu Hotel' />
            </div>
                <div className="add-employee-container">
                    <h1>THÊM NHÂN VIÊN</h1>
                    <form onSubmit={handleAddEmployee}>
                        <div className="add-employee-fields">
                            <input type="text" placeholder="ID nhân viên..." value={id}
                                onChange={(e) => setId(e.target.value)} required />
                            <input type="text" placeholder="Tên đăng nhập..." value={username}
                                onChange={(e) => setUsername(e.target.value)} required />
                            <input type="text" placeholder="Họ và tên nhân viên..." value={fullname}
                                onChange={(e) => setFullname(e.target.value)} required />
                            <input type="email" placeholder="Email..." value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                            <input type="text" placeholder="SĐT..." value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                            <input type="password" placeholder="Mật khẩu..." value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                            <input type="password" placeholder="Nhập lại mật khẩu..." value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} required />
                            <div className="btn">
                                <button className="btn-add-employee" type="submit">Thêm nhân viên</button>
                            </div>
                            {error && <p className="error">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEmployeePage;
