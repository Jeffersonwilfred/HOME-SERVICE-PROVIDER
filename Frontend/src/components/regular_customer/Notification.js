import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import CustomerHeader from './CustomerHeader';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userEmail = sessionStorage.getItem('userEmail');
                const response = await axios.get('http://localhost:5005/get_notifications', {
                    params: { requester_email: userEmail },
                });
                setNotifications(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    // Function to handle clicking on a notification
    const handleNotificationClick = (notification) => {
        if (notification[3] === 'accepted') {
            toast.success(`Notification ID ${notification[0]} has been accepted!`);
        }
        // You can add more conditions for other statuses if needed
    };

    return (
        <div>
            <CustomerHeader />
            <div className="notifications-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                {loading ? (
                    <p>Loading...</p>
                ) : notifications.length === 0 ? (
                    <p>No notifications found.</p>
                ) : (
                    notifications.map((notification) => (
                        <div key={notification[0]} className="notification-item" style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', borderRadius: '5px', width: '100%', maxWidth: '1620px', backgroundColor: notification[3] === 'accepted' ? 'rgba(0, 128, 0, 0.1)' : notification[3] === 'rejected' ? 'rgba(255, 0, 0, 0.1)' : 'transparent' }} onClick={() => handleNotificationClick(notification)}>
                            <p style={{ color: 'black', marginRight: '50px' }}>
                                You have requested to Service Provider
                                 <span style={{ fontWeight: 'bold', color: 'blue' }}> {notification[7]} </span>
                                  having issue with the <span style={{ fontWeight: 'bold', color: 'black' }}>  {notification[1]} </span>
                                <br/>The Service Provider Status: 
                                <span style={{ fontFamily: 'Arial', fontSize: '14px', fontStyle: 'italic', color: notification[3] === 'accepted' ? 'green' : notification[3] === 'rejected' ? 'red' : 'black' }}>{notification[3]}</span> <br/>
                                <span style={{fontStyle: 'italic', fontSize:'10px'}}>Your Request_Id is: {notification[0]}</span>
                                <span style={{paddingLeft: '1215px', fontStyle: 'italic', fontSize: '12px'}}>{notification[5]}</span>
                                <br/>
                                {notification[3] === 'accepted' && (
                                    <span style={{ fontWeight: 'bold', color: 'green' }}>Replied: {notification[2]}</span>
                                )}
                            </p>
                        </div>
                    ))
                )}
            </div>
            <ToastContainer /> {/* ToastContainer for displaying toast messages */}
        </div>
    );
};

export default Notification;
