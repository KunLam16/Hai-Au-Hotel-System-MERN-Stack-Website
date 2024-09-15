import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditServiceForm from '../EditServiceForm/EditServiceForm';
import './ServiceCell.css';

const ServiceCell = ({ service, onDelete }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này không?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/services/${service._id}`);
        alert(response.data.message);
        onDelete(service._id);
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Có lỗi xảy ra khi xóa dịch vụ.');
      }
    }
  };
  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN');
  };

  return (
    <div className="service-cell">
      <div className="service-id">{service._id}</div>
      <div className="service-image">
        <img src={`http://localhost:5000/ServiceImages/${service.image}`} alt={service.name} />
      </div>
      <div className="service-name">{service.name.toUpperCase()}</div>
        <div className="service-description">{service.description}</div>
      <div className="service-price">{formatCurrency(service.price)} VNĐ</div>
      <div className="service-actions">
        <button onClick={toggleEditForm} className='button-edit'><FontAwesomeIcon icon={faPenToSquare} className="fa-icon-edit"  /></button>
        <button onClick={handleDelete} className='button-delete'> <FontAwesomeIcon icon={faTrash} className="fa-icon-delete"  /></button>
      </div>
      {showEditForm && (
        <EditServiceForm service={service} onClose={toggleEditForm} />
      )}
    </div>
  );
};

export default ServiceCell;
