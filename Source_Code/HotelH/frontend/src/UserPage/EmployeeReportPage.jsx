import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import EmployeeReportNavbar from "../Components/EmployeeReportNavbar/EmployeeReportNavbar";
import EmployeeCreateReportButton from "../Components/EmployeeCreateReportButton/EmployeeCreateReportButton";

const EmployeeReportPage = () => {
    return (
        <div>
            <UserHeader></UserHeader>
            <EmployeeReportNavbar></EmployeeReportNavbar>
            <EmployeeCreateReportButton></EmployeeCreateReportButton>
            
        </div>
    );
}
export default EmployeeReportPage;