import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditCustomerForm.css';

const EditCustomerForm = ({ customer, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        _id: '',
        fullname: '',
        phone: ''
    });

    const [error, setError] = useState(null);
    const [idInteractionError, setIdInteractionError] = useState('');

    useEffect(() => {
        setFormData({
            _id: customer._id,
            fullname: customer.fullname,
            phone: customer.phone
        });
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            // Kiểm tra nếu không phải là số hoặc độ dài không bằng 10
            if (!/^\d{0,10}$/.test(value)) {
                setError('Số điện thoại chỉ được chứa 10 chữ số.'); // Thông báo lỗi
                return;
            }
        }

        setError(null); // Xóa lỗi nếu nhập đúng
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/manage-customer/${customer._id}`, {
                fullname: formData.fullname,
                phone: formData.phone
            });
            alert(response.data.message);
            onClose();
            onUpdate();
        } catch (error) {
            console.error('Error editing customer:', error);
            setError('Có lỗi xảy ra khi chỉnh sửa khách hàng.');
        }
    };

    const handleIdInteraction = () => {
        setIdInteractionError('Bạn không được phép thay đổi ID*');
        setTimeout(() => {
            setIdInteractionError('');
        }, 3000); // Thông báo sẽ biến mất sau 3 giây
    };

    return (
        <div className="edit-customer-modal">
            <div className="edit-customer-overlay" onClick={onClose}></div>
            <div className="edit-customer-form-container">
                <form className="edit-customer-form" onSubmit={handleSubmit}>
                    <h2>CHỈNH SỬA THÔNG TIN KHÁCH HÀNG</h2>
                    {error && <p className="edit-customer-error-message">{error}</p>}
                    <input
                        type="text"
                        name="_id"
                        placeholder="ID"
                        value={formData._id}
                        readOnly
                        onFocus={handleIdInteraction}
                    />
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Tên khách hàng"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {idInteractionError && <p className="id-interaction-error">{idInteractionError}</p>}
                    <button type="submit" className="edit-customer-submit">Cập nhật</button>
                    <button type="button" className="edit-customer-close" onClick={onClose}>Đóng</button>
                </form>
            </div>
        </div>
    );
};

export default EditCustomerForm;
