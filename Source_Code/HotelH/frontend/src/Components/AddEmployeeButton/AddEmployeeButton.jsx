import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import "./AddEmployeeButton.css";

const AddEmployeeButton = () => {
    return (
        <div className="button-add-container">
           <Link to="/manager/add-employee" style={{ textDecoration: 'none' }}><button className="add-employee-button"> <FontAwesomeIcon icon={faUserPlus} className="fa-icon-add" />Thêm nhân viên</button></Link> 
        </div>
    );
};
export default AddEmployeeButton;