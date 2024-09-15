import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCell from '../ServiceCell/ServiceCell';
import './ServiceTable.css';

const ServiceTable = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };



  const handleDelete = (id) => {
    setServices(prevServices => prevServices.filter(service => service._id !== id));
  };

  return (
    <div className="service-table">
      {services.map(service => (
        <ServiceCell key={service._id} service={service} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ServiceTable;
