import React, {useState} from "react";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";
import logo from '../Components/Assets/Haiau.png';
import  { jwtDecode }  from 'jwt-decode';
import "./CSS/SignUp.css";

const SignUp = () => {
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

    const handleSignUp = async (e) => {
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
            const response = await axios.post('http://localhost:5000/signup', { username, fullname, email, phone, password },
                { withCredentials: true });
            // const { token } = response.data;
            // const decoded = jwtDecode(token); // Giải mã token để lấy role
            // localStorage.setItem('token', token);
            alert("Đăng ký thành công");
            navigate('/');
            // if (decoded.role === 'customer') {
            //     navigate('/customer');
            //     alert("Đăng ký thành công");
            // }
        } catch (error) {
            console.log('Đăng ký thất bại', error.message);
            setError((error.response?.data?.message || error.message));
            alert("Đăng ký thất bại");
        }
    };
    return (
        <div>
            <div className="signup">
            <div className="signup-logo">
               <Link style={{textDecoration: 'none'}} to ='/'><img src={logo} alt="Hải Âu Hotel" title='Hải Âu Hotel' /></Link> 
            </div>
            <div className="signup-container">
                <h1>ĐĂNG KÝ</h1>
                <form onSubmit={handleSignUp}>
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
                                <button className="btn-signup" type="submit">Đăng ký</button>
                            </div>
                            {error && <p className="signup-error">{error}</p>}
                    </div>
                </form>
                <p className="signup-signup">
                        Đã có tài khoản? <Link style={{textDecoration: 'none'}} to ='/login'><span>Đăng nhập</span></Link>
                </p>
                <p className="signup-signup">
                        <Link style={{textDecoration: 'none'}} to ='/managersignup'><span>Tạo tài khoản Quản Lý</span></Link>
                </p>
                
            </div>
        </div>
        </div>
    );
}
export default SignUp;