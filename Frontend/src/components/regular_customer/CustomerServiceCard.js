import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerServiceCard = ({ provider, requesterId }) => {
    const cardStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '20px',
        margin: '10px',
        borderRadius: '10px',
        width: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const [showInput, setShowInput] = useState(false);
    const [message, setMessage] = useState('');

    const handleButtonClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        try {
            const requesterId = sessionStorage.getItem('userEmail');
            const data = {
                requester_email: requesterId,
                service_provider_id: provider.id,
                service_provider_email: provider.email,
                message: message,
            };

            const response = await axios.post('http://localhost:5005/to_store_message', data);
            console.log(response.data);

            setShowInput(false);
            setMessage('');
            // Show success toast
            toast.success('Message sent successfully', { autoClose: 3000 }); // Toast will auto close after 3 seconds
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error if necessary
        }
    };

    return (
        <div style={cardStyle}>
            <h2>{provider.name}</h2>
            <p>Company: {provider.company}</p>
            <p>Email: {provider.email}</p>
            <p>Contact Number: {provider.contact_number}</p>
            <p>Category of Work: {provider.COW}</p>

            <div>
                <button style={buttonStyle} onClick={handleButtonClick}>
                    Send Request
                </button>
                <span style={{ marginLeft: '10px' }}>Make Your Request Now!!</span>
            </div>

            {showInput && (
                <div>
                    <textarea
                        placeholder="Provide your address, time, and the problem you are having..."
                        value={message}
                        onChange={handleInputChange}
                        style={{ marginTop: '10px', width: '100%', minHeight: '100px' }}
                    ></textarea>
                    <button onClick={handleSendMessage} style={{ marginTop: '10px', float: 'right' }}>
                        Send
                    </button>
                </div>
            )}

            <ToastContainer /> {/* ToastContainer for displaying toast messages */}
        </div>
    );
};

export default CustomerServiceCard;
