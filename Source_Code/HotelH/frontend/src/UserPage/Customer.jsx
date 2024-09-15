import React, { useState } from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import CustomerNavbar from "../Components/CustomerNavbar/CustomerNavbar";
import RoomList from "../Components/RoomList/RoomList";
import SearchBar from "../Components/SearchBar/SearchBar";


const Customer = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    return (
        <div>
            <UserHeader></UserHeader>
            <CustomerNavbar></CustomerNavbar>
            <SearchBar onSearch={handleSearch}></SearchBar>
            <RoomList searchQuery={searchQuery}></RoomList>
            
        </div>
    );
}
export default Customer;