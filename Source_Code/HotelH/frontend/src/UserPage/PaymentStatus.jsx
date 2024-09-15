import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import CustomerPaymentNavbar from "../Components/CustomerPaymentNavbar/CustomerPaymentNavbar";
import PaymentStatusList from "../Components/PaymentStatusList/PaymentStatusList";

const PaymentStatus = () => {
  return (
    <div>
        <UserHeader/>
        <CustomerPaymentNavbar/>
        <PaymentStatusList/>
    </div>
  );
}
export default PaymentStatus;