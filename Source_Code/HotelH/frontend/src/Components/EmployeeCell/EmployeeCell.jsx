import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faUserTie } from '@fortawesome/free-solid-svg-icons';
import EditEmployeeForm from '../EditEmployeeForm/EditEmployeeForm';
import './EmployeeCell.css';

const EmployeeCell = ({ employee, onDelete, onUpdate }) => {
    const [showEditForm, setShowEditForm] = useState(false);

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
    };

    const handleDelete = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
            onDelete(employee._id);
        }
    };

    return (
        <div className="employee-cell">
            <div className="employee-id">{employee._id}</div>
            <div><FontAwesomeIcon icon={faUserTie} className="fa-icon-employee-ava" title={employee.fullname} /></div>
            <div className="employee-details">
                <div className="employee-name">{employee.fullname}</div>
                <div className="employee-phone">Số điện thoại: {employee.phone}</div>
            </div>
            <div className="employee-actions">
                <button onClick={toggleEditForm} className="button-edit-employee">
                    <FontAwesomeIcon icon={faPenToSquare} className="fa-icon-edit-employee" />
                </button>
                <button onClick={handleDelete} className="button-delete-employee">
                    <FontAwesomeIcon icon={faTrash} className="fa-icon-delete-employee" />
                </button>
            </div>
            {showEditForm && (
                <EditEmployeeForm employee={employee} onClose={toggleEditForm} onUpdate={onUpdate} />
            )}
        </div>
    );
};

export default EmployeeCell;
