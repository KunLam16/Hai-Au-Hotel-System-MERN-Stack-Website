import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import CustomerNavbar from "../Components/CustomerNavbar/CustomerNavbar";
import ServiceList from "../Components/ServiceList/ServiceList";

const Services = () => {
    return (
        <div>
            <UserHeader/>
            <CustomerNavbar/>
            <ServiceList/>
        </div>
    );
}
export default Services;