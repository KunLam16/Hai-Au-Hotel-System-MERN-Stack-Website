import React, {useState} from "react";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";
import  { jwtDecode }  from 'jwt-decode';
import "./CSS/Login.css";
import logo from '../Components/Assets/Haiau.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate ();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password },
                { withCredentials: true });
            const { token, fullname,customerId, employeeId } = response.data;
            const decoded = jwtDecode(token); // Giải mã token để lấy role
            
            localStorage.setItem('token', token);
            localStorage.setItem('fullname', fullname);
            localStorage.setItem('customerId', customerId); // Lưu mã khách hàng vào localStorage
            localStorage.setItem('employeeId', employeeId); // Lưu mã nhân viên vào localStorage
            
            if (decoded.role === 'manager') {
                navigate('/manager');
            } else if (decoded.role === 'employee') {
                navigate('/employee');
            } else if (decoded.role === 'customer') {
                navigate('/customer');
            }
        } catch (error) {
            alert("Đăng nhập thất bại");
            setError((error.response?.data?.message || error.message));
        }
    };
    return (
        <div>
            <div className="login">
            <div className="login-logo">
                <Link style={{textDecoration:'none'}} to ='/'><img src={logo} alt="Hải Âu Hotel" title='Hải Âu Hotel' /></Link>
            </div>
            <div className="login-container">
                <h1>ĐĂNG NHẬP</h1>
                <form onSubmit={handleLogin}>
                    <div className="login-fields">
                       <div className="input-container"><FontAwesomeIcon icon={faUser} className="fa-icon-login"  />
                       <input type="text" placeholder="Tên đăng nhập" value={username}
                            onChange={(e) => setUsername(e.target.value)} required/></div> 
                        <div className="input-container"><FontAwesomeIcon icon={faLock} className="fa-icon-login"  />
                            <input type="password" placeholder="Mật khẩu" value={password}
                            onChange={(e) => setPassword(e.target.value)} required/></div>
                    </div>
                    <div className="btn">
                        <button  className="btn-continue" type="submit">Đăng nhập</button> 
                    </div>
                    {error && <p className="error">{error}</p>}
                </form>
                
                <p className="btn-back">
                    <Link style={{textDecoration:'none'}} to ='/'><span>Quay lại</span></Link>
                </p>
                <p className="login-login">
                        Chưa có tài khoản? <Link style={{textDecoration:'none'}} to ='/signup'><span>Đăng ký</span></Link>
                </p>
            </div>
        </div>
        </div>
    );
}
export default Login;