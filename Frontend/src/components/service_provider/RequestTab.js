import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceHeader from './ServiceHeader';

const RequestTab = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const userEmail = sessionStorage.getItem('userEmail');
            const response = await axios.get('http://localhost:5005/get_requests', {
                params: { service_provider_email: userEmail },
            });
            setRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching requests:', error);
            setLoading(false);
        }
    };

    const handleAccept = async (requestId) => {
        const message = prompt('Enter acceptance message:');
        if (message) {
            try {
                await axios.post('http://localhost:5005/update_request', {
                    requestId,
                    message,
                    status: 'accepted',
                });
                alert('Request accepted successfully');
                fetchRequests(); // Refresh requests after accepting
            } catch (error) {
                console.error('Error accepting request:', error);
            }
        }
    };

    const handleReject = async (requestId) => {
        try {
            await axios.post('http://localhost:5005/update_request', {
                requestId,
                status: 'rejected',
            });
            alert('Request rejected successfully');
            fetchRequests(); // Refresh requests after rejecting
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    return (
        <div>
            <ServiceHeader />
            <div className="requests-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                {loading ? (
                    <p>Loading...</p>
                ) : requests.length === 0 ? (
                    <p>No requests found.</p>
                ) : (
                    requests.map((request) => (
                        <div key={request[0]} className="request-item" style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', borderRadius: '5px', width: '100%', maxWidth: '1620px', backgroundColor: request[3] === 'accepted' ? 'rgba(0, 128, 0, 0.1)' : request[3] === 'rejected' ? 'rgba(255, 0, 0, 0.1)' : 'transparent' }}>
                            <p style={{ color: 'black', marginRight: '50px' }}>
                                You got a request request_id: {request[0]} Requested by: {request[6]}
                                <br />
                                {request[1]}
                        
                                <br />
                                Updated At: {request[5]}
                                <br />
                                
                            </p>
                            {request[3] === 'pending' && (
                                <div>
                                    <button style={{ backgroundColor: 'Green' }} onClick={() => handleAccept(request[0])}>Accept</button>
                                    <button style={{ backgroundColor: 'Red' }} onClick={() => handleReject(request[0])}>Reject</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RequestTab;
