import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import EmployeeReportNavbar from "../Components/EmployeeReportNavbar/EmployeeReportNavbar";
import EmployeeReportList from "../Components/EmployeeReportList/EmployeeReportList";

const EmployeeReportListPage = () => {
    return (
        <div>
            <UserHeader></UserHeader>
            <EmployeeReportNavbar></EmployeeReportNavbar>
            <EmployeeReportList></EmployeeReportList>
            
        </div>
    );
}
export default EmployeeReportListPage