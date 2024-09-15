import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './ServiceDisplay.css';
import logo from '../Assets/Haiau.png';

const ServiceDisplay = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/services/${id}`);
                setService(response.data);
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetchService();
    }, [id]);

    const handleBookService = async () => {
        // Hiển thị hộp xác nhận
        const confirmBooking = window.confirm('Bạn có chắc chắn muốn đặt dịch vụ này không? Lưu ý: Dịch vụ đã đặt không thể hủy!');
        if (!confirmBooking) {
            return; // Nếu người dùng chọn "Không", không thực hiện đặt dịch vụ
        }
    
        try {
            const customerId = localStorage.getItem('customerId'); // Lấy mã khách hàng từ localStorage
    
            if (!customerId) {
                alert('Bạn cần đăng nhập tài khoản khách để đặt dịch vụ!');
                return;
            }
    
            const currentDate = new Date(); // Lấy thời gian hiện tại
    
            const response = await axios.post('http://localhost:5000/book-service', {
                customerId,
                serviceId: id,
                date: currentDate // Gửi thời gian hiện tại cùng với yêu cầu
            });
    
            alert(response.data.message);
            navigate('/customer/booked-services'); // Điều hướng về trang dịch vụ đã đặt sau khi đặt dịch vụ thành công
        } catch (error) {
            console.error('Error booking service:', error);
            setError('Lỗi khi đặt dịch vụ. Vui lòng thử lại!');
        }
    };
    

    if (!service) {
        return <div className='not-found'>Không có dữ liệu</div>;
    }
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN');
      };

    return (
        <div className="service-display">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="fa-icon-back" onClick={() => navigate(-1)} />
            <div className="service-display-logo">
                <img src={logo} alt="Hải Âu Hotel" title='Hải Âu Hotel' />
            </div>
            <div className="service-display-container">
                <img src={`http://localhost:5000/ServiceImages/${service.image}`} alt={service.name} className="service-display-image" title={service.name}/>
                <div className="service-display-details">
                    <h1 className='name'>{service.name.toUpperCase()}</h1>
                    <p className='information'>{service.description}</p>
                    <p className='information-price'> {formatCurrency(service.price)} VNĐ</p>
                    {error && <p className="error-message-service">{error}</p>}
                    <button className='book-service' onClick={handleBookService}>ĐẶT DỊCH VỤ</button>
                    
                </div>
            </div>
        </div>
    );
};

export default ServiceDisplay;
