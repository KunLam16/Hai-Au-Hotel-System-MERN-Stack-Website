import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { PayPalButtons } from "@paypal/react-paypal-js";
import logo from '../Assets/Haiau.png';
import './PaymentDetail.css';

const convertVNDToUSD = async (amountInVND) => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/VND');
    const rate = response.data.rates.USD;
    const amountInUSD = amountInVND * rate;
    return amountInUSD.toFixed(2); // Làm tròn đến 2 chữ số thập phân
  } catch (error) {
    console.error('Error converting currency:', error);
    throw new Error('Có lỗi xảy ra khi chuyển đổi tiền tệ.');
  }
};

const PaymentDetail = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [services, setServices] = useState([]);
  const [notPaidService, setNotPaidServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState(null);
  const [totalUSD, setTotalUSD] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingResponse = await axios.get(`http://localhost:5000/bookings/details/${bookingId}`);
        setBooking(bookingResponse.data);

        const servicesResponse = await axios.get(`http://localhost:5000/servicesbookings/${bookingId}`);
        const notPaidServices = servicesResponse.data.filter(service => service.status === 'not paid');
        setNotPaidServices(notPaidServices);
        
        const serviceDetailsPromises = notPaidServices.map(async (service) => {
          const serviceDetailResponse = await axios.get(`http://localhost:5000/services/${service.serviceId}`);
          return {
            ...service,
            ...serviceDetailResponse.data
          };
        });

        const detailedServices = await Promise.all(serviceDetailsPromises);
        setServices(detailedServices);
        
      } catch (error) {
        console.error('Error fetching booking details or services:', error);
        setError('Có lỗi xảy ra khi tải dữ liệu.');
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  useEffect(() => {
    const convertTotalToUSD = async () => {
      if (booking) {
        const { total } = calculateTotalPrice();
        try {
          const amountInUSD = await convertVNDToUSD(total);
          setTotalUSD(amountInUSD);
        } catch (error) {
          console.error('Error converting total to USD:', error);
        }
      }
    };

    convertTotalToUSD();
  }, [booking, services]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const calculateTotalPrice = () => {
    const daysStayed = (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 3600 * 24);
    const roomTotal = daysStayed * booking.room.price;
    const servicesTotal = services.reduce((total, service) => total + service.price, 0);
    const preVATTotal = roomTotal + servicesTotal;
    const vat = preVATTotal * 0.1;
    const total = preVATTotal + vat;
    return { roomTotal, servicesTotal, preVATTotal, vat, total };
  };

  const handleCashPayment = async () => {
    const { total } = calculateTotalPrice();
    try {
      const response = await axios.post('http://localhost:5000/payments/cash', {
        roomsbookingId: bookingId,
        servicesbookingId: notPaidService.map(service => service._id),
        amount: total
      });
      console.log(response.data.message);
      alert('Yêu cầu thanh toán thành công!');
      navigate('/customer/payment/status');
    } catch (error) {
      console.error('Error processing cash payment:', error);
      setError('Có lỗi xảy ra khi thanh toán tiền mặt.');
    }
  };

  const handlePayPalPaymentSuccess = async () => {
    const { total } = calculateTotalPrice();
    try {
      const response = await axios.post('http://localhost:5000/payments/paypal', {
        roomsbookingId: bookingId,
        servicesbookingId: notPaidService.map(service => service._id),
        amount: total
      });
      console.log(response.data.message);
      alert('Giao dịch được thực hiện thành công!');
      navigate('/customer/payment/status');
    } catch (error) {
      console.error('Error processing PayPal payment:', error);
      setError('Có lỗi xảy ra khi thanh toán qua PayPal.');
    }
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN');
  };

  if (error) {
    return <p className="error-message-payment">{error}</p>;
  }

  if (!booking) {
    return <p>Lỗi khi tải dữ liệu</p>;
  }

  const { roomTotal, servicesTotal, preVATTotal, vat, total } = calculateTotalPrice();

  return (
    <div className="payment-detail">
      <FontAwesomeIcon icon={faArrowAltCircleLeft} className="payment-detail-fa-icon-back" onClick={() => navigate(-1)} />
      <div className="payment-detail-display-logo">
        <img src={logo} alt="Hải Âu Hotel" title='Hải Âu Hotel' />
      </div>
      <h1>CHI TIẾT THANH TOÁN</h1>
      <div className="booking-details">
        <img src={`http://localhost:5000/RoomImages/${booking.room.image}`} alt={booking.room.name} className="room-image" />
        <p className='detail-name'>{booking.room.name.toUpperCase()}</p>
        <p className="booking-details-detail">Ngày đến: {new Date(booking.checkInDate).toLocaleDateString()}</p>
        <p className="booking-details-detail">Ngày đi: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
        <p className="booking-details-detail">Số đêm: {(new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)}</p>
        <p className="booking-details-detail">{formatCurrency(booking.room.price)} VNĐ/1 Đêm</p>
        <p className="booking-details-detail">Tổng tiền phòng: {formatCurrency(roomTotal)} VNĐ</p>
      </div>
      <div className="services-list">
        <h2>Dịch vụ chưa thanh toán</h2>
        {services.length === 0 ? (
          <p>Bạn không có dịch vụ nào chưa thanh toán.</p>
        ) : (
          services.map(service => (
            <div key={service._id} className="service-item">
              <img src={`http://localhost:5000/ServiceImages/${service.image}`} alt={service.name} className="service-image" />
              <p className='service-item-name'>{service.name.toUpperCase()}</p>
              <p className='service-item-detail'>Ngày đặt: {new Date(service.date).toLocaleDateString()}</p>
              <p className='service-item-detail'>Giá: {formatCurrency(service.price)} VNĐ</p>
            </div>
          ))
        )}
      </div>
      <div className="payment-container">
        <div className="payment-methods">
          <h2>Phương thức thanh toán</h2>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={handlePaymentMethodChange}
              />
              Tiền mặt
            </label>
            <label>
              <input
                type="radio"
                value="online"
                checked={paymentMethod === 'online'}
                onChange={handlePaymentMethodChange}
              />
              Trực tuyến
            </label>
          </div>
        </div>
        <div className="total-price">
          <h3 className='total-price-label'>Chi tiết tổng tiền</h3>
          <p>Giá phòng: <span>{formatCurrency(roomTotal)} VNĐ</span></p>
          <p>Giá dịch vụ: <span>{formatCurrency(servicesTotal)} VNĐ</span></p>
          <p>Tổng tiền trước thuế: <span>{formatCurrency(preVATTotal)} VNĐ</span></p>
          <p>Thuế VAT (10%): <span>{formatCurrency(vat)} VNĐ</span> </p>
          <p>Tổng tiền sau thuế: <span>{formatCurrency(total)} VNĐ</span></p>
          {totalUSD && <p>Tổng tiền sau thuế (USD): <span>${totalUSD}</span></p>}
        </div>
        <div className="payment-actions">
          {paymentMethod === 'cash' && (
            <button className="pay-button-cash" onClick={handleCashPayment}>YÊU CẦU THANH TOÁN</button>
          )}
          {paymentMethod === 'online' && (
            <div className="paypal-button-container">
              <PayPalButtons
                createOrder={async (data, actions) => {
                  const amountInUSD = await convertVNDToUSD(total);
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: amountInUSD // Giá trị thanh toán bằng USD
                      }
                    }]
                  });
                }}
                onApprove={(data, actions) => {
                  
                  return actions.order.capture().then(details => {
                    console.log('Chi tiết giao dịch Paypal:', details); // Debug log
                    handlePayPalPaymentSuccess();
                  });
                }}
                onError={(error) => {
                  console.error('PayPal error:', error);
                  setError('Có lỗi xảy ra khi thanh toán qua PayPal.');
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
