// src/components/AddServiceForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AddServiceForm.css';

const AddServiceForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kiểm tra xem ID đã tồn tại chưa
      const idCheckResponse = await axios.get(`http://localhost:5000/services-check/${formData._id}`);
      if (idCheckResponse.data.exists) {
        setError('ID này đã tồn tại. Vui lòng chọn ID khác.');
        return;
      }

      const serviceData = new FormData();
      for (const key in formData) {
        serviceData.append(key, formData[key]);
      }

      const response = await axios.post('http://localhost:5000/services', serviceData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert(response.data.message);
      onClose();
      window.location.reload();
     
    } catch (error) {
      console.error('Error adding service:', error);
      setError('Có lỗi xảy ra khi thêm dịch vụ.');
    }
  };

  return (
    <div className="add-service-modal">
      <div className="add-service-overlay" onClick={onClose}></div>
      <div className="add-service-form-container">
        <form className="add-service-form" onSubmit={handleSubmit}>
          <h2>THÊM DỊCH VỤ</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            name="_id"
            placeholder="ID"
            value={formData._id}
            onChange={handleChange}
            required
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
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <p className='notes'>Ảnh phải có kích thước 1:1<span className='note-color'>*</span></p>
          <button type="submit" className="add-service-submit">Thêm dịch vụ</button>
          <button type="button" className="add-service-close" onClick={onClose}>Đóng</button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;
