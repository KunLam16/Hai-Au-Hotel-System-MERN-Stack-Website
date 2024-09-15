import React from "react";
import "./RoomCard.css";
import { Link } from "react-router-dom";

const RoomCard = (props) => {
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN');
      };
    return (
        <div className="room-card">
            <Link to={`/rooms/${props.id}`}>
                <img src={`http://localhost:5000/RoomImages/${props.image}`} alt={props.name} onClick={() => window.scrollTo(0, 0)} />
            </Link>
            <p className="room-card-name">{props.name}</p>
            <div className="room-card-type">
                Loại: {props.type}
            </div>
            <div className="room-card-description">
                Mô tả: {props.description}
            </div>
            <div className="room-card-price">
                <div className="room-card-price-new">
                    {formatCurrency(props.price)} VNĐ/1 đêm
                </div>
            </div>
        </div>
    );
}

export default RoomCard;
