import React, { useState } from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import CustomerPaymentNavbar from "../Components/CustomerPaymentNavbar/CustomerPaymentNavbar";
import BillTable from "../Components/BillTable/BillTable";

const CustomerBillPage = () => {
    return (
        <div>
            <UserHeader></UserHeader>
            <CustomerPaymentNavbar></CustomerPaymentNavbar>
            <BillTable></BillTable>
        </div>
    );
}
export default CustomerBillPage;