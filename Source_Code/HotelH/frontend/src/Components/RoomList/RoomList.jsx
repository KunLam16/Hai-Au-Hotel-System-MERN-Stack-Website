import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../RoomCard/RoomCard';
import './RoomList.css';

const RoomList = ({ searchQuery }) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/rooms');
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const filteredRooms = rooms.filter(room => {
        const name = room.name || '';
        const type = room.type || '';
        const description = room.description || '';

        return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               type.toLowerCase().includes(searchQuery.toLowerCase()) ||
               description.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="room-list">
            {filteredRooms.length > 0 ? (
                filteredRooms.map(room => (
                    <RoomCard
                        key={room._id}
                        id={room._id}
                        image={room.image}
                        name={room.name}
                        type={room.type}
                        description={room.description}
                        price={room.price}
                    />
                ))
            ) : (
                <p>Không tìm thấy dữ liệu</p>
            )}
        </div>
    );
}

export default RoomList;
