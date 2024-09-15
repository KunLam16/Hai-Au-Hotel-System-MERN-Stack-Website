import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import CustomerNavbar from "../Components/CustomerNavbar/CustomerNavbar";
import BookedServiceList from "../Components/BookedServiceList/BookedServiceList";

const BookedServicePage = () => {
    return (
        <div>
            <UserHeader/>
            <CustomerNavbar/>
            <BookedServiceList/>
        </div>
    );
}
export default BookedServicePage;