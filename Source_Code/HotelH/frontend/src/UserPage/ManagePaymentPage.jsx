import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import EmployeeNavbar from "../Components/EmployeeNavbar/EmployeeNavbar";
import ManagePaymentList from "../Components/ManagePaymentList/ManagePaymentList";

const ManagePaymentPage = () => {
    return (
        <div>
            <UserHeader></UserHeader>
            <EmployeeNavbar></EmployeeNavbar>
            <ManagePaymentList></ManagePaymentList>
        </div>
    );
}
export default ManagePaymentPage;