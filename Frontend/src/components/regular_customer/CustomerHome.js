import React from 'react';
import './CustomerHome.css';
import CustomerHeader from './CustomerHeader';



const CustomerHome = ({ user }) => {
    const backgroundStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: 'calc(97.5vh - 64px)', // Adjusted height to remove header height
        backgroundImage: 'url("./assets/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
    };

    return (
        <div>
            <CustomerHeader/>
            <div style={backgroundStyles} className="background-styles">
                
                <h2>Request For Home Service NOW!</h2>
                <p style={{ color: 'white' }}>
                    Home service websites are online platforms that offer a range of services aimed at 
                    improving, maintaining, or enhancing various aspects of a home.
                    <br/>These websites typically provide a convenient and centralized platform for homeowners to access a 
                    <br/>wide array of services, from home cleaning and maintenance to repairs, renovations, 
                    and even interior design assistance. 
                </p>
                <p style={{ color: 'white' }}>Handy Helpers - Making Your Home Shine, Inside and Out</p>
            </div>
        </div>
    );
}


export default CustomerHome;
