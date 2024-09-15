import React from "react";
import "./ServiceCard.css";
import { Link } from "react-router-dom";

const RoomCard = (props) => {
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN');
      };
    return (
        <div className="service-card">
            <Link to={`/services/${props.id}`}>
                <img src={`http://localhost:5000/ServiceImages/${props.image}`} alt={props.name} onClick={() => window.scrollTo(0, 0)} />
            </Link>
            <p className="service-card-name">{props.name.toUpperCase()}</p>
            
            <div className="service-card-description">
                 {props.description}
            </div>
            <div className="service-card-price">
                <div className="service-price-new">
                    {formatCurrency(props.price)} VNĐ
                </div>
            </div>
        </div>
    );
}

export default RoomCard;
