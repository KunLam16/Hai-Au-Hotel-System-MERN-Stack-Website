import React from "react";
import ManagerNavbar from "../Components/ManagerNavbar/ManagerNavbar";
import AddEmployeeButton from "../Components/AddEmployeeButton/AddEmployeeButton";
import UserHeader from "../Components/UserHeader/UserHeader";
import EmployeeTable from "../Components/EmployeeTable/EmployeeTable";

const Manager = () => {
    return (
        <div>
            <UserHeader></UserHeader>
            <ManagerNavbar></ManagerNavbar>
            <AddEmployeeButton></AddEmployeeButton>
            <EmployeeTable></EmployeeTable>
        </div>

    );
}
export default Manager;