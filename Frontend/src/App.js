import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import LoginForm from './components/Login';
import ServicesPage from './components/Service';
import SignUpFormuser from './components/SignupFormUser';
import ServiceProviderSignUpForm from './components/ServiceProviderSignUpForm';
import ServiceProviderLoginForm from './components/ServiceProviderLoginForm';
//import CustomerHome from './components/regular_customer/CustomerHome';
import CustomerService from './components/regular_customer/CustomerService';
import Notification from './components/regular_customer/Notification';
import ServiceHome from './components/service_provider/ServiceHome';
import RequestTab from './components/service_provider/RequestTab';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/services" element={<ServicesPage/>}/>
          <Route path="/home" element={<CustomerService/>}/>
          <Route path="/notification" element={<Notification/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/SignUpFormUser" element={<SignUpFormuser/>}/>
          <Route path="/ServiceProviderSignUpForm" element={<ServiceProviderSignUpForm/>}/>
          <Route path="/ServiceProviderLoginForm" element={<ServiceProviderLoginForm/>}/>
          <Route path="/Service-Home" element={<ServiceHome/>}/>
          <Route path="/request-tab" element={<RequestTab/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
