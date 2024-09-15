import React, {useState} from "react";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";
import logo from '../Components/Assets/Haiau.png';
import "./CSS/ManagerSignUp.css";

const ManagerSignUp = () => {
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

        //Dùng regex để kiểm tra email
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

    const handleManagerSignUp = async (e) => {
        e.preventDefault();
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
             await axios.post('http://localhost:5000/managersignup', { username, fullname, email, phone, password },
                { withCredentials: true });
           
            alert("Tạo tài khoản quản lý thành công!");
            navigate('/');
            
        } catch (error) {
            console.log('Tạo tài khoản thất bại', error.message);
            setError((error.response?.data?.message || error.message));
            alert("Tạo tài khoản quản lý thất bại");
        }
    };
    return (
        <div>
            <div className="manager-signup">
            <div className="manager-signup-logo">
                <Link style={{textDecoration: 'none'}} to ='/'><img src={logo} alt="Hải Âu Hotel" title='Hải Âu Hotel' /></Link>
            </div>
            <div className="manager-signup-container">
                <h1>TẠO TÀI KHOẢN QUẢN LÝ</h1>
                <form onSubmit={handleManagerSignUp}>
                <div className="signup-fields">
                            <input type="text" placeholder="Tên đăng nhập" value={username}
                                onChange={(e) => setUsername(e.target.value)} required/>
                            <input type="text" placeholder="Họ và tên" value={fullname}
                                onChange={(e) => setFullname(e.target.value)} required/>
                            <input type="email" placeholder="Email" value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                            <input type="text" placeholder="SĐT" value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                            <input type="password" placeholder="Mật khẩu" value={password}
                                onChange={(e) => setPassword(e.target.value)} required/>
                            <input type="password" placeholder="Nhập lại mật khẩu" value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} required/>
                            <div className="btn">
                                <button className="btn-manager-signup" type="submit">Tạo tài khoản quản lý</button>
                            </div>
                            {error && <p className="manager-signup-error">{error}</p>}
                    </div>
                </form>
                <p className="manager-signup-signup">
                        Không phải quản lý? <Link style={{textDecoration: 'none'}} to ='/signup'><span>Đăng ký tài khoản khách</span></Link>
                </p>
            </div>
        </div>
        </div>
    );
}
export default ManagerSignUp;