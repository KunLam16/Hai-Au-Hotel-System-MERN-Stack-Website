import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faUser} from '@fortawesome/free-solid-svg-icons';
import EditCustomerForm from '../EditCustomerForm/EditCustomerForm';
import './CustomerCell.css';

const CustomerCell = ({ customer, onDelete, onUpdate }) => {
    const [showEditForm, setShowEditForm] = useState(false);

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
    };

    const handleDelete = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này không?')) {
            onDelete(customer._id);
        }
    };

    return (
        <div className="customer-cell">
            <div className="customer-id">{customer._id}</div>
            <div><FontAwesomeIcon icon={faUser} className="fa-icon-customer-ava" title={customer.fullname} /></div>
            <div className="customer-details">
                <div className="customer-name">{customer.fullname}</div>
                <div className="customer-phone">Số điện thoại: {customer.phone}</div>
            </div>
            <div className="customer-actions">
                <button onClick={toggleEditForm} className="button-edit-customer">
                    <FontAwesomeIcon icon={faPenToSquare} className="fa-icon-edit-customer" />
                </button>
                <button onClick={handleDelete} className="button-delete-customer">
                    <FontAwesomeIcon icon={faTrash} className="fa-icon-delete-customer" />
                </button>
            </div>
            {showEditForm && (
                <EditCustomerForm customer={customer} onClose={toggleEditForm} onUpdate={onUpdate} />
            )}
        </div>
    );
};

export default CustomerCell;
