import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutService from './components/AboutService';
import ConsultationForm from './components/ConsultationForm';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import Footer from './components/Footer';
import TreatmentConditions from './components/TreatmentConditions';
import PaymentConfirmation from './components/PaymentConfirmation';

function App() {
  const handleFormSubmit = async (formData: FormData) => {
    console.log('Form submitted');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ConsultationForm onSubmit={handleFormSubmit} />
              <AboutUs />
              <AboutService />
              <TreatmentConditions />
              <Testimonials />
              <Partners />
            </>
          } />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;