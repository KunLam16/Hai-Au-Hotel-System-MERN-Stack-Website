import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditServiceForm.css'; // Sử dụng CSS riêng cho form chỉnh sửa dịch vụ

const EditServiceForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    _id: service._id,
    name: service.name,
    description: service.description,
    price: service.price,
  });

  const [error, setError] = useState(null);
  const [idInteractionError, setIdInteractionError] = useState('');

  useEffect(() => {
    setFormData({
      _id: service._id,
      name: service.name,
      description: service.description,
      price: service.price,
    });
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/edit-service/${service._id}`, {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image
      });
      alert(response.data.message);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error editing service:', error);
      setError('Có lỗi xảy ra khi chỉnh sửa dịch vụ.');
    }
  };

  const handleIdInteraction = () => {
    setIdInteractionError('Bạn không được phép thay đổi ID*');
    setTimeout(() => {
      setIdInteractionError('');
    }, 3000); // Thông báo sẽ biến mất sau 3 giây
  };

  return (
    <div className="edit-service-modal">
      <div className="edit-service-overlay" onClick={onClose}></div>
      <div className="edit-service-form-container">
        <form className="edit-service-form" onSubmit={handleSubmit}>
          <h2>CHỈNH SỬA THÔNG TIN DỊCH VỤ</h2>
          {error && <p className="error-message">{error}</p>}
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
            name="name"
            placeholder="Tên dịch vụ"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Mô tả"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Giá"
            value={formData.price}
            onChange={handleChange}
            required
          />
          {idInteractionError && <p className="id-interaction-error">{idInteractionError}</p>}
          <button type="submit" className="edit-service-submit">Cập nhật dịch vụ</button>
          <button type="button" className="edit-service-close" onClick={onClose}>Đóng</button>
        </form>
      </div>
    </div>
  );
};

export default EditServiceForm;
