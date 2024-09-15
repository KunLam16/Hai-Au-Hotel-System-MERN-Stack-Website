import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import EmployeeNavbar from "../Components/EmployeeNavbar/EmployeeNavbar";
import ManageBookingList from "../Components/ManageBookingList/ManageBookingList";

const Employee = () => {    
    return (
        <div>
           <UserHeader></UserHeader>
            <EmployeeNavbar></EmployeeNavbar>
            <ManageBookingList></ManageBookingList>
        </div>
    );
}
export default Employee;