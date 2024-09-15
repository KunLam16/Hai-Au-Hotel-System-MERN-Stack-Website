import React from "react";
import ManagerNavbar from "../Components/ManagerNavbar/ManagerNavbar";
import UserHeader from "../Components/UserHeader/UserHeader";
import CustomerTable from "../Components/CustomerTable/CustomerTable";

const ManageCustomerPage = () => {
    return (
        <div>
            <UserHeader></UserHeader>
            <ManagerNavbar></ManagerNavbar>
            <CustomerTable></CustomerTable>
        </div>
    );
}
export default ManageCustomerPage;