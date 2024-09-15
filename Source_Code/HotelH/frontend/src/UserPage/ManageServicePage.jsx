import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import EmployeeNavbar from "../Components/EmployeeNavbar/EmployeeNavbar";
import AddServiceButton from "../Components/AddServiceButton/AddServiceButton";
import ServiceTable from "../Components/ServiceTable/ServiceTable";

const ManageServicePage = () => {    
    return (
        <div>
            <UserHeader></UserHeader>
            <EmployeeNavbar></EmployeeNavbar>
            <AddServiceButton></AddServiceButton>
            <ServiceTable></ServiceTable>
        </div>
    );
}
export default ManageServicePage;