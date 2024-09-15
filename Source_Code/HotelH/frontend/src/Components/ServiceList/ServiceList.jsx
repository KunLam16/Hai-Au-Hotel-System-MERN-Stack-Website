// ServiceList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../ServiceCard/ServiceCard';
import './ServiceList.css';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
                setError('Có lỗi xảy ra khi tải dữ liệu.');
            }
        };

        fetchServices();
    }, []);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="service-list">
            {services.map(service => (
                <ServiceCard
                    key={service._id}
                    id={service._id}
                    name={service.name}
                    description={service.description}
                    price={service.price}
                    image={service.image}
                />
            ))}
        </div>
    );
};

export default ServiceList;
