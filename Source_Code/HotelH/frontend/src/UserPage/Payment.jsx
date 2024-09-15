import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import CustomerPaymentNavbar from "../Components/CustomerPaymentNavbar/CustomerPaymentNavbar";
import ConfirmedRoomList from "../Components/ConfirmedRoomList/ConfirmedRoomList";

const Payment = () => {
    return (
        <div>
            <UserHeader/>
            <CustomerPaymentNavbar/>
            <ConfirmedRoomList/>
            
            
        </div>
    );
}
export default Payment;