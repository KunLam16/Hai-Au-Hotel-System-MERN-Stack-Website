import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import ManagerNavbar from "../Components/ManagerNavbar/ManagerNavbar";
import ManagerReportList from "../Components/ManagerReportList/ManagerReportList";

const ManagerReportPage = () => {
    return (
        <div>
            <UserHeader></UserHeader>
            <ManagerNavbar></ManagerNavbar>
            <ManagerReportList></ManagerReportList>
            
        </div>
    );
}
export default ManagerReportPage;