import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import "./AddServiceButton.css";
import AddServiceForm from "../AddServiceForm/AddServiceForm"; // Import form component

const AddServiceButton = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="button-add-service-container">
            <button className="add-service-button" onClick={toggleForm}>
                <FontAwesomeIcon icon={faPlus} className="fa-icon-add-service" /> Thêm dịch vụ
            </button>
            {showForm && (
                <div className="modal-overlay" onClick={toggleForm}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <AddServiceForm onClose={toggleForm} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddServiceButton;
