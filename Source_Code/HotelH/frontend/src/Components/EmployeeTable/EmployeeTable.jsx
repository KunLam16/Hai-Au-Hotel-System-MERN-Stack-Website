import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeCell from '../EmployeeCell/EmployeeCell';
import './EmployeeTable.css';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/manage-employee');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDelete = async (id) => {
        console.log('Attempting to delete employee with ID:', id); // Debugging
        try {
            const response = await axios.delete(`http://localhost:5000/manage-employee/${id}`);
            console.log('Response from server:', response.data); // Debugging
            alert(response.data.message);
            setEmployees(employees.filter(employee => employee._id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error); // Log lỗi chi tiết
            console.error('Error details:', error.response?.data); // Log chi tiết lỗi
            alert('Có lỗi xảy ra khi xóa nhân viên!');
        }
    };

    const handleUpdate = () => {
        fetchEmployees();
    };

    return (
        <div className="employee-table">
            {employees.length > 0 ? (
                employees.map(employee => (
                    <EmployeeCell
                        key={employee._id}
                        employee={employee}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))
            ) : (
                <p className='no-employee-message'>Không có nhân viên nào.</p>
            )}
        </div>
    );
};

export default EmployeeTable;
