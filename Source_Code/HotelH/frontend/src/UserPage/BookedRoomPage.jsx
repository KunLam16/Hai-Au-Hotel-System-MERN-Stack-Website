import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import CustomerNavbar from "../Components/CustomerNavbar/CustomerNavbar";
import BookedRoomList from "../Components/BookedRoomList/BookedRoomList";

const BookedRoomPage = () => {
    return (
        <div>
            <UserHeader/>
            <CustomerNavbar/>
            <BookedRoomList/>
            
        </div>
    );
}
export default BookedRoomPage;